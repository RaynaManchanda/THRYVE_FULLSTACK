// -------------------- ELEMENT REFERENCES --------------------
const el = {
  recBanner: document.getElementById("recBanner"),
  recTitle: document.getElementById("recTitle"),
  recIntensity: document.getElementById("recIntensity"),
  recDesc: document.getElementById("recDesc"),

  workoutName: document.getElementById("workoutName"),
  workoutLevel: document.getElementById("workoutLevel"),
  workoutSubtitle: document.getElementById("workoutSubtitle"),
  stepsList: document.getElementById("stepsList"),
  estTime: document.getElementById("estTime"),
  estCalories: document.getElementById("estCalories"),

  timer: document.getElementById("timer"),
  currentStepName: document.getElementById("currentStepName"),
  btnStart: document.getElementById("btnStart"),
  btnPause: document.getElementById("btnPause"),
  btnSkip: document.getElementById("btnSkip"),
  btnReset: document.getElementById("btnReset"),

  notes: document.getElementById("notes"),
  notesSaved: document.getElementById("notesSaved"),
  saveNotesBtn: document.getElementById("saveNotes"),
};

// -------------------- HELPERS --------------------
const qs = (k) => new URLSearchParams(window.location.search).get(k);
const pad = (n) => String(n).padStart(2, "0");
const fmt = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function renderError(msg) {
  if (el.stepsList) el.stepsList.innerHTML = `<li style="color:#b91c1c">${msg}</li>`;
  else alert(msg);
}

// -------------------- QUICK START FIXED --------------------
function hydrateQuickStart() {
  let qsHeader = $$(".h6").find(h => h.textContent.trim().toUpperCase() === "QUICK START");
  if (!qsHeader) qsHeader = $$(".card .h6").find(h => /quick\s*start/i.test(h.textContent));

  const card = qsHeader?.closest(".card");
  if (!card) return;

  let bar = card.querySelector(".btn-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.className = "btn-bar";
    card.appendChild(bar);
  }

  const labels = ["Running", "Cycling", "Swimming", "Yoga"];
  let links = $$("a,button", bar);

  if (links.length < 4 || links.every(x => !x.textContent.trim())) {
    bar.innerHTML = "";
    labels.forEach(l => {
      const a = document.createElement("a");
      a.className = "btn ghost";
      a.href = `/start-workout?w=${encodeURIComponent(l)}`;
      a.textContent = l;
      bar.appendChild(a);
    });
  } else {
    labels.forEach((l, i) => {
      if (!links[i]) return;
      const a = links[i];
      if (a.tagName !== "A") {
        const newA = document.createElement("a");
        newA.className = "btn ghost";
        newA.href = `/start-workout?w=${encodeURIComponent(l)}`;
        newA.textContent = l;
        a.replaceWith(newA);
        links[i] = newA;
      } else {
        a.classList.add("btn", "ghost");
        a.href = `/start-workout?w=${encodeURIComponent(l)}`;
        if (!a.textContent.trim()) a.textContent = l;
      }
    });
  }
}

// -------------------- TIMER BUTTON SETUP --------------------
function hydrateTimerButtons() {
  let { btnSkip, btnReset, btnStart, btnPause } = el;

  let timerCard = el.timer ? el.timer.closest(".card") : null;
  let bar = timerCard ? timerCard.querySelector(".btn-bar") : null;
  if (!bar) {
    bar = $$(".btn-bar").find(b =>
      $$("button,a", b).some(x => /start|pause/i.test(x.textContent))
    ) || $$(".btn-bar")[0];
  }
  if (!bar) return;

  const btns = $$("button, a", bar);

  if (!btnStart) btnStart = btns[0];
  if (!btnPause) btnPause = btns[1];
  if (!btnSkip) btnSkip = btns[2];
  if (!btnReset) btnReset = btns[3];

  if (btnStart && !btnStart.textContent.trim()) btnStart.textContent = "Start";
  if (btnPause && !btnPause.textContent.trim()) btnPause.textContent = "Pause";
  if (btnSkip && !btnSkip.textContent.trim()) btnSkip.textContent = "Skip Step";
  if (btnReset && !btnReset.textContent.trim()) btnReset.textContent = "Reset";

  [btnStart, btnPause, btnSkip, btnReset].forEach(b => {
    if (!b) return;
    if (b.tagName === "A") {
      b.setAttribute("href", "javascript:void(0)");
      b.classList.remove("ghost");
    }
  });

  el.btnStart = btnStart;
  el.btnPause = btnPause;
  el.btnSkip = btnSkip;
  el.btnReset = btnReset;
}

// -------------------- STATE VARIABLES --------------------
let PLAN = null;
let IDX = 0;
let REMAINING = 0;
let TIMER_ID = null;
let RUNNING = false;
let NOTES_KEY = "";

