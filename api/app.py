# Vercel entrypoint for the Arjunauvacha app
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT))

# Import from backend/app.py which has all the endpoints
from backend.app import app as application

# Expose app for Vercel
app = application
