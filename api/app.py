# Vercel entrypoint for the Arjunauvacha app
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.append(str(ROOT))

from app import app as application
