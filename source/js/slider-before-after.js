// let dragging = false;

// document.onmousedown = () => (dragging = true);
// document.onmouseup = () => (dragging = false);

// console.log(dragging);

// document.onmousemove = (e) => {
//   const element = document.querySelector(".before-after"); // Замените '#your-element' на селектор вашего элемента
//   const isMouseInsideElement = element.contains(e.target);

//   console.log(isMouseInsideElement);

//   // если тянем, и курсор в районе картинки
//   if (dragging && isMouseInsideElement) {
//     let x = e.clientX;

//     document.querySelector(".pad").style.left = x + "px";
//     document.querySelector(".after").style.width = x + "px";
//   }
// };
