/*
    Template Name    : Alieno - Mobile Game Landing Page template
    Author           : AvailableCoder
    Version          : 1.0
    Created          : 2022
    File Description : Main javascript file of the template
*/


// Scroll to top button
const scrollTop = document.querySelector(".scrollTop");
scrollTop.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
// ---------------


// Elements used alot
const header = document.querySelector("header");
const sections = Array.from(document.querySelectorAll("section"));
const headerLinks = Array.from(document.querySelectorAll("header nav a.nav-link.same-page"));
// ---------------


// Function on scrolling
new WOW().init();
if (document.querySelector("body").clientWidth < 991) {
    document.querySelectorAll("body *").forEach( e=> {
        e.classList.remove("wow");
    })
}
window.onscroll = function () {
    // Activating header links on scrolling
    sections.forEach(e => {
        if (window.scrollY > e.offsetTop - 1) {
            headerLinks.forEach(links => {
                links.classList.remove("active");
                if (e.getAttribute('id') === links.getAttribute("data-scroll")) {
                    links.classList.add("active")
                }
            });
        }
    });
    // ---
    // Header animation 
    if (this.scrollY > 80) {
        header.classList.add("slide-header");
    } else {
        header.classList.remove("slide-header");
    }
    // ---

    // Couter
    const counters = Array.from(document.querySelectorAll(".counter-field .counter .value"));
    const counterField = document.querySelector(".counter-field") || false;
    if (this.scrollY >= counterField.offsetTop - 600) {
        counters.forEach(e => {
            let countValue = e.getAttribute("data-count");
                if (e.innerHTML >= countValue) return;
                let countIntereval = setInterval(() => {
                    if (e.innerHTML !== countValue) {
                        e.innerHTML++;
                    } else {
                        clearInterval(countIntereval);
                    }
                }, 3000 / countValue);
        });
    }
    // ---

    // ScrollTop show
    if (window.scrollY > 300) {
        scrollTop.classList.add("scrol-show");
    } else {
        scrollTop.classList.remove("scrol-show")
    }
    // ---
};
// ---------------


// Header
headerLinks.forEach(e => {
    e.addEventListener('click' , function (e){
        e.preventDefault();
        window.scrollTo({
            top: `${document.getElementById(e.target.getAttribute("data-scroll")).offsetTop}`,
            behavior: "smooth"
        });
        document.querySelector("header nav.navbar-responsive ul.navbar-nav").classList.remove("sliding-nav");
        document.querySelector(".navbar-responsive .menu-toggle-button").classList.remove("nav-activated");
    });
});
document.querySelector(".navbar-responsive .menu-toggle-button").onclick = function () {
    this.classList.toggle("nav-activated");
    document.querySelector("header nav.navbar-responsive .navbar-nav").classList.toggle("sliding-nav");
};
document.querySelectorAll("nav.navbar-responsive ul li.drop-cont > button.nav-link").forEach(e => {
    e.addEventListener('click', function () {
        e.classList.toggle("header-list-active");
        let toggleItem = e.nextElementSibling;
        if (e.classList.contains("header-list-active")){
            toggleItem.style.display = "block";
            toggleItem.style.height = "auto"
            let itemHeight = toggleItem.clientHeight + 'px'; // We get the height of the element
            toggleItem.style.height = "0px"
            
            setTimeout(() => {
                toggleItem.style.height = itemHeight;
            }, 0);
        } else {
            toggleItem.style.height = "0px"

            toggleItem.addEventListener('transitionend', function () {
                toggleItem.style.display = "none";
            }, {
                once: true
            });
        }
    });
});
// ---------------


// moreInfo
// Tabs
const tabsPag = document.querySelectorAll(".tabs-pagination li");
const tabsContent = document.querySelectorAll(".tabs-content > div");

tabsPag.forEach(e => {
    e.addEventListener('click', function () {
        tabsPag.forEach(e => {
            e.classList.remove('active')
        });
        tabsContent.forEach(e => {
            e.style.display = "none";
        });
        this.classList.add('active');
        document.querySelector(`.${this.getAttribute("data-order")}`).style.display = "block";
    });
});

// ---
// screenshots slider
let appScreenshots = new Swiper('.screen-slider', {
    speed: 750,
    autoplay: true,
    effect: 'flip',
    loop: true,
    grabCursor: true,
});
// ---------------


// Teams Slider 
let teamSlider = new Swiper('.team-slider', {
    speed: 600,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints:{
        576:{
                slidesPerView: 2, 
            },
        768:{
            slidesPerView: 3, 
            },
        992:{
        slidesPerView: 4, 
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
// ---------------


// Review Slider 
let reviewSlider = new Swiper('.review-slider', {
    speed: 1000,
    spaceBetween: 25,
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="swiper-pagination-bullet">
                <img src="assets/images/clients/client${index + 1}.jpg">
            </span>`
        }
    },
});
// ---------------


// FAQ Accordion
const questions = Array.from(document.querySelectorAll(".faq-field .question .ques-head"));
questions.forEach(ques => {
    ques.addEventListener('click', function (e) {
        if (this.classList.contains("ques-head")) {
            this.classList.toggle("faq-activate");
            let toggleItem = this.nextElementSibling;
            if (this.classList.contains("faq-activate")) {
                // Getting element height
                toggleItem.style.display = "block";
                toggleItem.style.height = "auto";
                let itemHeight = toggleItem.clientHeight + "px";
                toggleItem.animate([
                    {height: "0", padding: "0 30px"},
                    {height: itemHeight, padding: "15px 30px"},
                ], {
                    duration: 300
                });

            } else {
                let itemHeight = toggleItem.clientHeight + "px";
                toggleItem.animate([
                    {height: itemHeight, padding: "15px 30px"},
                    {height: "0", padding: "0 30px"},
                ], {
                    duration: 300
                });
                setTimeout(() => {
                    toggleItem.style.padding = "15px 30px";
                    toggleItem.style.height = "0";
                    toggleItem.style.display = "none";
                }, 300);
            }
        }
    });
});
// ---------------

// Preloader Deactivation
window.addEventListener('load', function () {
    const loader = document.querySelector(".preloader");
    loader.animate([
        {opacity: 1},
        {opacity: 0},
    ], {
        duration: 500,
    });
    setTimeout(() => {
        loader.remove();
    }, 500);
});
// ---------------
