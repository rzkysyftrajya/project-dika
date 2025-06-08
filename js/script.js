document.addEventListener("DOMContentLoaded", () => {
    /* ========== MOBILE MENU TOGGLE ========== */
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        const icon = menuToggle.querySelector("i");

        menuToggle.addEventListener("click", () => {
            const isOpen = mobileMenu.style.maxHeight === "500px";
            mobileMenu.style.maxHeight = isOpen ? "0" : "500px";

            icon.classList.toggle("fa-bars", isOpen);
            icon.classList.toggle("fa-times", !isOpen);
        });

        // Close menu if clicked outside
        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.style.maxHeight = "0";
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        });
    }

    /* ========== NAVBAR HIDE ON SCROLL DOWN ========== */
    const header = document.querySelector("nav");
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener("scroll", () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScrollY && currentScroll > 80) {
                header.style.transform = "translateY(-100%)";
            } else {
                header.style.transform = "translateY(0)";
            }
            lastScrollY = currentScroll;
        });
    }

    /* ========== CAROUSEL HANDLING ========== */
    const slides = document.querySelectorAll(".carousel-slide");
    let currentIndex = 0;

    const showSlide = (index) => {
        if (!slides.length) return;
        slides.forEach((slide) => slide.classList.remove("active"));
        slides[index].classList.add("active");
    };

    const nextSlide = () => {
        if (!slides.length) return;
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    };

    const prevSlide = () => {
        if (!slides.length) return;
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    };

    if (slides.length > 0) {
        showSlide(currentIndex);
        setInterval(nextSlide, 5000);
    }

    const prevBtn = document.querySelector(".carousel-prev");
    const nextBtn = document.querySelector(".carousel-next");

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", prevSlide);
        nextBtn.addEventListener("click", nextSlide);
    }

    // Swipe support
    const carouselContainer = document.querySelector(".carousel-container");
    let startX = 0;
    let endX = 0;

    if (carouselContainer) {
        carouselContainer.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        carouselContainer.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) nextSlide();
            else if (endX - startX > 50) prevSlide();
        });
    }

    /* ========== FORM HANDLING ========== */
    const form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = form.querySelector("#name").value.trim();
            const email = form.querySelector("#email").value.trim();
            const message = form.querySelector("#message").value.trim();

            if (!name || !email || !message) {
                showAlert("Harap isi semua field!", "error");
                return;
            }

            if (!validateEmail(email)) {
                showAlert("Format email tidak valid!", "error");
                return;
            }

            showAlert("Pesan berhasil dikirim!", "success");
            form.reset();
        });
    }

    const showAlert = (message, type) => {
        const alert = document.createElement("div");
        alert.textContent = message;
        alert.className = `fixed top-4 right-4 px-5 py-3 rounded-md shadow-lg text-white z-[9999] transition-opacity duration-300 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    }`;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.style.opacity = "0";
            setTimeout(() => alert.remove(), 300);
        }, 2500);
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    /* ========== SCROLL ANIMASI ELEMENT (tanpa AOS) ========== */
    const reveals = document.querySelectorAll(".reveal-up");

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach((el) => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add("reveal-visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});