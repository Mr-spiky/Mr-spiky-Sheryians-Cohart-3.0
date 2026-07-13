'use strict';

/* ═══════════════════════════════════════════════════════
   FlowSpace — script.js
   All application logic for the inline Dashboard.
═══════════════════════════════════════════════════════ */

// ─────────────────────────────────────────────────────
//  Storage — localStorage wrapper with error handling
// ─────────────────────────────────────────────────────
const store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota exceeded or private mode
    }
  }
};

const KEYS = {
  theme:   'fs_theme',
  todos:   'fs_todos',
  goals:   'fs_goals',
  planner: (date) => `fs_plan_${date}`,
};

// ─────────────────────────────────────────────────────
//  Toast — lightweight notification system
// ─────────────────────────────────────────────────────
function showToast(message, type = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast${type ? ' ' + type : ''}`;
  el.textContent = message;
  container.appendChild(el);

  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));

  setTimeout(() => {
    el.classList.remove('show');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  }, 3200);
}

// ─────────────────────────────────────────────────────
//  Clock, Greeting & Dynamic Background
// ─────────────────────────────────────────────────────
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function getTimeOfDay(hour) {
  if (hour >= 5  && hour < 9)  return 'dawn';
  if (hour >= 9  && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
}

function getGreeting(hour) {
  if (hour >= 5  && hour < 12) return 'Good morning.';
  if (hour >= 12 && hour < 17) return 'Good afternoon.';
  if (hour >= 17 && hour < 21) return 'Good evening.';
  return 'Good night.';
}

let lastTimeOfDay = null;

function tickClock() {
  const now  = new Date();
  const h    = now.getHours();
  const m    = now.getMinutes();
  const s    = now.getSeconds();
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12  = h % 12 || 12;

  const pad = n => String(n).padStart(2, '0');
  const clockTime = document.getElementById('clockTime');
  const clockDate = document.getElementById('clockDate');
  const greetingText = document.getElementById('greetingText');

  if (clockTime) clockTime.textContent = `${pad(h12)}:${pad(m)}:${pad(s)} ${ampm}`;
  if (clockDate) clockDate.textContent = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;

  if (s === 0 && greetingText) {
    greetingText.textContent = getGreeting(h);
  }

  const tod = getTimeOfDay(h);
  if (tod !== lastTimeOfDay) {
    lastTimeOfDay = tod;
    const html = document.documentElement;
    html.className = html.className.replace(/\btime-\w+\b/g, '').trim();
    html.classList.add(`time-${tod}`);

    if (tod === 'night') startStarfield();
    else stopStarfield();
  }

  updatePlannerActiveSlot();
}

// ─────────────────────────────────────────────────────
//  Starfield Animation
// ─────────────────────────────────────────────────────
let starRaf  = null;
let starList = [];

function startStarfield() {
  const canvas = document.getElementById('starCanvas');
  if (starRaf || !canvas) return;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('visible');

  const ctx = canvas.getContext('2d');

  starList = Array.from({ length: 150 }, () => ({
    x:     Math.random() * canvas.width,
    y:     Math.random() * canvas.height,
    r:     Math.random() * 1.2 + 0.2,
    alpha: Math.random() * 0.5 + 0.1,
    speed: Math.random() * 0.005 + 0.002,
    phase: Math.random() * Math.PI * 2,
  }));

  let tick = 0;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of starList) {
      const a = s.alpha * (0.45 + 0.55 * Math.sin(tick * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
      ctx.fill();
    }
    tick++;
    starRaf = requestAnimationFrame(draw);
  };

  draw();
}

function stopStarfield() {
  if (starRaf) {
    cancelAnimationFrame(starRaf);
    starRaf = null;
  }
  const canvas = document.getElementById('starCanvas');
  if (canvas) canvas.classList.remove('visible');
}

window.addEventListener('resize', () => {
  const canvas = document.getElementById('starCanvas');
  if (!canvas || !starRaf) return;
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  for (const s of starList) {
    s.x = Math.random() * canvas.width;
    s.y = Math.random() * canvas.height;
  }
});

// ─────────────────────────────────────────────────────
//  Theme Switching
// ─────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('themeIcon');
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
  store.set(KEYS.theme, theme);
}

function initTheme() {
  const saved = store.get(KEYS.theme, 'dark');
  applyTheme(saved);

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function escapeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

// ─────────────────────────────────────────────────────
//  Todo List — Functional directly on screen
// ─────────────────────────────────────────────────────
let todos      = store.get(KEYS.todos, []);
let todoFilter = 'all';

function saveTodos() { store.set(KEYS.todos, todos); }

function updateTodoMeta() {
  const active = todos.filter(t => !t.done).length;
  const total  = todos.length;
  const meta   = total === 0 ? 'No tasks'
               : active === 0 ? 'All done! 🎉'
               : `${active} left`;
  const el = document.getElementById('todo-meta');
  if (el) el.textContent = meta;
}

function renderTodos() {
  const list  = document.getElementById('todo-list');
  const empty = document.getElementById('todo-empty');
  if (!list || !empty) return;

  const visible = todos.filter(t => {
    if (todoFilter === 'active')    return !t.done;
    if (todoFilter === 'completed') return  t.done;
    if (todoFilter === 'important') return  t.important;
    return true;
  });

  list.innerHTML = '';

  if (visible.length === 0) {
    empty.textContent = todos.length === 0
      ? 'Add a task above'
      : 'No tasks match filter';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    for (const task of visible) {
      const li = document.createElement('li');
      li.className = `task-item${task.done ? ' completed' : ''}${task.important ? ' important' : ''}`;
      li.dataset.id = task.id;
      li.innerHTML = `
        <button class="task-check${task.done ? ' checked' : ''}" aria-label="Toggle complete" aria-pressed="${task.done}"></button>
        <span class="task-text">${escapeHTML(task.text)}</span>
        <div class="task-actions" aria-label="Task actions">
          <button class="task-btn${task.important ? ' star-active' : ''}" data-action="star" aria-label="Toggle important" title="Mark important">⭐</button>
          <button class="task-btn del-btn" data-action="del" aria-label="Delete task" title="Delete">🗑️</button>
        </div>
      `;
      list.appendChild(li);
    }
  }

  updateTodoMeta();
}

function initTodo() {
  const input  = document.getElementById('todo-input');
  const addBtn = document.getElementById('todo-add-btn');
  const list   = document.getElementById('todo-list');

  function addTodo() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    todos.unshift({ id: Date.now(), text, done: false, important: false });
    saveTodos();
    renderTodos();
    input.value = '';
    input.focus();
  }

  addBtn?.addEventListener('click', addTodo);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

  list?.addEventListener('click', e => {
    const li = e.target.closest('.task-item');
    if (!li) return;

    const id   = Number(li.dataset.id);
    const task = todos.find(t => t.id === id);
    if (!task) return;

    if (e.target.classList.contains('task-check') || e.target.classList.contains('task-text') || e.target === li) {
      task.done = !task.done;
    } else if (e.target.dataset.action === 'star') {
      task.important = !task.important;
    } else if (e.target.dataset.action === 'del') {
      todos = todos.filter(t => t.id !== id);
    } else {
      return;
    }

    saveTodos();
    renderTodos();
  });

  document.getElementById('todo-filters')?.addEventListener('click', e => {
    const pill = e.target.closest('.filter-pill');
    if (!pill) return;
    document.querySelectorAll('#todo-filters .filter-pill').forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-selected', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-selected', 'true');
    todoFilter = pill.dataset.filter;
    renderTodos();
  });

  renderTodos();
}

// ─────────────────────────────────────────────────────
//  Daily Planner — Persistent widget
// ─────────────────────────────────────────────────────
const TODAY_ISO  = new Date().toISOString().slice(0, 10);
const PLANNER_KEY = KEYS.planner(TODAY_ISO);

const TIME_SLOTS = [
  '06:00','07:00','08:00','09:00','10:00','11:00',
  '12:00','13:00','14:00','15:00','16:00','17:00',
  '18:00','19:00','20:00','21:00','22:00','23:00',
];

let lastActiveHourSlot = null;

function fmtSlot(slot) {
  const [h] = slot.split(':').map(Number);
  const period  = h < 12 ? 'AM' : 'PM';
  const display = h % 12 || 12;
  return `${display}:00 ${period}`;
}

function updatePlannerMeta() {
  const data  = store.get(PLANNER_KEY, {});
  const count = Object.keys(data).length;
  const el = document.getElementById('planner-meta');
  if (el) {
    el.textContent = count === 0 ? 'Plan your day' : `${count} slot${count !== 1 ? 's' : ''} set`;
  }
}

function scrollToCurrentSlot() {
  const el = document.querySelector('.planner-slots .is-now');
  if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
}

function updatePlannerActiveSlot() {
  const now = new Date();
  const curH = String(now.getHours()).padStart(2, '0');
  const curSlot = `${curH}:00`;

  if (curSlot === lastActiveHourSlot) return;
  lastActiveHourSlot = curSlot;

  const rows = document.querySelectorAll('.planner-slots .slot-row');
  rows.forEach(row => {
    const slot = row.dataset.slot;
    const isCurrent = slot === curSlot;

    // Toggle the 'is-now' class
    row.classList.toggle('is-now', isCurrent);

    // Toggle the input placeholder
    const inp = row.querySelector('.slot-input');
    if (inp) {
      inp.placeholder = isCurrent ? 'Active slot now…' : 'Add a plan…';
    }

    // Update the NOW badge
    const existingBadge = row.querySelector('.slot-now-badge');
    if (isCurrent && !existingBadge) {
      const badge = document.createElement('span');
      badge.className = 'slot-now-badge';
      badge.textContent = 'NOW';
      badge.setAttribute('aria-hidden', 'true');
      row.appendChild(badge);
    } else if (!isCurrent && existingBadge) {
      existingBadge.remove();
    }
  });

  // Smooth scroll to the newly active slot
  scrollToCurrentSlot();
}

function initPlanner() {
  const now     = new Date();
  const container = document.getElementById('planner-slots');
  if (!container) return;
  const data    = store.get(PLANNER_KEY, {});
  const curH    = String(now.getHours()).padStart(2, '0');
  const curSlot = `${curH}:00`;

  const dateLabel = document.getElementById('planner-date');
  if (dateLabel) {
    dateLabel.textContent = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}`;
  }

  container.innerHTML = '';

  for (const slot of TIME_SLOTS) {
    const isCurrent = slot === curSlot;
    const row = document.createElement('div');
    row.className = `slot-row${isCurrent ? ' is-now' : ''}`;
    row.dataset.slot = slot;

    const timeEl = document.createElement('span');
    timeEl.className = 'slot-time';
    timeEl.textContent = fmtSlot(slot);
    timeEl.setAttribute('aria-hidden', 'true');

    const inp = document.createElement('input');
    inp.type = 'text';
    inp.className = 'slot-input';
    inp.value = data[slot] || '';
    inp.placeholder = isCurrent ? 'Active slot now…' : 'Add a plan…';
    inp.setAttribute('aria-label', `Plan for ${fmtSlot(slot)}`);
    inp.maxLength = 200;

    if (isCurrent) {
      const badge = document.createElement('span');
      badge.className = 'slot-now-badge';
      badge.textContent = 'NOW';
      badge.setAttribute('aria-hidden', 'true');
      row.appendChild(badge);
    }

    let debounceTimer;
    inp.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const latest = store.get(PLANNER_KEY, {});
        const val = inp.value.trim();
        if (val) latest[slot] = val;
        else     delete latest[slot];
        store.set(PLANNER_KEY, latest);
        updatePlannerMeta();
      }, 400);
    });

    row.insertBefore(timeEl, row.firstChild);
    row.appendChild(inp);
    container.appendChild(row);
  }

  lastActiveHourSlot = curSlot;
  updatePlannerMeta();
  scrollToCurrentSlot();
}

