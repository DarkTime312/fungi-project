// ===========================
//        Mobile Menu
// =========================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const primaryNav = document.getElementById("primaryNav");
const hamburgerLinks = document.querySelectorAll(".primary-nav__link");

const isMenuOpen = () => primaryNav.getAttribute("data-state") === "expanded";


function toggleHamburgerMenu() {
    // If it's open, we want to close it (false). If closed, we want to open it (true).
    const willOpen = !isMenuOpen(); 

    // 1. Update the CSS state using a clean ternary operator
    willOpen 
        ? primaryNav.setAttribute("data-state", "expanded")
        : primaryNav.removeAttribute("data-state");


    // 2. Update Accessibility attributes
    hamburgerBtn.setAttribute("aria-expanded", willOpen);
    hamburgerBtn.setAttribute("aria-label", willOpen ? "Close navbar menu" : "Open navbar menu");

}

hamburgerBtn.addEventListener("click", toggleHamburgerMenu)

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && isMenuOpen()) {
        toggleHamburgerMenu();
        hamburgerBtn.focus(); // Return focus to button for keyboard users
    }
});


// Close the menu on link click
hamburgerLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (isMenuOpen()) toggleHamburgerMenu();
    });
});


