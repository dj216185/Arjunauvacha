// Main JS extracted from app.html and modularized

// --- Modal Functionality ---
const modal = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close-btn');

function showModal(title, message) {
    modalTitle.textContent = title;
    modalBody.textContent = message;
    modal.style.display = 'flex';
}

modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// --- Navigation and Scrolling ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-item a').forEach(n => n.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
}));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(204, 65, 37, 0.98)';
        navbar.style.backdropFilter = 'blur(25px)';
        navbar.style.webkitBackdropFilter = 'blur(25px)';
    } else {
        navbar.style.background = 'rgba(229, 87, 34, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.webkitBackdropFilter = 'blur(20px)';
    }
});

// --- Community Action Functions ---
function joinCommunity() {
    const whatsappLink = "https://chat.whatsapp.com/Cuy38GIN4HbHIby9SzUSwn";
    showModal('🤝 Join Our Community', `Please click the link below to join our WhatsApp community: ${whatsappLink}\n\n🙏 Radhe Radhe 🙏`);
}

function joinWhatsApp() {
    joinCommunity();
}

function openYouTube() {
    const youtubeUrl = "https://www.youtube.com/@Arjunauvacha_Om";
    showModal('📺 YouTube Channel', `Visit our YouTube channel for spiritual content and live sessions!\n\nChannel URL: ${youtubeUrl}`);
}

const loginLink = document.getElementById('login-link');

// --- Admin / Showcase Management ---

// Default gallery items (fallback)
const defaultGallery = [
    { src: 'static/images/community_gathering.svg', caption: 'Community Gathering' },
    { src: 'static/images/gita_study_session_1.svg', caption: 'Gita Study Session' },
    { src: 'static/images/gita_study_session_2.svg', caption: 'Gita Study Session' },
    { src: 'static/images/kirtan_night_1.svg', caption: 'Kirtan Night' },
    { src: 'static/images/kirtan_night_2.svg', caption: 'Kirtan Night' },
    { src: 'static/images/meditation_workshop_1.svg', caption: 'Meditation Workshop' },
    { src: 'static/images/meditation_workshop_2.svg', caption: 'Meditation Workshop' }
];

function getGalleryItems() {
    try {
        const stored = JSON.parse(localStorage.getItem('galleryItems'));
        return Array.isArray(stored) && stored.length ? stored : defaultGallery.slice();
    } catch (e) {
        return defaultGallery.slice();
    }
}

function saveGalleryItems(items) {
    localStorage.setItem('galleryItems', JSON.stringify(items));
}

function renderGallery() {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    const items = getGalleryItems();
    grid.innerHTML = '';
    items.forEach((it, idx) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';

        const img = document.createElement('img');
        img.src = it.src;
        img.alt = it.caption || `Event ${idx+1}`;
        card.appendChild(img);

        const cap = document.createElement('div');
        cap.className = 'gallery-caption';
        cap.textContent = it.caption || '';
        card.appendChild(cap);

        // If admin, show controls
        if (isAdmin()) {
            const ctrl = document.createElement('div');
            ctrl.style.display = 'flex';
            ctrl.style.justifyContent = 'center';
            ctrl.style.gap = '0.5rem';
            ctrl.style.padding = '0.5rem';

            const del = document.createElement('button');
            del.className = 'cta-btn';
            del.textContent = 'Delete';
            del.style.padding = '0.3rem 0.6rem';
            del.addEventListener('click', () => {
                const items = getGalleryItems();
                items.splice(idx, 1);
                saveGalleryItems(items);
                renderGallery();
            });
            ctrl.appendChild(del);

            card.appendChild(ctrl);
        }

        grid.appendChild(card);
    });
}

// Admin helpers
function isAdmin() {
    return localStorage.getItem('isAdmin') === '1';
}

function setAdminState(state) {
    if (state) {
        localStorage.setItem('isAdmin', '1');
    } else {
        localStorage.removeItem('isAdmin');
    }
    updateAdminUI();
}

function updateAdminUI() {
    const adminControls = document.getElementById('admin-controls');
    const loginLink = document.getElementById('login-link');
    const loginSec = document.getElementById('admin-login-section');
    const toolsSec = document.getElementById('admin-tools-section');
    if (isAdmin()) {
        if (adminControls) adminControls.style.display = 'block';
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.onclick = handleLogoutClick;
        }
        if (loginSec) loginSec.style.display = 'none';
        if (toolsSec) toolsSec.style.display = 'block';
    } else {
        if (adminControls) adminControls.style.display = 'none';
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.onclick = (e) => { e.preventDefault(); openAdminModal(); };
        }
        if (loginSec) loginSec.style.display = 'block';
        if (toolsSec) toolsSec.style.display = 'none';
    }
    renderGallery();
}

function handleLogoutClick(e) {
    e.preventDefault();
    setAdminState(false);
}

