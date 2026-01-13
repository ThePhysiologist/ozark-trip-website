# Ozark Folk Center Trip Planner

A simple website to plan your August 16-19, 2025 trip to the Ozark Folk Center State Park in Mountain View, Arkansas.

## How to Use

### Viewing the Site
1. Download the zip file and extract it
2. Open `index.html` in any web browser
3. Navigate between pages using the top menu

Or simply upload all files to any web hosting service (GitHub Pages, Netlify, etc.) to share online.

### Features
- **Overview**: Trip summary, dates, and airport comparison
- **Flights**: Links to Google Flights with pre-filled search parameters for live pricing
- **Logistics**: Car rental estimates, lodging links, and ground transportation comparison
- **Preferences**: Click "Prefer" buttons to mark your choices (saved locally in your browser)
- **Filtering**: Filter flights by airport or show only preferred options

### iPad Friendly
The site is designed to work well on iPad and other tablets.

## Files Included
```
index.html      - Trip overview and airport comparison
flights.html    - Flight search links for both travelers
logistics.html  - Car rental, lodging, and logistics info
css/main.css    - Styling
js/preferences.js - Preference tracking functionality
```

## Trip Details

**Destination**: Ozark Folk Center State Park, Mountain View, AR
**Dates**: August 16-19, 2025

**Travelers**:
- Luke (from Richmond, VA - RIC)
- Dad (from Portland, OR - PDX)
- Clifford (optional, from St. Louis - only if flying via STL)

**Airport Options**:
| Airport | Drive Time | Distance |
|---------|-----------|----------|
| STL (St. Louis) | 4.5 hours | 300 miles |
| LIT (Little Rock) | 2 hours | 100 miles |
| MEM (Memphis) | 3 hours | 160 miles |

## Converting to Jekyll (Optional)

If you want to use Jekyll for templating, the Jekyll source files are also included in the `/ozark-trip` directory. Install Jekyll and run:

```bash
cd ozark-trip
bundle install
bundle exec jekyll serve
```

## Live Prices

All flight and car rental buttons link to Google Flights and Kayak with the dates pre-filled. Prices will be current whenever you click them.

---

Built for Luke & Dad's trip planning
