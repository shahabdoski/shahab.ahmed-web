/* =========================================================
   SHAHAB PORTFOLIO
   Professional JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
       ===================================================== */

    const navbar = document.querySelector(".navbar");
    const nav = document.querySelector(".navbar nav");

    // Create mobile menu button
    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-btn";
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    menuButton.setAttribute("aria-label", "Open navigation menu");

    if (navbar && nav) {
        navbar.appendChild(menuButton);

        menuButton.addEventListener("click", () => {
            nav.classList.toggle("mobile-active");

            const icon = menuButton.querySelector("i");

            if (nav.classList.contains("mobile-active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        // Close menu after clicking a link
        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("mobile-active");

                const icon = menuButton.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            });
        });
    }


    /* =====================================================
       2. SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                targetId === "#" ||
                !document.querySelector(targetId)
            ) {
                return;
            }

            event.preventDefault();

            const target = document.querySelector(targetId);

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       3. NAVBAR SCROLL EFFECT
       ===================================================== */

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* =====================================================
       4. ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(
        '.navbar nav a[href^="#"]'
    );

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveLink
    );

    updateActiveLink();


    /* =====================================================
       5. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-title, .about-card, .service-card, " +
        ".process-card, .portfolio-item, .price-card, " +
        ".faq-item, .review-card, .contact-info, " +
        ".contact-form, .stat-card"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "reveal-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       6. STATISTICS COUNTER
       ===================================================== */

    const counters =
        document.querySelectorAll(".stat-number");

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const counter = entry.target;

                    const originalText =
                        counter.textContent.trim();

                    const numberMatch =
                        originalText.match(
                            /[\d.]+/
                        );

                    if (!numberMatch) {
                        return;
                    }

                    const target =
                        parseFloat(
                            numberMatch[0]
                        );

                    const prefix =
                        originalText.startsWith("+")
                            ? "+"
                            : "";

                    const suffix =
                        originalText.includes("%")
                            ? "%"
                            : "";

                    let start = 0;

                    const duration = 1800;

                    const startTime =
                        performance.now();

                    function animateCounter(
                        currentTime
                    ) {

                        const progress =
                            Math.min(
                                (
                                    currentTime -
                                    startTime
                                ) / duration,
                                1
                            );

                        // Smooth easing
                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );

                        const value =
                            Math.floor(
                                start +
                                (
                                    target -
                                    start
                                ) * eased
                            );

                        counter.textContent =
                            prefix +
                            value +
                            suffix;

                        if (progress < 1) {

                            requestAnimationFrame(
                                animateCounter
                            );

                        } else {

                            counter.textContent =
                                originalText;

                        }

                    }

                    requestAnimationFrame(
                        animateCounter
                    );

                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.6
            }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       7. PORTFOLIO HOVER EFFECT
       ===================================================== */

    const portfolioItems =
        document.querySelectorAll(
            ".portfolio-item"
        );

    portfolioItems.forEach(item => {

        item.addEventListener(
            "mousemove",
            event => {

                const rect =
                    item.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -5;

                const rotateY =
                    ((x / rect.width) - 0.5) * 5;

                item.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );

        item.addEventListener(
            "mouseleave",
            () => {

                item.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       8. CONTACT FORM
       ===================================================== */

    const contactForms =
        document.querySelectorAll(
            ".contact-form"
        );

    contactForms.forEach(form => {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nameInput =
                    form.querySelector(
                        'input[type="text"]'
                    );

                const emailInput =
                    form.querySelector(
                        'input[type="email"]'
                    );

                const messageInput =
                    form.querySelector(
                        "textarea"
                    );

                if (
                    !nameInput ||
                    !emailInput ||
                    !messageInput
                ) {
                    return;
                }

                const name =
                    nameInput.value.trim();

                const email =
                    emailInput.value.trim();

                const message =
                    messageInput.value.trim();

                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showNotification(
                        "Please fill in all fields.",
                        "error"
                    );

                    return;
                }

                // Email validation
                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailPattern.test(email)
                ) {

                    showNotification(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;
                }

                /*
                   WhatsApp message
                   Replace this number if needed.
                */

                const phone =
                    "9647511531733";

                const whatsappMessage =
                    `Hello Shahab,

Name: ${name}
Email: ${email}

Project Details:
${message}`;

                const whatsappURL =
                    `https://wa.me/${phone}?text=` +
                    encodeURIComponent(
                        whatsappMessage
                    );

                showNotification(
                    "Opening WhatsApp...",
                    "success"
                );

                setTimeout(() => {

                    window.open(
                        whatsappURL,
                        "_blank"
                    );

                    form.reset();

                }, 800);

            }
        );

    });


    /* =====================================================
       9. NOTIFICATION SYSTEM
       ===================================================== */

    function showNotification(
        message,
        type = "success"
    ) {

        const oldNotification =
            document.querySelector(
                ".js-notification"
            );

        if (oldNotification) {
            oldNotification.remove();
        }

        const notification =
            document.createElement("div");

        notification.className =
            `js-notification ${type}`;

        notification.innerHTML = `
            <i class="fas ${
                type === "success"
                    ? "fa-circle-check"
                    : "fa-circle-exclamation"
            }"></i>
            <span>${message}</span>
            <button aria-label="Close">
                <i class="fas fa-xmark"></i>
            </button>
        `;

        document.body.appendChild(
            notification
        );

        setTimeout(() => {
            notification.classList.add(
                "show"
            );
        }, 50);

        const closeButton =
            notification.querySelector(
                "button"
            );

        closeButton.addEventListener(
            "click",
            () => {

                notification.classList.remove(
                    "show"
                );

                setTimeout(() => {
                    notification.remove();
                }, 300);

            }
        );

        setTimeout(() => {

            if (
                document.body.contains(
                    notification
                )
            ) {

                notification.classList.remove(
                    "show"
                );

                setTimeout(() => {
                    notification.remove();
                }, 300);

            }

        }, 4000);

    }


    /* =====================================================
       10. BACK TO TOP BUTTON
       ===================================================== */

    const backTop =
        document.createElement("button");

    backTop.className =
        "back-to-top";

    backTop.innerHTML =
        '<i class="fas fa-arrow-up"></i>';

    backTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(
        backTop
    );

    function toggleBackTop() {

        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }

    window.addEventListener(
        "scroll",
        toggleBackTop
    );

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       11. FAQ IMPROVEMENT
       ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );

    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (item.open) {

                    faqItems.forEach(
                        other => {

                            if (
                                other !== item
                            ) {
                                other.removeAttribute(
                                    "open"
                                );
                            }

                        }
                    );

                }

            }
        );

    });


    /* =====================================================
       12. IMAGE LAZY LOADING
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );

    images.forEach(image => {

        if (!image.hasAttribute("loading")) {
            image.setAttribute(
                "loading",
                "lazy"
            );
        }

    });


    /* =====================================================
       13. IMAGE ERROR HANDLING
       ===================================================== */

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity =
                    "0.5";

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       14. WHATSAPP BUTTON
       ===================================================== */

    const whatsappButtons =
        document.querySelectorAll(
            ".whatsapp-btn"
        );

    whatsappButtons.forEach(button => {

        button.href =
            "https://wa.me/9647511531733";

        button.target =
            "_blank";

        button.rel =
            "noopener noreferrer";

    });


    /* =====================================================
       15. SOCIAL LINKS
       ===================================================== */

    const socialLinks =
        document.querySelectorAll(
            ".social-links a"
        );

    socialLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !href ||
                    href === "#"
                ) {

                    event.preventDefault();

                    showNotification(
                        "Social media link will be added soon.",
                        "error"
                    );

                }

            }
        );

    });


    /* =====================================================
       16. TYPING EFFECT FOR HERO
       ===================================================== */

    const heroTitle =
        document.querySelector(
            ".hero h1"
        );

    if (heroTitle) {

        heroTitle.classList.add(
            "hero-title-ready"
        );

    }


    /* =====================================================
       17. MOUSE GLOW EFFECT
       ===================================================== */

    const glowOrbs =
        document.querySelectorAll(
            ".glow-orb"
        );

    if (
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    event.clientX /
                    window.innerWidth;

                const y =
                    event.clientY /
                    window.innerHeight;

                glowOrbs.forEach(
                    (orb, index) => {

                        const speed =
                            (index + 1) * 12;

                        orb.style.transform =
                            `translate(
                                ${x * speed}px,
                                ${y * speed}px
                            )`;

                    }
                );

            }
        );

    }


    /* =====================================================
       18. CURRENT YEAR
       ===================================================== */

    const footerText =
        document.querySelector(
            ".footer-bottom p"
        );

    if (footerText) {

        const currentYear =
            new Date().getFullYear();

        footerText.innerHTML =
            footerText.innerHTML.replace(
                /\b20\d{2}\b/,
                currentYear
            );

    }


    /* =====================================================
       19. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "Shahab Portfolio loaded successfully 🚀"
    );

});