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

function scrollToTarget(target) {
    const navbar = document.querySelector('.navbar');
    const offset = navbar ? navbar.offsetHeight + 8 : 0;
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
}

// Delegated handler for all in-page nav links (works inside offcanvas)
document.addEventListener('click', (e) => {
    const link = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href === '#' || href === '#!') return; // ignore placeholders
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offcanvasEl = link.closest && link.closest('#offcanvasNavbar') ? document.getElementById('offcanvasNavbar') : null;
    if (offcanvasEl && typeof bootstrap !== 'undefined') {
        const oc = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
        const onHidden = () => {
            scrollToTarget(target);
            offcanvasEl.removeEventListener('hidden.bs.offcanvas', onHidden);
        };
        offcanvasEl.addEventListener('hidden.bs.offcanvas', onHidden, { once: true });
        oc.hide();
    } else {
        scrollToTarget(target);
    }
});

// Modern navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.modern-navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
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
    const whatsappLink = "https://chat.whatsapp.com/Cuy38GIN4HbHIby9SzUSwn";
    showModal('🤝 Join Our Community', `Please click the link below to join our WhatsApp community: ${whatsappLink}\n\n🙏 Radhe Radhe 🙏`);
}

function openYouTube() {
    const youtubeUrl = "https://www.youtube.com/@Arjunauvacha_Om";
    showModal('📺 YouTube Channel', `Visit our YouTube channel for spiritual content and live sessions!\n\nChannel URL: ${youtubeUrl}`);
}

const loginLink = document.getElementById('login-link');

// --- Admin / Showcase Management ---

// Resolve static images base regardless of subpath (e.g., Vercel deployments)
function getStaticBase() {
    try {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            const src = scripts[i].src || '';
            if (src.includes('/static/js/main.js')) {
                return src.replace('/static/js/main.js', '/static/images/');
            }
        }
    } catch (e) { /* ignore */ }
    return 'static/images/';
}
const STATIC_BASE = getStaticBase();

// --- Optional remote storage adapter (API mode) ---
function remoteEnabled() {
    try {
        return window.AppConfig && window.AppConfig.REMOTE_BACKEND === 'api' && window.AppConfig.api && window.AppConfig.api.baseUrl;
    } catch (_) { return false; }
}

async function remoteFetch(kind) {
    if (!remoteEnabled()) return null;
    const base = window.AppConfig.api.baseUrl.replace(/\/$/, '');
    try {
        const res = await fetch(`${base}/${kind}`, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) return null;
        const data = await res.json();
        return Array.isArray(data) ? data : null;
    } catch (_) { return null; }
}

