document.addEventListener("DOMContentLoaded", function () {
  // Returns the default display value for a given tag name (e.g. "div" -> "block")
  function getDefaultDisplay(tagName) {
    const temp = document.createElement(tagName);
    // place off-screen and not visible to avoid reflow issues
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    const display = window.getComputedStyle(temp).display;
    document.body.removeChild(temp);
    return display === "none" || !display ? "block" : display;
  }

  const btn = document.getElementById("search-header-toggle");
  const el = document.getElementById("search-header-drawer");
  // determine and store the "show" display value to restore later
  const computed = window.getComputedStyle(el).display;
  const showDisplay =
    computed === "none"
      ? getDefaultDisplay(el.tagName.toLowerCase())
      : computed;
  el.dataset._showDisplay = showDisplay;
  btn.addEventListener("click", function () {
    const curr = window.getComputedStyle(el).display;
    if (curr === "none") {
      // show using stored natural display
      el.style.display = el.dataset._showDisplay;
    } else {
      // hide
      el.style.display = "none";
    }
  });

  function addRedirectOnClick(triggerId, inputSelector, baseUrl, options = {}) {
    const trigger = document.getElementById(triggerId);
    if (!trigger) {
      console.warn("Trigger not found:", triggerId);
      return;
    }
    trigger.addEventListener(
      "click",
      function (event) {
        // Prevent default action (form submit or link navigation)
        event.preventDefault();

        const input = document.querySelector(inputSelector);
        const value = input ? input.value.trim() : "";

        // Build absolute URL safely even if baseUrl is relative
        const url = new URL(baseUrl, window.location.origin);

        // Remove any other query params and set only 'search' if we have a value
        url.search = ""; // clear existing query string
        if (value !== "") {
          url.searchParams.set("search", value);
        }

        // Redirect (use replace() if you don't want a back history)
        window.location.assign(url.toString());
      },
      { passive: false }
    );
  }

  addRedirectOnClick(
    "edit-search",
    "#edit-search-content",
    "https://www.calbar.ca.gov/search"
  );

  // Add a toggle button with arrow to each top level main menu link to control submenu visibility.
  document
    .querySelectorAll(".menu--main .menu-item--level-1 > ul")
    .forEach((submenu) => {
      submenu.insertAdjacentHTML(
        "beforebegin",
        '<button aria-expanded="false" aria-label="Toggle submenu"><svg style="width: .5em; height: 1em;" viewBox="0 0 8 5" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M4.44653 4.98329L0.946533 1.48329L1.7632 0.666626L4.44653 3.34996L7.12987 0.666626L7.94653 1.48329L4.44653 4.98329Z" /></svg></button>'
      );
      // Get the inserted button and bind a click event for keyboard activation.
      let button = submenu.previousElementSibling;
      button.addEventListener("click", (event) => {
        button.setAttribute(
          "aria-expanded",
          button.getAttribute("aria-expanded") == "false" ? "true" : "false"
        );
      });
    });

  // When hovering over a menu item open its submenu, after closing any other one that might be open.
  document
    .querySelectorAll(".menu--main .menu-item--level-1")
    .forEach((submenu) => {
      submenu.addEventListener("mouseenter", (event) => {
        submenu.parentNode.querySelectorAll("button").forEach((button) => {
          button.setAttribute("aria-expanded", "false");
        });
        const button = submenu.querySelector("button");
        if (button) {
          button.setAttribute("aria-expanded", "true");
        }
      });
    });

  // Close the dropdowns when the user leaves the menu
  document.querySelectorAll(".menu--main").forEach((menu) => {
    menu.addEventListener("mouseleave", (event) => {
      menu.querySelectorAll("button").forEach((button) => {
        button.setAttribute("aria-expanded", "false");
      });
    });
  });

  // Activate the search toggle button
  const searchToggle = document.querySelector("#search-header-toggle");
  if (searchToggle) {
    searchToggle.addEventListener("click", (event) => {
      const isExpanded = searchToggle.getAttribute("aria-expanded") == "false";
      searchToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");

      // If expanding the search, focus the search input
      if (isExpanded) {
        setTimeout(() => {
          const searchInput = document.getElementById("edit-search-content");
          if (searchInput) {
            searchInput.focus();
          }
        }, 100);
      }
    });
  }

  // Responsive Menu toggle aria-expanded for menu burger icon
  const toggleIcon = document.querySelector("#toggle-icon");
  if (toggleIcon) {
    const updateAriaExpanded = () => {
      const isOpen = document.body.classList.contains("mm-wrapper_opened");
      toggleIcon.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };
    // Update on click
    toggleIcon.addEventListener("click", updateAriaExpanded);
    // Also update on DOM changes (menu open/close)
    const observer = new MutationObserver(updateAriaExpanded);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    // Initial set
    updateAriaExpanded();
  }
});
