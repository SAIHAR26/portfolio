const typedText = document.getElementById("typedText");
const lines = [
  "I build creative and functional web experiences.",
  "I enjoy web development, AI, and real-world problem solving.",
  "Always learning, always building."
];

let lineIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = lines[lineIndex];

  if (!deleting) {
    typedText.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedText.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeLoop, deleting ? 34 : 52);
}

typeLoop();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll(".section").forEach((section) => sectionObserver.observe(section));

const cursorGlow = document.getElementById("cursorGlow");
const cursorTrail = document.getElementById("cursorTrail");
document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

let lastTrailTime = 0;
document.addEventListener("mousemove", (e) => {
  const now = performance.now();
  if (!cursorTrail || now - lastTrailTime < 22) {
    return;
  }

  lastTrailTime = now;
  const dot = document.createElement("span");
  dot.className = "trail-dot";
  dot.style.left = `${e.clientX}px`;
  dot.style.top = `${e.clientY}px`;
  cursorTrail.appendChild(dot);
  setTimeout(() => dot.remove(), 640);
});

const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
navToggle.addEventListener("click", () => navMenu.classList.toggle("open"));

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") {
  root.classList.add("light");
  themeToggle.textContent = "LIGHT";
} else {
  themeToggle.textContent = "DARK";
}

themeToggle.addEventListener("click", () => {
  root.classList.toggle("light");
  const light = root.classList.contains("light");
  themeToggle.textContent = light ? "LIGHT" : "DARK";
  localStorage.setItem("theme", light ? "light" : "dark");
});

document.getElementById("year").textContent = new Date().getFullYear();

const bgVideo = document.getElementById("bgVideo");
if (bgVideo) {
  bgVideo.playbackRate = 0.72;
  bgVideo.play().catch(() => {
    document.body.classList.add("video-paused");
  });
}

const flowBurst = document.getElementById("flowBurst");
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      return;
    }

    event.preventDefault();

    const x = event.clientX || window.innerWidth * 0.5;
    const y = event.clientY || window.innerHeight * 0.5;
    flowBurst.style.setProperty("--fx", `${x}px`);
    flowBurst.style.setProperty("--fy", `${y}px`);
    flowBurst.classList.remove("active");
    void flowBurst.offsetWidth;
    flowBurst.classList.add("active");

    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 90);
  });
});

document.querySelectorAll(".project.card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });
});

document.querySelectorAll(".magnetic").forEach((btn) => {
  btn.addEventListener("mousemove", (event) => {
    const rect = btn.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.12}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

const projectData = {
  "campus-ride": {
    title: "Campus Ride",
    tech: "Tech: HTML, CSS, JavaScript, Firebase",
    summary: "Campus Ride is a smart transportation assistance platform designed to improve the efficiency and convenience of college bus services. It helps students plan travel with clear route visibility, expected arrival timings, and timely transportation updates through a simple interface.",
    bullets: [
      "Organizes campus transportation information in a digital format to reduce schedule confusion.",
      "Improves coordination between students and the transport management team.",
      "Designed for smooth, reliable commuting with accessibility and ease of use.",
      "Demonstrates how digital systems can improve daily campus operations and travel awareness."
    ]
  },
  "doctor-connect": {
    title: "Doctor Connect",
    tech: "Tech: HTML, CSS, JavaScript",
    summary: "Doctor Connect is a healthcare support platform that simplifies connecting patients with doctors through a digital interface. It provides an easy, organized experience for accessing basic consultation support without unnecessary delays.",
    bullets: [
      "Allows users to check doctor availability and schedule appointments efficiently.",
      "Provides consultation-related guidance in a convenient workflow.",
      "Improves healthcare accessibility by reducing common barriers to medical assistance.",
      "Built with simplicity and usability for users from different backgrounds."
    ]
  },
  "complaint-portal": {
    title: "Complaint Management Portal",
    tech: "Tech: Core Java, Swing, JDBC, MySQL",
    summary: "The Complaint Management Portal is a system for registering, monitoring, and resolving complaints in a structured, transparent workflow. It enables users to submit issues and track progress while helping administrators manage resolution systematically.",
    bullets: [
      "Supports organized complaint handling with clear status tracking for users.",
      "Helps administrators review, categorize, and resolve issues in a systematic manner.",
      "Promotes transparency and accountability across the complaint lifecycle.",
      "Improves user-management communication and reduces delays in issue resolution."
    ]
  },
  "nexthire": {
    title: "NextHire",
    tech: "Tech: HTML, CSS, JavaScript, Node.js (In Progress)",
    summary: "NextHire is a career development and recruitment assistance platform that helps students and job seekers prepare for opportunities. It supports users in early career stages with structured guidance and career-focused resources.",
    bullets: [
      "Helps users explore career paths and stay informed about job opportunities.",
      "Improves understanding of recruitment processes and career readiness.",
      "Encourages skill awareness and continuous professional growth.",
      "Bridges the gap between academic learning and industry expectations."
    ]
  }
};

const projectModal = document.getElementById("projectModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalTech = document.getElementById("modalTech");
const modalSummary = document.getElementById("modalSummary");
const modalBullets = document.getElementById("modalBullets");
const modalPreview = document.getElementById("modalPreview");

function openProjectModal(key) {
  const data = projectData[key];
  if (!data) {
    return;
  }

  modalTitle.textContent = data.title;
  modalTech.textContent = data.tech;
  modalSummary.textContent = data.summary;
  modalBullets.innerHTML = data.bullets.map((item) => `<li>${item}</li>`).join("");
  modalPreview.setAttribute("data-project", key);
  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelectorAll(".open-project").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".project.card");
    if (!card) {
      return;
    }
    openProjectModal(card.dataset.project);
  });
});

modalClose.addEventListener("click", closeProjectModal);
modalBackdrop.addEventListener("click", closeProjectModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal.classList.contains("open")) {
    closeProjectModal();
  }
});