// ─────────────────────────────────────────────────────
//  Daily Goals — Inline widget
// ─────────────────────────────────────────────────────
let goals = store.get(KEYS.goals, []);

function saveGoals() { store.set(KEYS.goals, goals); }

function updateGoalsMeta() {
  const done  = goals.filter(g => g.done).length;
  const total = goals.length;
  const el = document.getElementById('goals-meta');
  if (el) {
    el.textContent = total === 0 ? 'No goals set'
      : done === total ? 'All completed! 🏆'
      : `${done} of ${total} done`;
  }
}

function renderGoals() {
  const list  = document.getElementById('goals-list');
  const empty = document.getElementById('goals-empty');
  const bar   = document.getElementById('goals-bar');
  const count = document.getElementById('goals-count');
  const track = document.getElementById('goals-progress-track');

  if (!list || !empty || !bar || !count || !track) return;

  const done  = goals.filter(g => g.done).length;
  const total = goals.length;
  const pct   = total ? Math.round((done / total) * 100) : 0;

  count.textContent = `${done} of ${total} completed`;
  bar.style.width   = `${pct}%`;
  track.setAttribute('aria-valuenow', pct);

  list.innerHTML = '';

  if (total === 0) {
    empty.classList.remove('hidden');
    updateGoalsMeta();
    return;
  }
  empty.classList.add('hidden');

  for (const goal of goals) {
    const li = document.createElement('li');
    li.className = `task-item${goal.done ? ' completed' : ''}`;
    li.dataset.id = goal.id;
    li.innerHTML = `
      <button class="task-check${goal.done ? ' checked' : ''}" aria-label="Toggle complete" aria-pressed="${goal.done}"></button>
      <span class="task-text">${escapeHTML(goal.text)}</span>
      <div class="task-actions">
        <button class="task-btn del-btn" data-action="del" aria-label="Delete goal" title="Delete">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  }

  updateGoalsMeta();
}

function initGoals() {
  const input  = document.getElementById('goals-input');
  const addBtn = document.getElementById('goals-add-btn');
  const list   = document.getElementById('goals-list');

  function addGoal() {
    if (!input) return;
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    goals.push({ id: Date.now(), text, done: false });
    saveGoals();
    renderGoals();
    input.value = '';
    input.focus();
  }

  addBtn?.addEventListener('click', addGoal);
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') addGoal(); });

  list?.addEventListener('click', e => {
    const li = e.target.closest('.task-item');
    if (!li) return;

    const id   = Number(li.dataset.id);
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    if (e.target.classList.contains('task-check') || e.target.classList.contains('task-text') || e.target === li) {
      goal.done = !goal.done;
      if (goal.done) showToast(`Goal done: "${goal.text.slice(0, 30)}" ✅`, 'success');
    } else if (e.target.dataset.action === 'del') {
      goals = goals.filter(g => g.id !== id);
    } else {
      return;
    }

    saveGoals();
    renderGoals();
  });

  renderGoals();
}

// ─────────────────────────────────────────────────────
//  Pomodoro Timer
// ─────────────────────────────────────────────────────
const DURATIONS = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
const LABELS    = { work: 'Focus Session', short: 'Short Break', long: 'Long Break' };
const RING_CIRC = 2 * Math.PI * 96;

let pomoMode    = 'work';
let pomoLeft    = DURATIONS.work;
let pomoTotal   = DURATIONS.work;
let pomoRunning = false;
let pomoTimer   = null;
let worksDone   = 0;
let pomoCycle   = 1;

function fmtTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updatePomoUI() {
  const timeEl  = document.getElementById('pomoTime');
  const labelEl = document.getElementById('pomoModeLabel');
  const btnEl   = document.getElementById('pomoStartPause');
  const ringEl  = document.getElementById('pomoRing');
  const sessEl  = document.getElementById('pomoSession');

  if (timeEl) timeEl.textContent = fmtTime(pomoLeft);
  if (labelEl) labelEl.textContent = LABELS[pomoMode];
  if (btnEl) btnEl.textContent = pomoRunning ? '⏸ Pause' : '▶ Start';
  if (sessEl) sessEl.textContent = pomoCycle;

  if (ringEl) {
    ringEl.style.strokeDashoffset = RING_CIRC * (1 - pomoLeft / pomoTotal);
    const modeColors = { work: '#ba5d58', short: '#4da166', long: '#4a82ad' };
    ringEl.style.stroke = modeColors[pomoMode];
  }

  document.querySelectorAll('.pomo-tab').forEach(t => {
    const active = t.dataset.mode === pomoMode;
    t.classList.toggle('active', active);
    t.setAttribute('aria-selected', active);
  });

  document.querySelectorAll('.session-dot').forEach(dot => {
    const s = Number(dot.dataset.s);
    dot.classList.remove('active', 'done');
    if (s === pomoCycle)    dot.classList.add('active');
    else if (s < pomoCycle) dot.classList.add('done');
  });

  if (pomoRunning) {
    document.title = `${fmtTime(pomoLeft)} · ${LABELS[pomoMode]} — FlowSpace`;
  }
}

function setMode(mode) {
  clearInterval(pomoTimer);
  pomoTimer   = null;
  pomoRunning = false;
  pomoMode    = mode;
  pomoLeft    = DURATIONS[mode];
  pomoTotal   = DURATIONS[mode];
}

function playChime() {
  try {
    const ctx   = new AudioContext();
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t0 = ctx.currentTime + i * 0.2;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.15, t0 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.7);
      osc.start(t0);
      osc.stop(t0 + 0.7);
    });
  } catch { }
}

function updatePomodoroMeta() {
  const el = document.getElementById('pomodoro-meta');
  if (!el) return;
  el.textContent = pomoRunning
    ? 'Running'
    : worksDone > 0 ? `${worksDone} done`
    : 'Ready';
}

function onPomoComplete() {
  clearInterval(pomoTimer);
  pomoTimer   = null;
  pomoRunning = false;
  pomoLeft    = 0;

  playChime();

  if (pomoMode === 'work') {
    worksDone++;
    pomoCycle = (worksDone % 4) + 1;

    if (worksDone % 4 === 0) {
      showToast('Set finished! Take a longer break ☕', 'success');
      setMode('long');
    } else {
      showToast('Focus session complete! Break time.', 'success');
      setMode('short');
    }
  } else {
    showToast('Break over! Next session starting.', 'success');
    setMode('work');
  }

  document.title = 'FlowSpace — Productivity Dashboard';
  updatePomoUI();
  updatePomodoroMeta();
}

function initPomodoro() {
  const startPauseBtn = document.getElementById('pomoStartPause');
  const resetBtn      = document.getElementById('pomoReset');
  const skipBtn       = document.getElementById('pomoSkip');

  startPauseBtn?.addEventListener('click', () => {
    if (pomoRunning) {
      clearInterval(pomoTimer);
      pomoTimer   = null;
      pomoRunning = false;
    } else {
      clearInterval(pomoTimer);
      pomoRunning = true;
      pomoTimer = setInterval(() => {
        pomoLeft--;
        if (pomoLeft <= 0) {
          onPomoComplete();
        } else {
          updatePomoUI();
        }
      }, 1000);
    }
    updatePomoUI();
    updatePomodoroMeta();
  });

  resetBtn?.addEventListener('click', () => {
    clearInterval(pomoTimer);
    pomoTimer   = null;
    pomoRunning = false;
    pomoLeft    = DURATIONS[pomoMode];
    document.title = 'FlowSpace — Productivity Dashboard';
    updatePomoUI();
    updatePomodoroMeta();
  });

  skipBtn?.addEventListener('click', () => {
    onPomoComplete();
  });

  document.querySelectorAll('.pomo-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (pomoRunning) {
        showToast('Pause timer before switching modes');
        return;
      }
      pomoCycle = 1;
      setMode(tab.dataset.mode);
      updatePomoUI();
      updatePomodoroMeta();
    });
  });

  updatePomoUI();
  updatePomodoroMeta();
}

// ─────────────────────────────────────────────────────
//  Motivation Quotes — Fetched inline on screen
// ─────────────────────────────────────────────────────
const FALLBACK_QUOTES = [
  { content: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { content: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
];

let lastFallbackIdx = -1;

async function fetchQuote() {
  const textEl  = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const btn     = document.getElementById('newQuoteBtn');

  if (btn) {
    btn.disabled   = true;
    btn.textContent = '⌛ Fetching…';
  }

  let quote = null;

  try {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 4000);
    const res = await fetch('https://dummyjson.com/quotes/random', { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (data?.quote) quote = { content: data.quote, author: data.author || 'Unknown' };
    }
  } catch {}

  if (!quote) {
    let idx;
    do { idx = Math.floor(Math.random() * FALLBACK_QUOTES.length); }
    while (idx === lastFallbackIdx && FALLBACK_QUOTES.length > 1);
    lastFallbackIdx = idx;
    quote = FALLBACK_QUOTES[idx];
  }

  if (textEl && authorEl) {
    textEl.style.opacity = '0';
    authorEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = quote.content;
      authorEl.textContent = `— ${quote.author}`;
      textEl.style.opacity = '1';
      authorEl.style.opacity = '1';
    }, 200);
  }

  if (btn) {
    btn.disabled   = false;
    btn.textContent = '✨ New Quote';
  }
}

function initQuote() {
  const textEl   = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  if (textEl) textEl.style.transition = 'opacity 0.2s ease';
  if (authorEl) authorEl.style.transition = 'opacity 0.2s ease';

  document.getElementById('newQuoteBtn')?.addEventListener('click', fetchQuote);
  fetchQuote();
}

// ─────────────────────────────────────────────────────
//  Weather — Open-Meteo & Nominatim (Persistent Display)
// ─────────────────────────────────────────────────────
const WMO_MAP = {
  0:  { label: 'Clear Sky',         icon: '☀️'  },
  1:  { label: 'Mainly Clear',      icon: '🌤️'  },
  2:  { label: 'Partly Cloudy',     icon: '⛅'  },
  3:  { label: 'Overcast',          icon: '☁️'  },
  45: { label: 'Foggy',             icon: '🌫️'  },
  48: { label: 'Icy Fog',           icon: '🌫️'  },
  51: { label: 'Light Drizzle',     icon: '🌦️'  },
  53: { label: 'Drizzle',           icon: '🌦️'  },
  55: { label: 'Heavy Drizzle',     icon: '🌧️'  },
  61: { label: 'Light Rain',        icon: '🌧️'  },
  63: { label: 'Rain',              icon: '🌧️'  },
  65: { label: 'Heavy Rain',        icon: '🌧️'  },
  71: { label: 'Light Snow',        icon: '🌨️'  },
  73: { label: 'Snow',              icon: '❄️'  },
  75: { label: 'Heavy Snow',        icon: '❄️'  },
  95: { label: 'Thunderstorm',      icon: '⛈️'  },
};

function decodeWMO(code) {
  return WMO_MAP[code] ?? { label: 'Unknown', icon: '🌡️' };
}

function showWxState(state, errMsg = '') {
  ['loading', 'data', 'error'].forEach(s => {
    document.getElementById(`wx-${s}`)?.classList.toggle('hidden', s !== state);
  });
  if (state === 'error' && errMsg) {
    const errSub = document.getElementById('wx-error-msg');
    if (errSub) errSub.textContent = errMsg;
  }
}

async function fetchWeather() {
  showWxState('loading');

  let lat, lon, city = 'Your Location';

  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 6000,
      });
    });
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    try {
      const gRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`, {
        headers: { 'Accept-Language': 'en' }
      });
      if (gRes.ok) {
        const gData = await gRes.json();
        const addr  = gData.address ?? {};
        city = addr.city || addr.town || addr.village || addr.suburb || 'Unknown';
      }
    } catch {}

  } catch {
    // Geolocation fail -> fall back to IP lookup
    try {
      const ipRes  = await fetch('https://ipapi.co/json/');
      if (!ipRes.ok) throw new Error();
      const ipData = await ipRes.json();
      lat  = ipData.latitude;
      lon  = ipData.longitude;
      city = ipData.city || 'Unknown';
    } catch {
      showWxState('error', 'Please enable location permissions and retry.');
      return;
    }
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature&windspeed_unit=kmh&timezone=auto`;
    const wxRes = await fetch(url);
    if (!wxRes.ok) throw new Error();

    const wxData = await wxRes.json();
    const cw     = wxData.current_weather;

    const currentHourStr = cw.time.slice(0, 13);
    const hourIdx = wxData.hourly.time.findIndex(t => t.startsWith(currentHourStr));

    const humidity  = hourIdx >= 0 ? wxData.hourly.relativehumidity_2m[hourIdx] : '--';
    const feelsLike = hourIdx >= 0 ? Math.round(wxData.hourly.apparent_temperature[hourIdx]) : '--';
    const temp      = Math.round(cw.temperature);
    const wind      = Math.round(cw.windspeed);
    const wmo       = decodeWMO(cw.weathercode);

    const cityEl = document.getElementById('wx-city');
    const iconEl = document.getElementById('wx-icon');
    const tempEl = document.getElementById('wx-temp');
    const feelsEl = document.getElementById('wx-feels');
    const condEl = document.getElementById('wx-condition');
    const humidEl = document.getElementById('wx-humidity');
    const windEl = document.getElementById('wx-wind');

    if (cityEl) cityEl.textContent = city;
    if (iconEl) iconEl.textContent = wmo.icon;
    if (tempEl) tempEl.textContent = `${temp}°C`;
    if (feelsEl) feelsEl.textContent = `Feels like ${feelsLike}°C`;
    if (condEl) condEl.textContent = wmo.label;
    if (humidEl) humidEl.textContent = `${humidity}%`;
    if (windEl) windEl.textContent = `${wind} km/h`;

    showWxState('data');

  } catch {
    showWxState('error', 'Weather API error. Check internet connection.');
  }
}

function initWeather() {
  document.getElementById('wx-retry-btn')?.addEventListener('click', fetchWeather);
  document.getElementById('wx-refresh-btn')?.addEventListener('click', fetchWeather);
  fetchWeather();
}

// ─────────────────────────────────────────────────────
//  App Boot
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  tickClock();
  setInterval(tickClock, 1000);

  const greetingText = document.getElementById('greetingText');
  if (greetingText) {
    greetingText.textContent = getGreeting(new Date().getHours());
  }

  initTodo();
  initPlanner();
  initGoals();
  initPomodoro();
  initQuote();
  initWeather();
});
