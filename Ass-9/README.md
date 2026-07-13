# ⚡ TUFFANI — Locked In Productivity Dashboard 

No cap, standard dashboards are cooked. They are boring, cluttered, and look like they were designed in 2012. 
**Tuffani** hits different. It's a clean, single-screen productivity base designed to keep you focused *fr fr*. 3 columns, zero page scroll, fluid glassmorphism vibes, and no frame drops. Just pure aesthetic productivity.

---

## ⚡ The Vibe Check (Key Features)

*   **📝 Todo List (Main Character Energy)** — Manage tasks inline. Check them off, star your high-priority items, delete the trash, and filter with clean pills. All saved to `localStorage` so it doesn't disappear when you reload.
*   **📅 Daily Planner (No Cap Scheduler)** — A clean, scrollable 18-hour timeline that maps your day. It flags the current hour slot with a pulsing `NOW` badge and scrolls you directly to it.
*   **🎯 Daily Goals (Flex Your Progress)** — Set your daily targets and watch your progress bar fill up in real time. It's giving high-achiever vibes.
*   **⏱️ Pomodoro Timer (Focus Mode: Active)** — A glowing, circular SVG timer with Focus, Short Break, and Long Break presets. When the timer hits zero, it plays a clean 3-tone chime via the Web Audio API to wake you up.
*   **💡 Daily Motivation (Spitting Facts)** — Displays random quotes fetched straight from the web, with handpicked local fallbacks in case your Wi-Fi acts up.
*   **🌤️ Live Weather (Aesthetic Skies)** — Auto-detects where you are via Geolocation/IP lookup, fetching temp, feels-like conditions, humidity, and wind speed from Open-Meteo. No API keys, no setups.

---

## 🛠️ The Tech Stack (Absolute Cinema)

1.  **Pure Frontend, Fr**  
    Zero bloated JS frameworks. Zero Tailwind configs. Built with semantic HTML5, CSS custom properties, and raw, optimized vanilla JavaScript.
2.  **Zero FOUC (Anti-Flash System)**  
    No ugly flashes when loading your dark/light theme. A script blocks the header rendering for a split millisecond to check your local settings and set the vibe before anything displays.
3.  **Screen Real Estate: Maximum**  
    Locked to `100vh` on desktop. Everything fits onto one screen, using independent flex containers so you don't scroll the main page.
4.  **Local Storage Engine**  
    Your planner, goals, todos, and theme choices are all synced locally in your browser.
5.  **Clean APIs Only**  
    Uses Open-Meteo and Nominatim, working instantly on launch without requiring keys.

---

## 🚀 How to Run (Don't Be A Boomer)

Because this uses browser Geolocation and Fetch APIs, running it off a raw file path is not the move. You need a local server.

### Option 1: Live Server (The Easiest Route)
1. Open the project in VS Code.
2. Hit **Go Live** in the bottom bar (grab the Live Server extension if you don't have it).
3. The dashboard loads at `http://127.0.0.1:5500`.

### Option 2: Python (Quick & Clean)
Open your terminal inside the folder and run:
```bash
python -m http.server 8000
```
Open `http://localhost:8000` and get to work.

### Option 3: Node.js (Dev-tier)
```bash
npx http-server -p 8000
```
Then hit `http://localhost:8000`.

---

## 🎨 Aesthetic Palettes

The UI uses custom color-coded top borders to organize each widget:
*   **Todo**: Soft Indigo (`#8172db`)
*   **Planner**: Steel Blue (`#4a82ad`)
*   **Goals**: Forest Green (`#4da166`)
*   **Pomodoro**: Terracotta Red (`#ba5d58`)
*   **Weather**: Teal (`#359ba6`)
*   **Quote**: Amber Gold (`#b08130`)
