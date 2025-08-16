Quick run (local)

1. Create venv and install deps

   cd Arjunauvacha
   py -3 -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt

2. Start app

   $env:ADMIN_TOKEN = 'your-secret-token'
   python app.py

Notes
- This serves the frontend at http://localhost:5000/ and API under /api
- Uploaded images go to `backend/uploads`
- Database is `backend/data.db`
