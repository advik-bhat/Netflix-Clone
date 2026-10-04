const movies = [
  ["Wednesday", "wednesday.jpg"],
  ["Stranger Things", "strangerthings.jpg"],
  ["Squid Game", "squidgame.jpg"],
  ["Bridgerton", "bridgerton.jpg"]
];

const faqs = [
  ["What is Netflix?", "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more."],
  ["How much does Netflix cost?", "Plans vary by features and resolution. Choose the plan that works best for you."],
  ["Where can I watch?", "Watch anywhere, anytime. Sign in on your phone, tablet, laptop, Smart TV and other supported devices."],
  ["How do I cancel?", "You can cancel your membership at any time. This demo does not process real subscriptions."],
  ["What can I watch on Netflix?", "Netflix has a large catalogue of films, series, documentaries and original productions."]
];

const movieRow = document.getElementById("movieRow");
if (movieRow) {
  movies.forEach(([title, image], index) => {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.style.backgroundImage = `url('${image}')`;
    // Renders the giant number and title together at the bottom-center
    card.innerHTML = `<span class="movie-number">${index + 1}</span>`;
    movieRow.appendChild(card);
  });
}

const faqList = document.getElementById("faqList");
if (faqList) {
  faqs.forEach(([question, answer]) => {
    const item = document.createElement("div");
    item.className = "faq-item";
    item.innerHTML = `<button class="faq-question" type="button" aria-expanded="false"><span>${question}</span><span class="faq-icon">+</span></button><div class="faq-answer">${answer}</div>`;
    const button = item.querySelector(".faq-question");
    button.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
    faqList.appendChild(item);
  });
}

const navbar = document.getElementById("navbar");
if (navbar) window.addEventListener("scroll", () => navbar.classList.toggle("scrolled", window.scrollY > 40));

const menuButton = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "×" : "☰";
  });
  mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mobileMenu.classList.remove("open"); document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false"); menuButton.textContent = "☰";
  }));
}

function validEmail(value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) }
function showToast(message) {
  const old = document.querySelector(".toast"); if (old) old.remove();
  const toast = document.createElement("div"); toast.className = "toast"; toast.textContent = message;
  document.body.appendChild(toast); setTimeout(() => toast.remove(), 2800);
}

document.querySelectorAll(".email-form").forEach(form => {
  form.addEventListener("submit", event => {
    event.preventDefault();
    const input = form.querySelector("input");
    if (!validEmail(input.value.trim())) { input.focus(); input.setCustomValidity("Enter a valid email address."); input.reportValidity(); input.setCustomValidity(""); return }
    window.location.href = form.dataset.redirect;
  });
});

document.querySelectorAll(".password-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    button.textContent = showing ? "Show" : "Hide";
  });
});

const loginForm = document.getElementById("loginForm");
if (loginForm) loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.getElementById("loginEmail"), password = document.getElementById("loginPassword");
  const emailOK = validEmail(email.value.trim()), passwordOK = password.value.length >= 6;
  document.getElementById("loginEmailError").textContent = emailOK ? "" : "Enter a valid email address.";
  document.getElementById("loginPasswordError").textContent = passwordOK ? "" : "Password must be at least 6 characters.";
  if (emailOK && passwordOK) showToast("Demo only — no real authentication is connected.");
});

const codeButton = document.getElementById("demoCode");
if (codeButton) codeButton.addEventListener("click", () => showToast("Sign-in codes are not connected in this frontend demo."));

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  const password = document.getElementById("signupPassword"), bar = document.getElementById("strengthBar"), text = document.getElementById("strengthText");
  password.addEventListener("input", () => {
    const value = password.value; let score = 0;
    if (value.length >= 8) score++; if (/[A-Z]/.test(value)) score++; if (/[0-9]/.test(value)) score++; if (/[^A-Za-z0-9]/.test(value)) score++;
    bar.style.width = `${score * 25}%`; text.textContent = value ? ["Very weak", "Weak", "Fair", "Strong", "Very strong"][score] : "";
  });
  signupForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("signupEmail"), confirmPassword = document.getElementById("confirmPassword"), terms = document.getElementById("terms");
    const emailOK = validEmail(email.value.trim()), passwordOK = password.value.length >= 8, matchOK = password.value === confirmPassword.value, termsOK = terms.checked;
    document.getElementById("signupEmailError").textContent = emailOK ? "" : "Enter a valid email address.";
    document.getElementById("signupPasswordError").textContent = passwordOK ? "" : "Use at least 8 characters.";
    document.getElementById("confirmPasswordError").textContent = matchOK ? "" : "Passwords do not match.";
    document.getElementById("termsError").textContent = termsOK ? "" : "Please accept the terms.";
    if (emailOK && passwordOK && matchOK && termsOK) showToast("Demo only — account creation is not connected to a backend.");
  });
}