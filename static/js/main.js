// Main JS - Static version with Bhagavad Gita quotes

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

// --- Bhagavad Gita Quotes ---
const gitaQuotes = [
    {
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
        translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
        chapter: "Chapter 2, Verse 47"
    },
    {
        sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय। सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥",
        translation: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.",
        chapter: "Chapter 2, Verse 48"
    },
    {
        sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
        translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.",
        chapter: "Chapter 4, Verse 7"
    },
    {
        sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम्। धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥",
        translation: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I advent Myself millennium after millennium.",
        chapter: "Chapter 4, Verse 8"
    },
    {
        sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥",
        translation: "It is far better to discharge one's prescribed duties, even though faultily, than another's duties perfectly. Destruction in the course of performing one's own duty is better than engaging in another's duties, for to follow another's path is dangerous.",
        chapter: "Chapter 3, Verse 35"
    },
    {
        sanskrit: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु। मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे॥",
        translation: "Always think of Me, become My devotee, worship Me and offer your homage unto Me. Thus you will come to Me without fail. I promise you this because you are My very dear friend.",
        chapter: "Chapter 18, Verse 65"
    },
    {
        sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
        translation: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
        chapter: "Chapter 18, Verse 66"
    },
    {
        sanskrit: "यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति। तस्याहं न प्रणश्यामि स च मे न प्रणश्यति॥",
        translation: "For one who sees Me everywhere and sees everything in Me, I am never lost, nor is he ever lost to Me.",
        chapter: "Chapter 6, Verse 30"
    },
    {
        sanskrit: "बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते। तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥",
        translation: "A man engaged in devotional service rids himself of both good and bad actions even in this life. Therefore strive for yoga, which is the art of all work.",
        chapter: "Chapter 2, Verse 50"
    },
    {
        sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते। सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥",
        translation: "While contemplating the objects of the senses, a person develops attachment for them, and from such attachment lust develops, and from lust anger arises.",
        chapter: "Chapter 2, Verse 62"
    },
    {
        sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥",
        translation: "From anger, complete delusion arises, and from delusion bewilderment of memory. When memory is bewildered, intelligence is lost, and when intelligence is lost one falls down again into the material pool.",
        chapter: "Chapter 2, Verse 63"
    },
    {
        sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
        translation: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well.",
        chapter: "Chapter 6, Verse 5"
    },
    {
        sanskrit: "यं हि न व्यथयन्त्येते पुरुषं पुरुषर्षभ। समदुःखसुखं धीरं सोऽमृतत्वाय कल्पते॥",
        translation: "O best among men, the person who is not disturbed by happiness and distress and is steady in both is certainly eligible for liberation.",
        chapter: "Chapter 2, Verse 15"
    },
    {
        sanskrit: "असक्तबुद्धिः सर्वत्र जितात्मा विगतस्पृहः। नैष्कर्म्यसिद्धिं परमां संन्यासेनाधिगच्छति॥",
        translation: "One who is self-controlled and unattached and who disregards all material enjoyments can obtain, by practice of renunciation, the highest perfect stage of freedom from reaction.",
        chapter: "Chapter 18, Verse 49"
    },
    {
        sanskrit: "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च। मय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयः॥",
        translation: "Therefore, Arjuna, you should always think of Me in the form of Krishna and at the same time carry out your prescribed duty of fighting. With your activities dedicated to Me and your mind and intelligence fixed on Me, you will attain Me without doubt.",
        chapter: "Chapter 8, Verse 7"
    }
];

let currentQuoteIndex = 0;

function displayQuote(index) {
    const quote = gitaQuotes[index];
    const sanskritEl = document.getElementById('quote-sanskrit');
    const translationEl = document.getElementById('quote-translation');
    const chapterEl = document.getElementById('quote-chapter');
    
    if (sanskritEl && translationEl && chapterEl) {
        sanskritEl.textContent = quote.sanskrit;
        translationEl.textContent = quote.translation;
        chapterEl.textContent = quote.chapter;
    }
}

function nextQuote() {
    currentQuoteIndex = (currentQuoteIndex + 1) % gitaQuotes.length;
    displayQuote(currentQuoteIndex);
}

function randomQuote() {
    currentQuoteIndex = Math.floor(Math.random() * gitaQuotes.length);
    displayQuote(currentQuoteIndex);
}

// Auto-rotate quotes every 10 seconds
setInterval(() => {
    nextQuote();
}, 10000);

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
    if (!href || href === '#' || href === '#!') return;
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
    window.open(whatsappLink, '_blank');
    showModal('🕉️ Join Our Krishna Community', 'You will be redirected to our WhatsApp group. Welcome to our spiritual family! 🙏');
}

function joinWhatsApp() {
    const whatsappLink = "https://chat.whatsapp.com/Cuy38GIN4HbHIby9SzUSwn";
    window.open(whatsappLink, '_blank');
    showModal('🤝 Join Our Community', `Welcome to our WhatsApp community!\\n\\n🙏 Radhe Radhe 🙏`);
}

function openYouTube() {
    const youtubeUrl = "https://www.youtube.com/@Arjunauvacha_Om";
    window.open(youtubeUrl, '_blank');
    showModal('📺 YouTube Channel', `Visit our YouTube channel for spiritual content and live sessions!`);
}

// --- Gallery rendering (static images already in HTML) ---
// Gallery is now static - images are embedded in index.html