// Admin Modal operations
function openAdminModal() {
    const am = document.getElementById('admin-modal');
    if (!am) return;
    // Toggle visible sections based on admin state
    const loginSec = document.getElementById('admin-login-section');
    const toolsSec = document.getElementById('admin-tools-section');
    if (isAdmin()) {
        if (loginSec) loginSec.style.display = 'none';
        if (toolsSec) toolsSec.style.display = 'block';
    } else {
        if (loginSec) loginSec.style.display = 'block';
        if (toolsSec) toolsSec.style.display = 'none';
    }
    am.style.display = 'flex';
}

function closeAdminModal() {
    const am = document.getElementById('admin-modal');
    if (!am) return;
    am.style.display = 'none';
}

// Basic client-side credential check (changeable)
function validateCredentials(username, password) {
    // Default credential: admin / admin123
    return username === 'admin' && password === 'admin123';
}

// Wire admin form if present
const adminForm = document.getElementById('admin-login-form');
if (adminForm) {
    adminForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const u = adminForm.querySelector('input[name="username"]').value.trim();
        const p = adminForm.querySelector('input[name="password"]').value.trim();
        if (validateCredentials(u, p)) {
            setAdminState(true);
            closeAdminModal();
            showModal('Welcome back, Admin', 'You are now logged in. Use Manage Gallery to add event photos from your CDN.');
        } else {
            const err = adminForm.querySelector('.admin-error');
            if (err) err.textContent = 'Invalid username or password.';
        }
    });
}

// Admin add form
const adminAddForm = document.getElementById('admin-add-form');
if (adminAddForm) {
    adminAddForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        if (!isAdmin()) return; // block non-admin
        const url = adminAddForm.querySelector('input[name="imageUrl"]').value.trim();
        const cap = adminAddForm.querySelector('input[name="caption"]').value.trim();
        if (!url) return;
        const items = getGalleryItems();
        items.unshift({ src: url, caption: cap });
        saveGalleryItems(items);
        adminAddForm.reset();
        renderGallery();
    });
}

// --- Events: admin-managed sessions ---
const defaultEvents = [
    { id: 'e1', title: 'Gita Study Session', datetime: new Date().toISOString(), joinUrl: 'https://chat.whatsapp.com/Cuy38GIN4HbHIby9SzUSwn' }
];

function getEvents() {
    try {
        const stored = JSON.parse(localStorage.getItem('events'));
        return Array.isArray(stored) && stored.length ? stored : defaultEvents.slice();
    } catch (e) {
        return defaultEvents.slice();
    }
}

function saveEvents(list) {
    localStorage.setItem('events', JSON.stringify(list));
}

function renderEvents() {
    const container = document.getElementById('events-list');
    if (!container) return;
    const events = getEvents();
    container.innerHTML = '';
    events.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'event-card';

        const meta = document.createElement('div');
        meta.className = 'event-meta';
        const d = new Date(ev.datetime);
        meta.innerHTML = `<div style="font-weight:600">${ev.title}</div><div>${d.toLocaleString()}</div>`;

        const actions = document.createElement('div');
        actions.className = 'event-actions';

        // Join button (front shows only a join action, not the raw URL)
        const join = document.createElement('a');
        join.className = 'join-btn';
        join.textContent = 'Join';
        join.href = ev.joinUrl || '#';
        join.target = '_blank';
        actions.appendChild(join);

        // Admin delete
        if (isAdmin()) {
            const del = document.createElement('button');
            del.className = 'cta-btn';
            del.textContent = 'Delete';
            del.style.marginLeft = '0.5rem';
            del.addEventListener('click', () => {
                const list = getEvents().filter(x => x.id !== ev.id);
                saveEvents(list);
                renderEvents();
            });
            actions.appendChild(del);
        }

        card.appendChild(meta);
        card.appendChild(actions);
        container.appendChild(card);
    });
}

// Admin event form
const adminEventForm = document.getElementById('admin-event-form');
if (adminEventForm) {
    adminEventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isAdmin()) return; // block non-admin
        const title = adminEventForm.querySelector('input[name="title"]').value.trim();
        const datetime = adminEventForm.querySelector('input[name="datetime"]').value;
        const joinUrl = adminEventForm.querySelector('input[name="joinUrl"]').value.trim();
        if (!title || !datetime) return;
        const events = getEvents();
        const id = 'e' + Date.now();
        events.unshift({ id, title, datetime: new Date(datetime).toISOString(), joinUrl });
        saveEvents(events);
        adminEventForm.reset();
        renderEvents();
    });
}

// Render events on load and whenever gallery updates
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    renderEvents();
    updateAdminUI();
});

// Close admin modal when clicking outside
const adminModalElement = document.getElementById('admin-modal');
if (adminModalElement) {
    adminModalElement.addEventListener('click', (ev) => {
        if (ev.target === adminModalElement) closeAdminModal();
    });
}

// (Removed duplicate DOMContentLoaded listener; initialization happens above)

// End of main.js
