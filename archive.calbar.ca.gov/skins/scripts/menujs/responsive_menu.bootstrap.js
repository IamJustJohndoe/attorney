(function () {
  "use strict";

  /**
   * Provides the off-canvas menu functionality
   * Initializes when the DOM is ready
   */
  document.addEventListener("DOMContentLoaded", function () {
    // Get the toggle button and off-canvas menu elements
    const toggleIcon = document.querySelector("#toggle-icon");
    const offCanvas = document.querySelector("#off-canvas");

    // Only initialize if we have both elements
    if (toggleIcon && offCanvas) {
      // Check if mmenu is already initialized
      let mmenuApi = offCanvas.mmApi;

      if (!mmenuApi && typeof Mmenu !== "undefined") {
        // Initialize mmenu only if not already initialized
        const mmenu = new Mmenu("#off-canvas", {
          offCanvas: {
            position: "right",
          },
        });
        mmenuApi = mmenu.API;
      }
    }
  });
})();
