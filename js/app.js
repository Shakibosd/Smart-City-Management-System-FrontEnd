function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const toggle = element.querySelector(".faq-toggle");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    toggle.textContent = "➕";
  } else {
    answer.style.display = "block";
    toggle.textContent = "➖";
  }
}
