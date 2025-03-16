document.addEventListener("DOMContentLoaded", function () {
    // ✅ Toggle Menu Mobile
    const nav = document.querySelector(".nav-links");
    const toggle = document.createElement("div");
    toggle.classList.add("nav-toggle");
    toggle.innerHTML = '<span></span><span></span><span></span>'; // Hamburger menu
    document.querySelector(".nav-container").prepend(toggle);

    toggle.addEventListener("click", () => {
        nav.classList.toggle("show");
        toggle.classList.toggle("active");
    });

    // ✅ Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
                nav.classList.remove("show");
                toggle.classList.remove("active");
            }
        });
    });

    // ✅ Efek Header saat Scroll
    window.addEventListener("scroll", () => {
        document.querySelector("header").classList.toggle("scrolled", window.scrollY > 50);
    });

    // ✅ Lazy Loading Gambar (tidak mempengaruhi modal)
    document.querySelectorAll("img").forEach(img => {
        if (!img.classList.contains("parallax")) {
            img.setAttribute("loading", "lazy");
        }
    });

    // ✅ Zoom Gambar (Modal) dengan Animasi Soft
    const images = document.querySelectorAll("img:not(.parallax)");
    const modal = document.createElement("div");
    modal.classList.add("image-modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Zoomed Image">
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector("img");
    const closeModal = modal.querySelector(".close-modal");

    images.forEach(img => {
        img.addEventListener("click", () => {
            modalImage.src = img.src;
            modal.classList.add("show");
        });
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target === closeModal) {
            modal.classList.remove("show");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("show");
        }
    });

    // ✅ Efek Ketik yang Smooth dan 100% FIXED
    const textElement = document.querySelector(".hero h1");
    const names = [
        "Ach. Miftakhul Huda",
        "مفتاح الحدى (AR)",
        "ミフタフル フダ (JP)"
    ];
    let nameIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentName = names[nameIndex];

        if (isDeleting) {
            letterIndex--;
        } else {
            letterIndex++;
        }

        textElement.innerHTML = currentName.substring(0, letterIndex);

        let typingSpeed = isDeleting ? 100 : 150;

        if (!isDeleting && letterIndex === currentName.length) {
            setTimeout(() => (isDeleting = true), 2000);
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            nameIndex = (nameIndex + 1) % names.length;
            setTimeout(typeEffect, 800);
            return;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    setTimeout(typeEffect, 1000);

    // ✅ Efek Highlight dengan Slide & Fade-in yang Lebih Soft
    const highlightText = document.getElementById("highlight-text");
    const highlightPhrases = [
        "Pendiri MHTeams | Staff Pengembangan Situs di YouthRanger Indonesia | Pelajar SMA | Ketua OSIS Periode 2024-2025 (ID)",
        "Founder of MHTeams | Web Development Staff at YouthRanger Indonesia | High School Student | OSIS President 2024-2025 (EN)",
        "مؤسس MHTeams | موظف تطوير الويب في YouthRanger Indonesia | طالب مدرسة ثانوية | رئيس مجلس الطلاب 2024-2025 (AR)",
        "MHTeamsの創設者 | YouthRanger Indonesiaのウェブ開発スタッフ | 高校生 | OSIS会長 2024-2025 (JP)",
        "Fondateur de MHTeams | Développeur Web chez YouthRanger Indonesia | Lycéen | Président de l'OSIS 2024-2025 (FR)",
        "Fundador de MHTeams | Desarrollador web en YouthRanger Indonesia | Estudiante de secundaria | Presidente de OSIS 2024-2025 (ES)"
    ];
    let phraseIndex = 0;

    function startHighlightEffect() {
        highlightText.style.transition = "opacity 0.6s ease-in-out, transform 0.6s ease-in-out";

        setInterval(() => {
            highlightText.style.opacity = "0";
            highlightText.style.transform = "translateY(15px)";

            setTimeout(() => {
                highlightText.innerHTML = highlightPhrases[phraseIndex];
                highlightText.style.opacity = "1";
                highlightText.style.transform = "translateY(0)";
                phraseIndex = (phraseIndex + 1) % highlightPhrases.length;
            }, 500);
        }, 5000);
    }

    setTimeout(startHighlightEffect, 2000);

    // ✅ Efek Hover Glow di Tombol CTA
    document.querySelectorAll(".cta").forEach(button => {
        button.addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.setProperty("--x", `${x}px`);
            this.style.setProperty("--y", `${y}px`);
        });
    });

    // ✅ Animasi Scroll Reveal lebih smooth
    const scrollElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        scrollElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
});