// ===== DOM references =====
const openButton       = document.getElementById("openInvitation");
const envelopeScreen   = document.getElementById("envelope-screen");
const invitationContent = document.getElementById("invitation-content");
const scrollBtn        = document.getElementById("scrollBtn");

// ===== Open envelope =====
openButton.addEventListener("click", () => {
  envelopeScreen.classList.add("open");

  setTimeout(() => {
    envelopeScreen.classList.add("hide");
    invitationContent.classList.remove("hidden");
    invitationContent.classList.add("show-content");
  }, 1500);

  setTimeout(() => {
    envelopeScreen.style.display = "none";
  }, 2500);
});

// ===== Scroll to info section =====
scrollBtn.addEventListener("click", () => {
  document.getElementById("info").scrollIntoView({ behavior: "smooth" });
});

// ===== Countdown =====
const MS_PER_DAY    = 1000 * 60 * 60 * 24;
const MS_PER_HOUR   = 1000 * 60 * 60;
const MS_PER_MINUTE = 1000 * 60;
const MS_PER_SECOND = 1000;

const eventDate = new Date("June 15, 2026 19:00:00").getTime();

const countdown = setInterval(() => {
  const distance = eventDate - Date.now();

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "<h3>¡Hoy es el gran día!</h3>";
    return;
  }

  document.getElementById("days").textContent    = Math.floor(distance / MS_PER_DAY);
  document.getElementById("hours").textContent   = Math.floor((distance / MS_PER_HOUR) % 24);
  document.getElementById("minutes").textContent = Math.floor((distance / MS_PER_MINUTE) % 60);
  document.getElementById("seconds").textContent = Math.floor((distance / MS_PER_SECOND) % 60);
}, 1000);

// ===== Scroll-reveal with IntersectionObserver =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
