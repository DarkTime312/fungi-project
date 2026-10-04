// ===========================
//        Mobile Menu
// =========================
const hamburgerBtn = document.getElementById("hamburgerBtn");
const primaryNav = document.getElementById("primaryNav");

function toggleHamburgerMenu() {
    // Toggle the active class and capture the boolean result
    const hamburgerIsOpen = primaryNav.classList.toggle("primary-nav--active");

    // Accessibility: tell screen readers if the menu is expanded
    hamburgerBtn.setAttribute("aria-expanded", hamburgerIsOpen);
    hamburgerBtn.setAttribute(
    "aria-label",
    hamburgerIsOpen ? "Close navbar menu" : "Open navbar menu"
  )

}

hamburgerBtn.addEventListener("click", toggleHamburgerMenu)

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && primaryNav.classList.contains("primary-nav--active")) {
        toggleHamburgerMenu();
    }
});

// Close the menu on link click

const hamburgerLinks = document.querySelectorAll(".primary-nav__link");

hamburgerLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (primaryNav.classList.contains("primary-nav--active")) {
            toggleHamburgerMenu();
        }
    });
});

