Run the Flask server

1) Create venv and install deps

   powershell:

   cd backend
   py -3 -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt

2) Set admin token and start

   $env:ADMIN_TOKEN = 'your-secret-token'
   python .\app.py

This serves:
- Frontend at http://localhost:5000/
- API under /api
- Uploads under /uploads

Configure frontend token in Arjunauvacha/static/js/config.js -> api.adminToken.
