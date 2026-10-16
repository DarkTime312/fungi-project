// ===========================
//        Filters
// ===========================

const seasonFilter = document.querySelector("#seasons");
const typeFilter = document.querySelector("#mushroom-types");
const cards = document.querySelectorAll(".section-guide .card");
const placeholderText = document.querySelector(".section-guide__placeholder");

// Only initialize filtering on pages that contain the filters.
if (seasonFilter && typeFilter && placeholderText) {
  // Give each card a unique name for View Transitions.
  cards.forEach((card, index) => {
    card.style.viewTransitionName = `card-${index}`;
  });

  // Logic to show/hide cards
  function updateCardVisibility() {
    const selectedSeason = seasonFilter.value;
    const selectedType = typeFilter.value;
    let visibleCardCount = 0;

    cards.forEach((card) => {
     // Read the data attributes from the tags inside each card
      const cardSeason = card.querySelector("[data-season]")?.dataset.season;
      const cardType = card.querySelector("[data-type]")?.dataset.type;

     // Check if the card matches both dropdown selections
      const matchesSeason =
        selectedSeason === "all" || cardSeason === selectedSeason;

      const matchesType =
        selectedType === "all" || cardType === selectedType;

      const matchesFilters = matchesSeason && matchesType;

     // Show if both conditions match, otherwise hide
      card.hidden = !matchesFilters;

      if (matchesFilters) {
        visibleCardCount += 1;
      }
    });

    // Show the placeholder only when no cards match.
    placeholderText.hidden = visibleCardCount > 0;
  }

// Trigger filter with animation
  function filterMushrooms() {
    // If the browser supports View Transitions, use it; otherwise just update directly
    if (document.startViewTransition) {
      document.startViewTransition(updateCardVisibility);
    } else {
      updateCardVisibility();
    }
  }

  seasonFilter.addEventListener("change", filterMushrooms);
  typeFilter.addEventListener("change", filterMushrooms);

  // Sync visibility with the dropdowns when the page first loads.
  updateCardVisibility();
}