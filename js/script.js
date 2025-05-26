document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function() {
            const icon = menuToggle.querySelector("i");
            const isOpen = mobileMenu.style.maxHeight === "500px";

            mobileMenu.style.maxHeight = isOpen ? "0" : "500px";
            icon.classList.toggle("fa-bars", isOpen);
            icon.classList.toggle("fa-times", !isOpen);
        });

        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.style.maxHeight = "0";
                const icon = menuToggle.querySelector("i");
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        });
    }

    const header = document.querySelector("header");
    let lastScroll = 0;

    if (header) {
        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = "translateY(-100%)";
            } else {
                header.style.transform = "translateY(0)";
            }

            lastScroll = currentScroll;
        });
    }

    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.textContent.toLowerCase();

            filterButtons.forEach((btn) => {
                btn.classList.remove("bg-emerald-600", "text-white");
                btn.classList.add("bg-gray-200", "hover:bg-emerald-100");
            });

            button.classList.add("bg-emerald-600", "text-white");
            button.classList.remove("bg-gray-200", "hover:bg-emerald-100");

            document.querySelectorAll(".armada-card").forEach((card) => {
                const category = card.getAttribute("data-category");
                card.style.display =
                    filter === "all" || category === filter ? "block" : "none";
            });
        });
    });

    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = this.querySelector("#name").value.trim();
            const email = this.querySelector("#email").value.trim();
            const message = this.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                showAlert("Harap isi semua field", "error");
                return;
            }

            if (!validateEmail(email)) {
                showAlert("Format email tidak valid", "error");
                return;
            }

            showAlert("Pesan terkirim! Kami akan segera menghubungi Anda", "success");
            this.reset();
        });
    }

    AOS.init({
        duration: 800,
        once: true,
        easing: "ease-in-out-quad",
        mirror: false,
        offset: 120,
        disable: window.innerWidth < 768,
    });

    const galleryCards = document.querySelectorAll(".gallery-item");
    galleryCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            if (window.innerWidth > 768) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.transform = `
          perspective(1000px)
          rotateX(${(y - rect.height / 2) / 20}deg)
          rotateY(${-(x - rect.width / 2) / 20}deg)
        `;
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "none";
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement("div");
        alertDiv.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white ${
      type === "error" ? "bg-red-500" : "bg-green-500"
    } z-50 transition-opacity`;
        alertDiv.textContent = message;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.style.opacity = "0";
            setTimeout(() => {
                alertDiv.remove();
            }, 300);
        }, 3000);
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
        document.body.classList.add("resize-animation-stopper");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove("resize-animation-stopper");
        }, 400);
    });
});