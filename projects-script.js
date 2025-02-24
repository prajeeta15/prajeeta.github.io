    const hearts = document.querySelectorAll(".heart");
let index = 0;

function blinkHeart() {
    if (index > 0) {
        hearts[index - 1].classList.remove("blinking");
        hearts[index - 1].classList.add("grey-heart");
    }

    if (index < hearts.length) {
        hearts[index].classList.add("blinking");

        setTimeout(() => {
            hearts[index].classList.remove("blinking");
            hearts[index].classList.add("grey-heart");
            index++;
            blinkHeart();
        }, 3000); // Waits 3 seconds before moving to the next heart
    }
}

blinkHeart();
function adjustLayout() {
    let screenWidth = window.innerWidth;
       // Adjusting font sizes dynamically
       let header = document.querySelector("h1");
            if (screenWidth < 768) {
                header.style.fontSize = "2rem";
            } else if (screenWidth < 1024) {
                header.style.fontSize = "3rem";
            } else {
                header.style.fontSize = "5rem";
            }
        }

        window.addEventListener("resize", adjustLayout);
        window.addEventListener("DOMContentLoaded", adjustLayout);
