import os
from flask import Flask, request, jsonify, abort, send_from_directory, send_file
from flask_cors import CORS
from datetime import datetime
import sqlite3
from pathlib import Path
# werkzeug import removed - no longer needed for uploads

BASE_DIR = Path(__file__).parent
# Store DB inside the bundled backend directory
DB_PATH = BASE_DIR / 'backend' / 'data.db'
# Upload functionality removed - images served directly from static/images
# Frontend lives in this folder
FRONTEND_DIR = BASE_DIR
FRONTEND_STATIC_DIR = FRONTEND_DIR / 'static'
ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', 'change-me')

app = Flask(__name__)
CORS(app)
# Max content length removed - no longer needed for uploads

# Upload directory setup removed - no longer needed

# --- DB helpers ---

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            src TEXT NOT NULL,
            caption TEXT
        )
        """
    )
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            datetime TEXT NOT NULL,
            joinUrl TEXT
        )
        """
    )
    conn.commit()
    conn.close()

# Initialize DB at import time (Flask 3.x safe)
with app.app_context():
    init_db()

# --- Auth ---

def require_admin():
    token = request.headers.get('x-admin-token')
    if token != ADMIN_TOKEN:
        abort(401)

# --- Routes ---

@app.get('/api/gallery')
def get_gallery():
    conn = get_db()
    rows = conn.execute('SELECT src, caption FROM gallery ORDER BY id DESC').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.put('/api/gallery')
def put_gallery():
    require_admin()
    data = request.get_json(silent=True) or []
    if not isinstance(data, list):
        abort(400)
    conn = get_db()
    cur = conn.cursor()
    cur.execute('DELETE FROM gallery')
    cur.executemany('INSERT INTO gallery (src, caption) VALUES (?, ?)', [(d.get('src',''), d.get('caption')) for d in data])
    conn.commit()
    conn.close()
    return jsonify({"ok": True})

@app.get('/api/events')
def get_events():
    conn = get_db()
    rows = conn.execute('SELECT id, title, datetime, joinUrl FROM events ORDER BY datetime DESC').fetchall()
    conn.close()
    return jsonify([dict(r) for r in rows])

@app.put('/api/events')
def put_events():
    require_admin()
    data = request.get_json(silent=True) or []
    if not isinstance(data, list):
        abort(400)
    conn = get_db()
    cur = conn.cursor()
    cur.execute('DELETE FROM events')
    cur.executemany('INSERT INTO events (id, title, datetime, joinUrl) VALUES (?, ?, ?, ?)',
                    [(d.get('id'), d.get('title'), d.get('datetime'), d.get('joinUrl')) for d in data])
    conn.commit()
    conn.close()
    return jsonify({"ok": True})

# --- Upload functionality removed - images now served directly from static/images ---
# 
# ALLOWED_EXT = {'.jpg', '.jpeg', '.png', '.gif', '.webp'}
# 
# @app.post('/api/upload')
# def upload_image():
#     require_admin()
#     if 'file' not in request.files:
#         abort(400)
#     f = request.files['file']
#     if not f or f.filename == '':
#         abort(400)
#     filename = secure_filename(f.filename)
#     ext = Path(filename).suffix.lower()
#     if ext not in ALLOWED_EXT:
#         abort(415)
#     ts = datetime.utcnow().strftime('%Y%m%d%H%M%S%f')
#     final_name = f"{ts}{ext}"
#     save_path = UPLOAD_DIR / final_name
#     f.save(save_path)
#     # Absolute URL for the browser
#     url = request.host_url.rstrip('/') + f"/uploads/{final_name}"
#     return jsonify({"url": url})

# --- Serve frontend and assets ---

# @app.get('/uploads/<path:filename>')
# def uploads(filename: str):
#     return send_from_directory(UPLOAD_DIR, filename)

@app.get('/static/<path:filename>')
def static_files(filename: str):
    # Serve frontend static assets
    return send_from_directory(FRONTEND_STATIC_DIR, filename)

@app.get('/')
def index():
    index_path = FRONTEND_DIR / 'index.html'
    return send_file(index_path)

@app.get('/health')
def health():
    return jsonify({"status": "ok", "time": datetime.utcnow().isoformat() + 'Z'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))
