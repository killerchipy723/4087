
let slideIndex = 0;
let slides, dots;

function showSlides() {
  slides = document.getElementsByClassName("gallery-slide");
  dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 4000); // ⏱️ cambio cada 4 segundos
}

function plusSlides(n) {
  slideIndex += n-1;
  showSlides();
}

function currentSlide(n) {
  slideIndex = n-1;
  showSlides();
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides();

  document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
  document.querySelector(".next").addEventListener("click", () => plusSlides(1));
  
  const dotElems = document.querySelectorAll(".dot");
  dotElems.forEach((dot, index) => {
    dot.addEventListener("click", () => currentSlide(index+1));
  });
});

