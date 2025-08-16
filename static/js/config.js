// Pluggable remote storage configuration
// Set REMOTE_BACKEND to one of: 'none' | 'supabase' | 'firebase' | 'api'
// For now default to 'none' (localStorage only). Fill the fields below to enable.
window.AppConfig = {
  REMOTE_BACKEND: 'api',
  // If using Supabase
  supabase: {
    url: '', // e.g., 'https://YOUR-PROJECT.supabase.co'
    anonKey: ''
  },
  // If using a custom API (e.g., Vercel Functions)
  api: {
  baseUrl: '/api', // served by Flask on the same origin
    adminToken: '' // set this to your ADMIN_TOKEN for protected writes
  }
};
