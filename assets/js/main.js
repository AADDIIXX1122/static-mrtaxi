/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
      duration: 2000, // Increased from default
      easing: 'ease-in-out',
      delay: 300,     // Added delay
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom'
    });
  });
  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

function initAutocomplete() {
  const locationInput = document.getElementById("location-input");
  const locationSuggestions = document.getElementById("location-suggestions");
  const destinationInput = document.getElementById("destination-input");
  const destinationSuggestions = document.getElementById("destination-suggestions");

  // Helper function to fetch and display suggestions
  function fetchSuggestions(input, suggestionsContainer) {
    const autocompleteService = new google.maps.places.AutocompleteService();

    input.addEventListener("input", () => {
      const query = input.value;

      if (query.length > 2) {
        autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            suggestionsContainer.innerHTML = "";

            predictions.forEach((prediction) => {
              const suggestion = document.createElement("div");
              suggestion.textContent = prediction.description;

              suggestion.addEventListener("click", () => {
                input.value = prediction.description;
                suggestionsContainer.innerHTML = "";
              });

              suggestionsContainer.appendChild(suggestion);
            });
          }
        });
      } else {
        suggestionsContainer.innerHTML = "";
      }
    });
  }

  fetchSuggestions(locationInput, locationSuggestions);
  fetchSuggestions(destinationInput, destinationSuggestions);
}

// Initialize auto-suggestions on page load
window.onload = initAutocomplete;

function initializeAutocomplete() {
  const locationInput = document.getElementById("location-input");
  const destinationInput = document.getElementById("destination-input");
  const locationSuggestions = document.getElementById("location-suggestions");
  const destinationSuggestions = document.getElementById("destination-suggestions");

  // Initialize Google Places Autocomplete Service
  const autocompleteService = new google.maps.places.AutocompleteService();

  // Fetch suggestions based on user input
  function fetchSuggestions(input, suggestionsContainer) {
    input.addEventListener("input", () => {
      const query = input.value;

      if (query.length > 2) {
        autocompleteService.getPlacePredictions({ input: query }, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            suggestionsContainer.innerHTML = "";

            predictions.forEach((prediction) => {
              const suggestion = document.createElement("div");
              suggestion.textContent = prediction.description;

              // On selecting a suggestion, set the input value and clear suggestions
              suggestion.addEventListener("click", () => {
                input.value = prediction.description;
                suggestionsContainer.innerHTML = "";
              });

              suggestionsContainer.appendChild(suggestion);
            });
          } else {
            suggestionsContainer.innerHTML = `<div>No results found</div>`;
          }
        });
      } else {
        suggestionsContainer.innerHTML = "";
      }
    });

    // Clear suggestions when the input loses focus
    input.addEventListener("blur", () => {
      setTimeout(() => {
        suggestionsContainer.innerHTML = "";
      }, 200);
    });
  }

  // Apply suggestions functionality to both input fields
  fetchSuggestions(locationInput, locationSuggestions);
  fetchSuggestions(destinationInput, destinationSuggestions);
}

// Initialize the autocomplete suggestions on window load
window.onload = initializeAutocomplete;

function initializeAutocomplete() {
  const locationInput = document.getElementById("location-input");
  const destinationInput = document.getElementById("destination-input");

  const options = {
    fields: ["place_id", "geometry", "name"],
    types: ["geocode"], // You can adjust this based on what type of places you need.
  };

  const locationAutocomplete = new google.maps.places.Autocomplete(locationInput, options);
  const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput, options);

  locationAutocomplete.addListener("place_changed", () => {
    const place = locationAutocomplete.getPlace();
    console.log("Selected Location:", place);
  });

  destinationAutocomplete.addListener("place_changed", () => {
    const place = destinationAutocomplete.getPlace();
    console.log("Selected Destination:", place);
  });
}

google.maps.event.addDomListener(window, "load", initializeAutocomplete);
