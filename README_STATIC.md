# Arjunauvacha - Static Website

This is now a fully static website with no backend dependencies!

## Features

✅ **Rotating Bhagavad Gita Quotes** - Divine wisdom that changes automatically every 10 seconds
✅ **Static Gallery** - Beautiful image carousel with community photos
✅ **No Database Required** - All content is embedded in the HTML/JS
✅ **No Flask/Python Needed** - Pure HTML, CSS, and JavaScript
✅ **Fast & Lightweight** - Can be hosted anywhere (GitHub Pages, Netlify, Vercel, etc.)

## How to Run Locally

### Option 1: Using Python (Simple HTTP Server)
```bash
cd Arjunauvacha
python -m http.server 8000
```
Then open: http://localhost:8000

### Option 2: Using Node.js
```bash
cd Arjunauvacha
npx http-server -p 8000
```
Then open: http://localhost:8000

### Option 3: Using VS Code Live Server Extension
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: Direct File Opening
Simply open `index.html` directly in your browser (some features may not work due to CORS)

## Deployment

### Deploy to GitHub Pages
1. Push this folder to a GitHub repository
2. Go to Settings > Pages
3. Select main branch and root folder
4. Your site will be live at `https://yourusername.github.io/repo-name/`

### Deploy to Netlify
1. Drag and drop the Arjunauvacha folder to netlify.com
2. Site goes live instantly!

### Deploy to Vercel
1. Run: `vercel --prod`
2. Follow the prompts
3. Site goes live!

## File Structure
```
Arjunauvacha/
├── index.html              # Main HTML file
├── static/
│   ├── css/
│   │   └── main.css        # All styles
│   ├── js/
│   │   ├── config.js       # Configuration (set to static mode)
│   │   └── main.js         # Main JavaScript with Gita quotes
│   └── images/             # Static images
└── README_STATIC.md        # This file
```

## What Changed

### Removed:
- ❌ Flask server and all Python dependencies
- ❌ SQLite database
- ❌ Admin login functionality
- ❌ Event management system
- ❌ API endpoints
- ❌ Upload functionality

### Added:
- ✅ 15+ Bhagavad Gita quotes with Sanskrit and English translations
- ✅ Auto-rotating quote display (every 10 seconds)
- ✅ Manual "Next Teaching" button
- ✅ Beautiful gradient UI for quotes section
- ✅ Fully static architecture

## Customization

### Adding More Quotes
Edit `static/js/main.js` and add to the `gitaQuotes` array:
```javascript
{
    sanskrit: "Your Sanskrit verse here",
    translation: "Your English translation here",
    chapter: "Chapter X, Verse Y"
}
```

### Changing Images
Replace images in `static/images/` folder and update the array in `main.js`

### Styling
Modify `static/css/main.css` to change colors, fonts, and layouts

## Browser Support
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Contact
- 📧 Email: adhayageeta@gmail.com
- 📺 YouTube: https://www.youtube.com/@Arjunauvacha_Om
- 💬 WhatsApp: https://chat.whatsapp.com/Cuy38GIN4HbHIby9SzUSwn

---

🕉️ Hare Krishna! Radhe Radhe! 🕉️
