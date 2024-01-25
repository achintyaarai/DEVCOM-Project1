// Initialize a flag to track the state of the dropdown
var flag = 0;

// Create an IntersectionObserver to handle the "show" class on elements when they intersect with the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Select all elements with the class 'hide' and observe them using the IntersectionObserver
const hidden = document.querySelectorAll('.hide');
const menu = document.getElementById('menu');
let currentDropDown;

// Observe each element with the 'hide' class
hidden.forEach((e1) => observer.observe(e1));

// Add a click event listener to the document
document.addEventListener("click", e => {
    // Check if the clicked element is a dropdown button
    const isDropDownButton = e.target.matches("[menu-drop]");
    
    // If the click is inside the dropdown button or its descendants, return early
    if (!isDropDownButton && e.target.closest('[menu-drop]') != null) {
        return;
    }

    // If it is a dropdown button
    if (isDropDownButton) {
        // Find the closest parent with the attribute 'menu-drop'
        currentDropDown = e.target.closest('[menu-drop]');
        currentDropDown.classList.toggle("active");

        // Toggle the visibility and position of the menu based on the dropdown state
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
        // If it's not a dropdown button, close the dropdown and hide the menu
        currentDropDown.classList.remove("active");
        menu.style.opacity = "0";
        menu.style.transform = "translateY(-10px)";
        menu.style.pointerEvents = "none";
    }
});