async function remotePush(kind, list) {
    if (!remoteEnabled()) return false;
    const base = window.AppConfig.api.baseUrl.replace(/\/$/, '');
    try {
        const headers = { 'Content-Type': 'application/json' };
        const token = window.AppConfig.api.adminToken;
        if (token) headers['x-admin-token'] = token;
        await fetch(`${base}/${kind}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(list || [])
        });
        return true;
    } catch (_) { return false; }
}

// Available images in static/images folder
const availableImages = [
    { filename: 'community_gathering.svg', name: 'Community Gathering' },
    { filename: 'gita_study_session_1.svg', name: 'Gita Study Session 1' },
    { filename: 'gita_study_session_2.svg', name: 'Gita Study Session 2' },
    { filename: 'kirtan_night_1.svg', name: 'Kirtan Night 1' },
    { filename: 'kirtan_night_2.svg', name: 'Kirtan Night 2' },
    { filename: 'meditation_workshop_1.svg', name: 'Meditation Workshop 1' },
    { filename: 'meditation_workshop_2.svg', name: 'Meditation Workshop 2' },
    { filename: 'Airbrush-image-extender.jpeg', name: 'Artistic Image' },
    { filename: 'icon.jpeg', name: 'Icon' }
];

// Default gallery items (fallback)
const defaultGallery = [
    { src: `${STATIC_BASE}community_gathering.svg`, caption: 'Community Gathering' },
    { src: `${STATIC_BASE}gita_study_session_1.svg`, caption: 'Gita Study Session' },
    { src: `${STATIC_BASE}gita_study_session_2.svg`, caption: 'Gita Study Session' },
    { src: `${STATIC_BASE}kirtan_night_1.svg`, caption: 'Kirtan Night' },
    { src: `${STATIC_BASE}kirtan_night_2.svg`, caption: 'Kirtan Night' },
    { src: `${STATIC_BASE}meditation_workshop_1.svg`, caption: 'Meditation Workshop' },
    { src: `${STATIC_BASE}meditation_workshop_2.svg`, caption: 'Meditation Workshop' }
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
    try {
        localStorage.setItem('galleryItems', JSON.stringify(items));
    } catch (e) {
        console.warn('Failed to save gallery items', e);
        showModal('Storage full', 'Could not save image due to storage limits. Try a smaller image or remove some items.');
    }
    // Best-effort remote sync
    remotePush('gallery', items);
}

function renderGallery() {
    const swiperWrapper = document.querySelector('#gallery-swiper-wrapper');
    if (!swiperWrapper) return;
    
    // Fixed images - using the 7 different images you added
    const fixedImages = [
        { src: 'static/images/Image1.png', caption: 'Community Gathering' },
        { src: 'static/images/Image2.png', caption: 'Gita Study Session' },
        { src: 'static/images/Image3.png', caption: 'Spiritual Learning' },
        { src: 'static/images/Image4.png', caption: 'Kirtan Night' },
        { src: 'static/images/Image5.png', caption: 'Meditation Workshop' },
        { src: 'static/images/Image6.png', caption: 'Community Service' },
        { src: 'static/images/Image1.png', caption: 'Divine Gathering' }
    ];
    
    swiperWrapper.innerHTML = '';
    
    fixedImages.forEach((item, idx) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const img = document.createElement('img');
        img.className = 'mainImage';
        img.src = item.src;
        img.alt = item.caption || `Event ${idx+1}`;
        
        // Fallback if the image fails to load
        img.onerror = () => {
            img.onerror = null;
            img.src = 'static/images/community_gathering.svg';
        };
        slide.appendChild(img);

        swiperWrapper.appendChild(slide);
    });
    
    // Update Swiper if it exists
    setTimeout(() => {
        if (window.swiperInstance) {
            window.swiperInstance.update();
        }
    }, 100);
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
    const loginLinkMobile = document.getElementById('login-link-mobile');
    const loginSec = document.getElementById('admin-login-section');
    const toolsSec = document.getElementById('admin-tools-section');
    const sessionsAdmin = document.getElementById('admin-events-controls');
    
    if (isAdmin()) {
        if (adminControls) adminControls.style.display = 'block';
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.onclick = handleLogoutClick;
        }
        if (loginLinkMobile) {
            loginLinkMobile.innerHTML = '<i class="bi bi-person-check me-3 fs-5"></i><span class="fw-500">Logout</span>';
            loginLinkMobile.onclick = handleLogoutClick;
        }
        if (loginSec) loginSec.style.display = 'none';
        if (toolsSec) toolsSec.style.display = 'block';
        if (sessionsAdmin) sessionsAdmin.style.display = 'block';
    } else {
        if (adminControls) adminControls.style.display = 'none';
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.onclick = (e) => { e.preventDefault(); openAdminModal(); };
        }
        if (loginLinkMobile) {
            loginLinkMobile.innerHTML = '<i class="bi bi-person-circle me-3 fs-5"></i><span class="fw-500">Admin Login</span>';
            loginLinkMobile.onclick = (e) => { e.preventDefault(); openAdminModal(); };
        }
        if (loginSec) loginSec.style.display = 'block';
        if (toolsSec) toolsSec.style.display = 'none';
        if (sessionsAdmin) sessionsAdmin.style.display = 'none';
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
    // If opened from offcanvas, ensure the offcanvas is closed
    try {
        const ocEl = document.getElementById('offcanvasNavbar');
        if (ocEl && typeof bootstrap !== 'undefined') {
            const oc = bootstrap.Offcanvas.getInstance(ocEl) || new bootstrap.Offcanvas(ocEl);
            oc.hide();
        }
    } catch (e) { /* ignore */ }
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
            showModal('Welcome back, Admin', 'You are now logged in. Use Manage Gallery to add event photos from our collection.');
        } else {
            const err = adminForm.querySelector('.admin-error');
            if (err) err.textContent = 'Invalid username or password.';
        }
    });
}

// Admin add form
const adminAddForm = document.getElementById('admin-add-form');
if (adminAddForm) {
    // Selected image from available options
    let selectedImageSrc = '';

    // Wire image selection dropdown
    const imageSelect = document.getElementById('image-select');
    const preview = document.getElementById('image-preview');
    
    if (imageSelect && preview) {
        // Populate image options
        imageSelect.innerHTML = '<option value="">Select an image...</option>';
        availableImages.forEach(img => {
            const option = document.createElement('option');
            option.value = img.filename;
            option.textContent = img.name;
            imageSelect.appendChild(option);
        });

        imageSelect.addEventListener('change', (e) => {
            const filename = e.target.value;
            if (filename) {
                selectedImageSrc = `${STATIC_BASE}${filename}`;
                preview.innerHTML = `<img src="${selectedImageSrc}" alt="Preview" />`;
            } else {
                selectedImageSrc = '';
                preview.innerHTML = '';
            }
        });
    }

    adminAddForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        if (!isAdmin()) return; // block non-admin
        const cap = adminAddForm.querySelector('input[name="caption"]').value.trim();
        const err = adminAddForm.querySelector('.admin-error');
        if (err) err.textContent = '';

        if (!selectedImageSrc) {
            if (err) err.textContent = 'Please select an image from the list.';
            return;
        }

        const items = getGalleryItems();
        items.unshift({ src: selectedImageSrc, caption: cap });
        saveGalleryItems(items);
        adminAddForm.reset();
        if (preview) preview.innerHTML = '';
        selectedImageSrc = '';
        if (err) err.textContent = '';
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
    // Best-effort remote sync
    remotePush('events', list);
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
    // Try to hydrate from remote on first load, then re-render
    (async () => {
        if (!remoteEnabled()) return;
        const [g, e] = await Promise.all([remoteFetch('gallery'), remoteFetch('events')]);
        let did = false;
        if (Array.isArray(g) && g.length) { saveGalleryItems(g); did = true; }
        if (Array.isArray(e) && e.length) { saveEvents(e); did = true; }
        if (did) { renderGallery(); renderEvents(); }
    })();
});

// Close admin modal when clicking outside
const adminModalElement = document.getElementById('admin-modal');
if (adminModalElement) {
    adminModalElement.addEventListener('click', (ev) => {
        if (ev.target === adminModalElement) closeAdminModal();
    });
}

// --- WhatsApp Community Join Function ---
function joinCommunity() {
    // WhatsApp group invite link
    const whatsappGroupLink = 'https://chat.whatsapp.com/Cuy38GIN4HbHIby9SzUSwn';
    
    // Open WhatsApp in a new tab/window
    window.open(whatsappGroupLink, '_blank');
    
    // Optional: Show a confirmation modal
    showModal(
        '🕉️ Join Our Krishna Community', 
        'You will be redirected to our WhatsApp group. Welcome to our spiritual family! 🙏'
    );
}

// --- Swiper Gallery Initialization ---
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper after DOM is loaded
    setTimeout(() => {
        if (typeof Swiper !== 'undefined') {
            window.swiperInstance = new Swiper(`[unique-script-id="w-w-dm-id"] .mySwiper`, {
                slidesPerView: 1.5,
                centeredSlides: true,
                spaceBetween: 5,
                pagination: {
                    el: `[unique-script-id="w-w-dm-id"] .swiper-pagination`,
                    clickable: true,
                },
                loop: true,
                autoplay: {
                    delay: 2000, // 2 seconds
                    disableOnInteraction: false, // Keep autoplay even after user interaction
                },
                navigation: {
                    nextEl: `[unique-script-id="w-w-dm-id"] .swiper-button-nexts`,
                    prevEl: `[unique-script-id="w-w-dm-id"] .swiper-button-prevs`,
                },
            });
            console.log('Swiper initialized successfully');
        } else {
            console.warn('Swiper not loaded yet');
        }
    }, 500);
});

// (Removed duplicate DOMContentLoaded listener; initialization happens above)

// End of main.js
