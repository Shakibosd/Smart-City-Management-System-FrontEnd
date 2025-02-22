//FAQ
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

//Carusel
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// //Rite Click Not Allowed
// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
//   alert("Right click is disabled!");
// });

// document.onkeydown = function (e) {
//   if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
//     alert("Inspecting elements is disabled!");
//     return false;
//   }
// };

//auto slide swiper
document.addEventListener("DOMContentLoaded", function() {
  const swiper = new Swiper('.swiper', {
      loop: true, 
      autoplay: {
          delay: 2000, 
          disableOnInteraction: false, 
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true, 
      },
      navigation: false, 
  });
});