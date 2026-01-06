// ===== Helpers =====
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2200);
}

// ===== Theme (Dark/Light) =====
const themeBtn = $("#themeBtn");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) document.documentElement.setAttribute("data-theme", storedTheme);

themeBtn.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? null : "light";
  if (next) {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    toast("라이트 모드");
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("theme");
    toast("다크 모드");
  }
});

// ===== Mobile Menu =====
const menuBtn = $("#menuBtn");
const nav = $("#nav");
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// 메뉴 클릭 시 자동 닫기(모바일)
$$(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// ===== Skill bar animation (on view) =====
const skillFills = $$(".bar-fill");

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const val = Number(el.dataset.skill || 0);
    el.style.width = `${Math.min(100, Math.max(0, val))}%`;
  });
}, { threshold: 0.35 });

skillFills.forEach(el => io.observe(el));

// ===== Project Filter =====
const filterBtns = $$(".filter-btn");
const projects = $$(".project");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter; // all/web/backend/ai
    projects.forEach(card => {
      if (filter === "all") {
        card.hidden = false;
        return;
      }
      const types = (card.dataset.type || "").split(" ");
      card.hidden = !types.includes(filter);
    });
  });
});

// ===== Contact Form Preview (no real send) =====
const form = $("#contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const name = fd.get("name");
  const email = fd.get("email");
  const msg = fd.get("message");

  toast(`미리보기: ${name} (${email}) - ${String(msg).slice(0, 30)}...`);
});

// ===== Footer Year =====
$("#year").textContent = new Date().getFullYear();