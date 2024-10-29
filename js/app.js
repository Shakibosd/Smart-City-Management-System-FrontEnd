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

document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
});
