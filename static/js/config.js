// Static configuration - no backend needed
// All data is stored locally in the browser
window.AppConfig = {
  REMOTE_BACKEND: 'none', // Fully static, no API calls
  supabase: {
    url: '',
    anonKey: ''
  },
  api: {
    baseUrl: '',
    adminToken: ''
  }
};
