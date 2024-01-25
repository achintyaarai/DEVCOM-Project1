// Initialize flag variable
var flag = 0;

// Create an IntersectionObserver to handle element visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Select all elements with class 'hide' and observe their intersection
const hidden = document.querySelectorAll('.hide');
const menu = document.getElementById('menu');
let currentDropDown;

hidden.forEach((e1) => observer.observe(e1));

// Handle click events on the document
document.addEventListener("click", e => {
    // Check if the clicked element is a dropdown button or its descendant
    const isDropDownButton = e.target.matches("[menu-drop]");
    
    if (!isDropDownButton && e.target.closest('[menu-drop]') != null) {
        return;
    }

    // Toggle the 'active' class based on dropdown button click
    if (isDropDownButton) {
        currentDropDown = e.target.closest('[menu-drop]');
        currentDropDown.classList.toggle("active");

        if (currentDropDown.matches('.active')) {
            menu.style.opacity = "1";
            menu.style.transform = "translateY(0)";
            menu.style.pointerEvents = "auto";
            menu.style.transition = "all 0.2s ease-in-out";
        } else {
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-10px)";
            menu.style.pointerEvents = "none";
        }
    } else {
        currentDropDown.classList.remove("active");
        menu.style.opacity = "0";
        menu.style.transform = "translateY(-10px)";
        menu.style.pointerEvents = "none";
    }
});

// Additional code for handling mouse and touch events
const track = document.getElementById("info2");

const HOnDown = e => track.dataset.mouseDownAt = e.clientX;

const HOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
// Handling all mouse events
window.onmousedown = e => HOnDown(e);
window.ontouchstart = e => HOnDown(e.touches[0]);
window.onmouseup = e => HOnUp(e);
window.ontouchend = e => HOnUp(e.touches[0]);
window.onmousemove = e => HOnMove(e);
window.ontouchmove = e => HOnMove(e.touches[0]);

const HOnMove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mousedist = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxdist = window.innerWidth / 2;

    const percentage = (mousedist / maxdist) * -100,
        nextPercentagelim = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentagelim, 0), -100);

    track.dataset.percentage = nextPercentage;

    // Use CSS animations to smoothly translate the track and adjust object position
    track.animate({
        transform: `translate(${nextPercentage}%, 0)`
    }, { duration: 2500, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 2500, fill: "forwards" });
    }
}