// -------------------- INITIALIZER --------------------
(async function init() {
  try {
    hydrateQuickStart();
    hydrateTimerButtons();
    if (el.stepsList) el.stepsList.innerHTML = `<li>Loading workout…</li>`;

    const res = await fetch("/data/workouts.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Unable to load workouts.json");
    const PLANS = await res.json();

    const workoutKey = (qs("w") || "Running").trim();
    PLAN = PLANS[workoutKey] || PLANS["Running"];
    if (!PLAN || !Array.isArray(PLAN.steps)) throw new Error("Invalid workout data.");

    NOTES_KEY = `notes:${workoutKey}`;

    if (el.workoutName) el.workoutName.textContent = workoutKey;
    if (el.workoutLevel) el.workoutLevel.textContent = PLAN.level || "—";
    if (el.workoutSubtitle) el.workoutSubtitle.textContent = PLAN.subtitle || "Structured plan";

    if (workoutKey === "Moderate Cardio" && el.recBanner) {
      el.recBanner.style.display = "block";
      el.recTitle.textContent = "Moderate Activity";
      el.recIntensity.textContent = "Ready";
      el.recDesc.textContent = "Good recovery with some fatigue – perfect for steady-state training.";
    }

    let totalSeconds = 0;
    if (el.stepsList) el.stepsList.innerHTML = "";
    PLAN.steps.forEach((s, i) => {
      totalSeconds += Number(s.seconds || 0);
      const li = document.createElement("li");
      li.innerHTML = `<span>${i + 1}. ${s.name}</span><span class="chip">${fmt(s.seconds || 0)}</span>`;
      el.stepsList.appendChild(li);
    });

    if (el.estTime) el.estTime.textContent = fmt(totalSeconds);
    if (el.estCalories) el.estCalories.textContent = Math.round((totalSeconds / 60) * Number(PLAN.kcalPerMin || 0));

    IDX = 0;
    REMAINING = Number(PLAN.steps[0].seconds || 0);
    paint();

    if (el.notes) el.notes.value = localStorage.getItem(NOTES_KEY) || "";
    el.saveNotesBtn?.addEventListener("click", () => {
      localStorage.setItem(NOTES_KEY, el.notes.value || "");
      el.notesSaved.style.display = "block";
      setTimeout(() => (el.notesSaved.style.display = "none"), 1200);
    });

    el.btnStart?.addEventListener("click", onStart);
    el.btnPause?.addEventListener("click", onPause);
    el.btnSkip?.addEventListener("click", onSkip);
    el.btnReset?.addEventListener("click", onReset);

  } catch (err) {
    console.error(err);
    renderError("Could not load workout plan. Please try again.");
  }
})();

// -------------------- DISPLAY & TIMER --------------------
function paint() {
  if (el.timer) el.timer.textContent = fmt(REMAINING);
  if (el.currentStepName) el.currentStepName.textContent = PLAN?.steps[IDX]?.name || "Complete";
  if (el.btnPause) el.btnPause.disabled = !RUNNING;
  if (el.btnSkip) el.btnSkip.disabled = !RUNNING;
}

function tick() {
  if (!RUNNING) return;
  REMAINING -= 1;

  if (REMAINING <= 0) {
    IDX += 1;

    if (IDX >= PLAN.steps.length) {
      clearInterval(TIMER_ID);
      TIMER_ID = null;
      RUNNING = false;
      el.timer.textContent = "DONE";
      el.currentStepName.textContent = "Workout Complete 🎉";
      el.btnPause.disabled = true;
      el.btnSkip.disabled = true;
      return;
    }

    REMAINING = Number(PLAN.steps[IDX].seconds || 0);
  }
  paint();
}

// -------------------- BUTTON HANDLERS --------------------
function onStart() {
  RUNNING = true;
  if (!TIMER_ID) TIMER_ID = setInterval(tick, 1000);
  paint();
}

function onPause() {
  RUNNING = false;
  paint();
}

function onSkip() {
  IDX += 1;
  if (IDX >= PLAN.steps.length) {
    clearInterval(TIMER_ID);
    TIMER_ID = null;
    RUNNING = false;
    el.timer.textContent = "DONE";
    el.currentStepName.textContent = "Workout Complete 🎉";
    el.btnPause.disabled = true;
    el.btnSkip.disabled = true;
  } else {
    REMAINING = Number(PLAN.steps[IDX].seconds || 0);
    paint();
  }
}

function onReset() {
  clearInterval(TIMER_ID);
  TIMER_ID = null;
  RUNNING = false;
  IDX = 0;
  REMAINING = Number(PLAN?.steps?.[0]?.seconds || 0);
  paint();
}
