// ===========================
//        Mobile Menu
// =========================
const hamburgerBtn = document.querySelector('[aria-controls="primaryNav"]');
const hamburgerLinks = document.querySelectorAll(".primary-nav__link");

const isMenuOpen = () => hamburgerBtn.getAttribute("aria-expanded") === "true";


function toggleHamburgerMenu() {
    // If it's open, we want to close it (false). If closed, we want to open it (true).
    const willOpen = !isMenuOpen(); 

    // Update Accessibility attributes
    hamburgerBtn.setAttribute("aria-expanded", willOpen);

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

// ===========================
//        Filters
// =========================


const seasonFilter = document.querySelector('#seasons');
const typeFilter = document.querySelector('#mushroom-types');
const cards = document.querySelectorAll('.section-guide__grid .card');

// 1. Give each card a unique transition name so the browser can track its individual position
cards.forEach((card, index) => {
  card.style.viewTransitionName = `card-${index}`;
});

// 2. Logic to show/hide cards
function updateCardVisibility() {
  const selectedSeason = seasonFilter.value;
  const selectedType = typeFilter.value;

  cards.forEach(card => {
    // Read the data attributes from the tags inside each card
    const cardSeason = card.querySelector('[data-season]')?.dataset.season;
    const cardType = card.querySelector('[data-type]')?.dataset.type;

    // Check if the card matches both dropdown selections
    const matchesSeason = selectedSeason === 'all' || cardSeason === selectedSeason;
    const matchesType = selectedType === 'all' || cardType === selectedType;

    // Show if both conditions match, otherwise hide
    card.hidden = !(matchesSeason && matchesType);
  });
}

// 3. Trigger filter with animation
function filterMushrooms() {
  // If the browser supports View Transitions, use it; otherwise just update directly
  if (document.startViewTransition) {
    document.startViewTransition(updateCardVisibility);
  } else {
    updateCardVisibility();
  }
}

seasonFilter.addEventListener('change', filterMushrooms);
typeFilter.addEventListener('change', filterMushrooms);