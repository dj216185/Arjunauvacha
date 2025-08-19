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
    img.loading = 'lazy';
    img.decoding = 'async';
        // Fallback if the image fails to load
        img.onerror = () => {
            img.onerror = null;
            img.src = `${STATIC_BASE}community_gathering.svg`;
        };
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
            showModal('Welcome back, Admin', 'You are now logged in. Use Manage Gallery to add event photos from your device.');
        } else {
            const err = adminForm.querySelector('.admin-error');
            if (err) err.textContent = 'Invalid username or password.';
        }
    });
}

// Admin add form
const adminAddForm = document.getElementById('admin-add-form');
if (adminAddForm) {
    // Local image selection state
    let localImageDataUrl = '';

    // Helpers: read image, resize for reasonable size, and return data URL
    const MAX_W = 1280; // slightly smaller to reduce storage size
    const MAX_H = 960;
    function fileToDataUrlResized(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    let { width, height } = img;
                    let scale = Math.min(MAX_W / width, MAX_H / height, 1);
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.round(width * scale);
                    canvas.height = Math.round(height * scale);
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    // Use JPEG for better size, fallback to PNG if transparency likely isn't needed
                    try {
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                        resolve(dataUrl);
                    } catch (e) {
                        try { resolve(canvas.toDataURL()); } catch (e2) { reject(e2); }
                    }
                };
                img.onerror = reject;
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // Wire dropzone + hidden input
    const dropzone = document.getElementById('local-dropzone');
    const fileInput = document.getElementById('local-file-input');
    const preview = document.getElementById('local-upload-preview');
    if (dropzone && fileInput && preview) {
        const handleFiles = async (files) => {
            const file = files && files[0];
            if (!file) return;
            try {
                const dataUrl = await fileToDataUrlResized(file);
                localImageDataUrl = dataUrl;
                preview.innerHTML = `<img src="${dataUrl}" alt="Preview" />`;
                // Clear URL field since local image takes precedence
                const urlInput = adminAddForm.querySelector('input[name="imageUrl"]');
                if (urlInput) urlInput.value = '';
            } catch (err) {
                localImageDataUrl = '';
                preview.textContent = 'Failed to load image.';
            }
        };

        dropzone.addEventListener('click', () => fileInput.click());
        dropzone.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileInput.click(); } });
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
        ['dragenter','dragover'].forEach(ev => dropzone.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); dropzone.classList.add('dragover'); }));
        ['dragleave','drop'].forEach(ev => dropzone.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); dropzone.classList.remove('dragover'); }));
        dropzone.addEventListener('drop', (e) => { handleFiles(e.dataTransfer.files); });
    }

    adminAddForm.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        if (!isAdmin()) return; // block non-admin
        const cap = adminAddForm.querySelector('input[name="caption"]').value.trim();
        let finalSrc = '';
        const err = adminAddForm.querySelector('.admin-error');
        if (err) err.textContent = '';

        if (localImageDataUrl) {
            // If API backend is enabled, upload the image and use the returned URL
            if (remoteEnabled()) {
                try {
                    // Convert dataURL to Blob
                    const blob = await (await fetch(localImageDataUrl)).blob();
                    const form = new FormData();
                    const filename = `upload_${Date.now()}.jpg`;
                    form.append('file', new File([blob], filename, { type: blob.type || 'image/jpeg' }));
                    const base = window.AppConfig.api.baseUrl.replace(/\/$/, '');
                    const headers = {};
                    const token = window.AppConfig.api.adminToken;
                    if (token) headers['x-admin-token'] = token;
                    const res = await fetch(`${base}/upload`, { method: 'POST', body: form, headers });
                    if (!res.ok) throw new Error('Upload failed');
                    const { url } = await res.json();
                    finalSrc = url;
                } catch (e) {
                    console.warn('Upload failed, falling back to data URL', e);
                    finalSrc = localImageDataUrl;
                }
            } else {
                finalSrc = localImageDataUrl; // use data URL locally
            }
        } else {
            if (err) err.textContent = 'Please upload an image from this device.';
            return;
        }

        const items = getGalleryItems();
        items.unshift({ src: finalSrc, caption: cap });
        saveGalleryItems(items);
        adminAddForm.reset();
        if (preview) preview.innerHTML = '';
        localImageDataUrl = '';
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

// (Removed duplicate DOMContentLoaded listener; initialization happens above)

// End of main.js
