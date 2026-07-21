const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide() {

    slides[currentSlide].classList.remove("active");

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    slides[currentSlide].classList.add("active");

}

setInterval(showSlide, 5000);

// nav scetion fix
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function(){

    if(window.scrollY > 45){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});