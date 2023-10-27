const slider = document.getElementById("slider");
const imageBefore = document.querySelector(".slider__image-before-wrapper");
const imageAfter = document.querySelector(".slider__image-after-wrapper");

const isMobile = window.innerWidth <= 767; // Проверка на мобильное разрешение

if (isMobile) {
  slider.step = "100"; // Установка шага 100% на мобильных устройствах
  slider.value = "0"; // Установка шага 100% на мобильных устройствах

  imageBefore.style.clipPath = `inset(0% 0% 0% 0%)`;
  imageAfter.style.clipPath = `inset(0% 0% 0% 100%)`;
} else {
  slider.step = "1"; // Установка стандартного шага на остальных устройствах
}

slider.addEventListener("input", () => {
  const value = slider.value;
  imageBefore.style.clipPath = `inset(0% ${value}% 0% 0%)`;
  imageAfter.style.clipPath = `inset(0% 0% 0% ${100 - value}%)`;
});
