// Preferences management using localStorage
const STORAGE_KEY = 'ozark-trip-preferences';

// Initialize preferences from localStorage
function getPreferences() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { flights: [], destination: null };
  } catch (e) {
    return { flights: [], destination: null };
  }
}

function savePreferences(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Could not save preferences:', e);
  }
}

// Toggle flight preference
function toggleFlightPreference(value) {
  const prefs = getPreferences();
  const index = prefs.flights.indexOf(value);
  
  if (index === -1) {
    prefs.flights.push(value);
  } else {
    prefs.flights.splice(index, 1);
  }
  
  savePreferences(prefs);
  updateUI();
}

// Set destination preference
function setDestinationPreference(value) {
  const prefs = getPreferences();
  prefs.destination = prefs.destination === value ? null : value;
  savePreferences(prefs);
  updateUI();
}

// Clear all preferences
function clearAllPreferences() {
  if (confirm('Clear all your preferences?')) {
    localStorage.removeItem(STORAGE_KEY);
    updateUI();
  }
}

// Update UI based on current preferences
function updateUI() {
  const prefs = getPreferences();
  
  // Update flight cards
  document.querySelectorAll('.flight-card').forEach(card => {
    const prefBtn = card.querySelector('.pref-btn');
    if (prefBtn) {
      const value = prefBtn.dataset.value;
      const isSelected = prefs.flights.includes(value);
      card.classList.toggle('selected', isSelected);
      prefBtn.classList.toggle('active', isSelected);
      prefBtn.textContent = isSelected ? 'Preferred' : 'Prefer';
    }
  });
  
  // Update destination cards
  document.querySelectorAll('.destination-card').forEach(card => {
    const dest = card.dataset.destination;
    const prefBtn = card.querySelector('.pref-btn');
    const isSelected = prefs.destination === dest;
    card.classList.toggle('selected', isSelected);
    if (prefBtn) {
      prefBtn.classList.toggle('active', isSelected);
      prefBtn.textContent = isSelected ? 'Preferred' : 'Mark as Preferred';
    }
  });
  
  // Update preferences summary
  updatePreferencesSummary(prefs);
}

// Update the preferences summary panel
function updatePreferencesSummary(prefs) {
  const summaryEl = document.getElementById('preferences-summary');
  if (!summaryEl) return;
  
  const parts = [];
  
  if (prefs.destination) {
    const destNames = { stl: 'St. Louis (STL)', lit: 'Little Rock (LIT)', mem: 'Memphis (MEM)' };
    parts.push(`<div class="summary-item"><strong>Destination:</strong> ${destNames[prefs.destination] || prefs.destination}</div>`);
  }
  
  if (prefs.flights.length > 0) {
    const flightLabels = prefs.flights.map(f => {
      const [traveler, airport, direction] = f.split('-');
      const travelerName = traveler === 'luke' ? 'Luke' : 'Dad';
      const dirLabel = direction === 'out' ? 'outbound' : 'return';
      return `${travelerName} ${airport.toUpperCase()} ${dirLabel}`;
    });
    parts.push(`<div class="summary-item"><strong>Preferred flights:</strong><br>${flightLabels.join('<br>')}</div>`);
  }
  
  if (parts.length === 0) {
    summaryEl.innerHTML = '<p class="summary-empty">No preferences marked yet. Click "Prefer" on flights to track your choices.</p>';
  } else {
    summaryEl.innerHTML = parts.join('');
  }
}

// Airport filter functionality
function setupFilters() {
  // Airport filter buttons
  document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      // Update active state
      document.querySelectorAll('.filter-btn[data-filter]').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === filter);
      });
      
      // Filter flight cards
      document.querySelectorAll('.flight-card').forEach(card => {
        const airport = card.dataset.airport;
        if (filter === 'all' || airport === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
  
  // Preferred filter buttons
  document.querySelectorAll('.filter-btn[data-show]').forEach(btn => {
    btn.addEventListener('click', () => {
      const show = btn.dataset.show;
      const prefs = getPreferences();
      
      // Update active state
      document.querySelectorAll('.filter-btn[data-show]').forEach(b => {
        b.classList.toggle('active', b.dataset.show === show);
      });
      
      // Filter flight cards
      document.querySelectorAll('.flight-card').forEach(card => {
        const prefBtn = card.querySelector('.pref-btn');
        if (!prefBtn) return;
        
        const value = prefBtn.dataset.value;
        const isPreferred = prefs.flights.includes(value);
        
        if (show === 'all') {
          card.classList.remove('hidden');
        } else if (show === 'preferred') {
          card.classList.toggle('hidden', !isPreferred);
        }
      });
    });
  });
}

// Setup click handlers for preference buttons
function setupPreferenceButtons() {
  document.querySelectorAll('.pref-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefType = btn.dataset.pref;
      const value = btn.dataset.value;
      
      if (prefType === 'flight') {
        toggleFlightPreference(value);
      } else if (prefType === 'destination') {
        setDestinationPreference(value);
      }
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setupPreferenceButtons();
  setupFilters();
  updateUI();
});
