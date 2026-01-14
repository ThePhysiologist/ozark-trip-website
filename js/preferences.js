// Ozark Trip Preferences Utility
// Uses localStorage with key 'ozarkPrefs'

const PREFS_KEY = 'ozarkPrefs';

// Get all preferences
function getPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

// Save preferences
function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Could not save preferences:', e);
  }
}

// Get a single preference
function getPref(key) {
  return getPrefs()[key];
}

// Set a single preference
function setPref(key, value) {
  const prefs = getPrefs();
  if (value === null || value === undefined || value === false) {
    delete prefs[key];
  } else {
    prefs[key] = value;
  }
  savePrefs(prefs);
}

// Toggle a boolean preference
function togglePref(key) {
  const prefs = getPrefs();
  if (prefs[key]) {
    delete prefs[key];
  } else {
    prefs[key] = true;
  }
  savePrefs(prefs);
  return prefs[key];
}

// Clear all preferences
function clearAllPrefs() {
  if (confirm('Clear all your preferences and selections?')) {
    localStorage.removeItem(PREFS_KEY);
    location.reload();
  }
}

// Initialize common preference button behavior
document.addEventListener('DOMContentLoaded', () => {
  // Generic pref buttons with data-pref attribute
  document.querySelectorAll('.pref-btn[data-pref]').forEach(btn => {
    const prefKey = btn.dataset.pref;
    
    // Set initial state
    if (getPref(prefKey)) {
      btn.classList.add('active');
    }
    
    // Handle clicks (unless page has custom handler)
    if (!btn.hasAttribute('data-custom-handler')) {
      btn.addEventListener('click', () => {
        const isActive = togglePref(prefKey);
        btn.classList.toggle('active', isActive);
        
        // Update parent card if it exists
        const card = btn.closest('.destination-card, .flight-card');
        if (card) {
          card.classList.toggle('selected', isActive);
        }
      });
    }
  });
});

// Export for use in inline scripts
window.ozarkPrefs = {
  get: getPref,
  set: setPref,
  toggle: togglePref,
  getAll: getPrefs,
  saveAll: savePrefs,
  clearAll: clearAllPrefs
};
