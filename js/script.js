document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.toggle("active");
        });
    }

    // Add hover effect for dropdown
    document.querySelectorAll(".dropdown").forEach((item) => {
        item.addEventListener("mouseover", () => {
            item.querySelector(".dropdown-menu").classList.remove("hidden");
        });
        item.addEventListener("mouseout", () => {
            item.querySelector(".dropdown-menu").classList.add("hidden");
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
});