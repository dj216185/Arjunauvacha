# Quick helper to run the app locally from Arjunauvacha folder
param(
    [string]$Token = 'change-me'
)

py -3 -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; $env:ADMIN_TOKEN = $Token; python app.py
