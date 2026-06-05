const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particlesArray = [];
const numberOfParticles = 80;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 2;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = dx * dx + dy * dy;

      if (distance < 15000) {
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let particle of particlesArray) {
    particle.update();
    particle.draw();
  }

  connectParticles();
  requestAnimationFrame(animate);
}

initParticles();
animate();

/* Mobile menu toggle */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

/* Close menu when link clicked on mobile */
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("active");
    }
  });
});

/* Active section highlight on scroll */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

/* ===== EmailJS Contact Form ===== */
emailjs.init("YcQ9hlVBV7L_Y4cwp");

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("contact-form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    if (formStatus) {
      formStatus.textContent = "";
      formStatus.className = "contact-form-status";
    }

    try {
      await emailjs.sendForm(
        "service_yx3yr1n",
        "template_y5sazjl",
        "#contact-form"
      );

      if (formStatus) {
        formStatus.textContent = "Message sent successfully.";
        formStatus.classList.add("success");
      }

      contactForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);

      if (formStatus) {
        formStatus.textContent = "Failed to send message. Please try again.";
        formStatus.classList.add("error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}

/* ===== Project Tabs ===== */
const projectTabs = document.querySelectorAll(".project-tab");
const projectPanels = document.querySelectorAll(".project-panel");

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-project-tab");

    projectTabs.forEach((item) => item.classList.remove("active"));
    projectPanels.forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");

    const targetPanel = document.getElementById(`project-panel-${target}`);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  });
});