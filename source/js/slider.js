const slider = document.getElementById('slider');
const imageBefore = document.querySelector('.image-before');
const imageAfter = document.querySelector('.image-after');

slider.addEventListener('input', () => {
  const value = slider.value;
  imageBefore.style.clipPath = `inset(0% ${100 - value}% 0% 0%)`;
  imageAfter.style.clipPath = `inset(0% 0% 0% ${value}%)`;
});
