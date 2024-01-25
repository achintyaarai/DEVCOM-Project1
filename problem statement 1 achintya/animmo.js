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
            // Adjust menu styles for visibility
            menu.style.opacity = "1";
            menu.style.transform = "translateY(0)";
            menu.style.pointerEvents = "auto";
            menu.style.transition = "all 0.2s ease-in-out";
        } else {
            // Adjust menu styles for hiding
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-10px)";
            menu.style.pointerEvents = "none";
        }
    } else {
        // Remove 'active' class and adjust menu styles for hiding
        currentDropDown.classList.remove("active");
        menu.style.opacity = "0";
        menu.style.transform = "translateY(-10px)";
        menu.style.pointerEvents = "none";
    }
});
