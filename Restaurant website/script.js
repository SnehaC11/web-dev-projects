// Hide the header when scrolling down, show it again when scrolling up
const header = document.getElementById("header");
let lastScrollTop = 0;

if (header) {
  window.addEventListener(
    "scroll",
    function () {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        header.classList.add("hidden"); // scrolling down
      } else {
        header.classList.remove("hidden"); // scrolling up
      }
      // Reset at the top (also covers negative scroll values on mobile bounce)
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    },
    false
  );
}