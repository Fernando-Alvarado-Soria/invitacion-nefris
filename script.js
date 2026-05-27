function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth'
  });
}

const openButton = document.getElementById("openInvitation");
const envelopeScreen = document.getElementById("envelope-screen");
const invitationContent = document.getElementById("invitation-content");

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

// Contador regresivo
const eventDate = new Date("June 15, 2026 19:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".countdown").innerHTML = "<h3>¡Hoy es el gran día!</h3>";
  }
}, 1000);

// Animación al hacer scroll
const animatedSections = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  animatedSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (sectionTop < screenHeight - 100) {
      section.classList.add("visible");
    }
  });
});