// --- Swiper Gallery Initialization ---
function initSwiperWithRetry(maxRetries = 40, intervalMs = 250) {
    // Avoid double init
    if (window.swiperInstance && typeof window.swiperInstance.destroy === 'function') {
        return; // already initialized
    }
    const container = document.querySelector('[unique-script-id="w-w-dm-id"] .mySwiper');
    if (typeof Swiper === 'undefined' || !container) {
        if (maxRetries > 0) {
            setTimeout(() => initSwiperWithRetry(maxRetries - 1, intervalMs), intervalMs);
        } else {
            console.warn('Swiper could not be initialized: script or container missing');
        }
        return;
    }

    // Determine slides count to set loopedSlides appropriately
    const wrapper = container.querySelector('.swiper-wrapper');
    const slidesCount = wrapper ? wrapper.querySelectorAll('.swiper-slide').length : 1;
    const loopedSlides = Math.max(3, slidesCount);

    try {
        window.swiperInstance = new Swiper(container, {
            // Marquee-like settings
            slidesPerView: 1.3,
            centeredSlides: false,
            spaceBetween: 10,
            speed: 2000, // slow, continuous movement
            freeMode: { enabled: true, momentum: false },
            loop: true,
            loopedSlides,
            loopAdditionalSlides: Math.max(8, loopedSlides),
            loopFillGroupWithBlank: true,
            watchOverflow: false,
            autoplay: {
                delay: 0, // continuous
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            allowTouchMove: true,
            grabCursor: true,
            keyboard: { enabled: true },
            // Avoid observer re-inits interrupting the scroll
            observer: false,
            observeParents: false,
            // Keep nav/pagination if desired
            pagination: {
                el: '[unique-script-id="w-w-dm-id"] .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '[unique-script-id="w-w-dm-id"] .swiper-button-nexts',
                prevEl: '[unique-script-id="w-w-dm-id"] .swiper-button-prevs',
            },
        });
        console.log('Swiper initialized successfully with', { slidesCount, loopedSlides });
    } catch (e) {
        console.error('Error initializing Swiper, retrying...', e);
        setTimeout(() => initSwiperWithRetry(maxRetries - 1, intervalMs), intervalMs);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Display first quote
    if (typeof displayQuote === 'function') displayQuote(0);
    // Try to init once DOM is ready
    initSwiperWithRetry();
});

// Also try after full page load (ensures CDN scripts are present)
window.addEventListener('load', () => initSwiperWithRetry());

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
        const response = await fetch(`${base}/${kind}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(list || [])
        });
        if (!response.ok) {
            console.error(`Failed to push ${kind}:`, response.status, response.statusText);
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Error pushing ${kind}:`, error);
        return false;
    }
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
    // Slides are static in HTML; only update if Swiper exists
    if (window.swiperInstance) {
        try {
            window.swiperInstance.update();
        } catch (e) {
            console.warn('Swiper update failed', e);
        }
    }
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
        if (sessionsAdmin) {
            sessionsAdmin.style.display = 'block';
            console.log('Admin event controls are now visible');
        }
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
        if (sessionsAdmin) {
            sessionsAdmin.style.display = 'none';
            console.log('Admin event controls are hidden');
        }
    }
    renderGallery();
    renderEvents(); // Re-render events to remove/add delete buttons based on admin status
}

function handleLogoutClick(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        setAdminState(false);
        closeAdminModal();
        showModal('Logged Out', 'You have been successfully logged out. Admin controls are now hidden.');
    }
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
    // Best-effort remote sync with logging
    remotePush('events', list).then(success => {
        if (success) {
            console.log('Events successfully synced to API');
        } else {
            console.warn('Failed to sync events to API');
        }
    });
}

function renderEvents() {
    const container = document.getElementById('events-list');
    if (!container) return;
    const events = getEvents();
    container.innerHTML = '';
    
    if (events.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'No events scheduled at the moment. Check back soon!';
        emptyMsg.style.color = '#666';
        emptyMsg.style.fontStyle = 'italic';
        emptyMsg.style.padding = '2rem';
        container.appendChild(emptyMsg);
        return;
    }
    
    events.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'event-card';

        const meta = document.createElement('div');
        meta.className = 'event-meta';
        const d = new Date(ev.datetime);
        meta.innerHTML = `<div style="font-weight:600">${ev.title}</div><div>${d.toLocaleString()}</div>`;

        const actions = document.createElement('div');
        actions.className = 'event-actions';

        // Join button (visible to everyone)
        const join = document.createElement('a');
        join.className = 'join-btn';
        join.textContent = 'Join';
        join.href = ev.joinUrl || '#';
        join.target = '_blank';
        join.rel = 'noopener noreferrer';
        actions.appendChild(join);

        // Admin delete (only add if currently admin - will be removed on re-render after logout)
        if (isAdmin()) {
            const del = document.createElement('button');
            del.className = 'cta-btn delete-event-btn';
            del.innerHTML = '<i class="bi bi-trash"></i> Delete';
            del.style.marginLeft = '0.5rem';
            del.setAttribute('data-admin-only', 'true');
            del.setAttribute('title', 'Remove this event');
            del.addEventListener('click', async () => {
                // Double-check admin status at click time
                if (!isAdmin()) {
                    showModal('Access Denied', 'You must be logged in as admin to delete events.');
                    return;
                }
                if (confirm(`Are you sure you want to delete the event "${ev.title}"?\n\nThis action cannot be undone.`)) {
                    const list = getEvents().filter(x => x.id !== ev.id);
                    saveEvents(list);
                    renderEvents();
                    showModal('✓ Event Deleted', `The event "${ev.title}" has been successfully removed from the schedule.`);
                }
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
    adminEventForm.addEventListener('submit', async (e) => {
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
        // Show success message
        showModal('Event Added', 'The event has been successfully added to the schedule.');
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

// End of main.js
