// ===== DOM references =====
const openButton        = document.getElementById("openInvitation");
const envelopeScreen    = document.getElementById("envelope-screen");
const invitationContent = document.getElementById("invitation-content");
const scrollBtn         = document.getElementById("scrollBtn");

// ===== Scroll helpers =====
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => scrollToSection("info"));
}

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

// ===== Countdown =====
const MS_PER_DAY    = 1000 * 60 * 60 * 24;
const MS_PER_HOUR   = 1000 * 60 * 60;
const MS_PER_MINUTE = 1000 * 60;
const MS_PER_SECOND = 1000;

const eventDate = new Date("December 18, 2026 18:00:00").getTime();

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

// ===== RSVP Modal =====

// Reemplaza este valor con la URL de tu Google Apps Script una vez desplegado
const APPS_SCRIPT_URL = "APPS_SCRIPT_URL_AQUI";
const WHATSAPP_NUMBER = "527531433836";

const rsvpBtn       = document.getElementById("rsvpBtn");
const rsvpModal     = document.getElementById("rsvp-modal");
const modalClose    = document.getElementById("modal-close");
const modalCancel   = document.getElementById("modal-cancel");
const rsvpNameInput = document.getElementById("rsvp-name");
const rsvpConfirm   = document.getElementById("rsvp-confirm");
const rsvpError     = document.getElementById("rsvp-error");
const rsvpSuccess   = document.getElementById("rsvp-success");

function openModal() {
  rsvpModal.classList.remove("hidden");
  rsvpNameInput.value = "";
  rsvpError.classList.add("hidden");
  rsvpSuccess.classList.add("hidden");
  rsvpConfirm.disabled = false;
  rsvpConfirm.textContent = "Confirmar ✓";
  setTimeout(() => rsvpNameInput.focus(), 50);
}

function closeModal() {
  rsvpModal.classList.add("hidden");
}

rsvpBtn.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
modalCancel.addEventListener("click", closeModal);

// Cerrar al hacer clic en el fondo oscuro
rsvpModal.addEventListener("click", (e) => {
  if (e.target === rsvpModal) closeModal();
});

// Cerrar con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !rsvpModal.classList.contains("hidden")) closeModal();
});

rsvpConfirm.addEventListener("click", () => {
  const name = rsvpNameInput.value.trim();

  if (!name) {
    rsvpError.classList.remove("hidden");
    rsvpNameInput.focus();
    return;
  }

  rsvpError.classList.add("hidden");
  rsvpConfirm.disabled = true;
  rsvpConfirm.textContent = "Enviando...";

  // Registrar en Google Sheets (dispara y olvida - no bloquea el flujo)
  if (APPS_SCRIPT_URL !== "APPS_SCRIPT_URL_AQUI") {
    fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ nombre: name }),
    }).catch(() => { /* fallo silencioso: WhatsApp abre de todas formas */ });
  }

  // Mostrar confirmación y abrir WhatsApp
  const message = encodeURIComponent(
    `¡Hola! Confirmo mi asistencia a tu cumpleaños. Soy ${name}`
  );

  rsvpSuccess.textContent = `¡Gracias, ${name}! Abriendo WhatsApp...`;
  rsvpSuccess.classList.remove("hidden");
  rsvpConfirm.textContent = "¡Listo! ✓";

  setTimeout(() => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
    closeModal();
  }, 1500);
});
