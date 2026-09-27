/* =========================================================
   ASTEROIDE.DESTROYER
   NAVIGATION
   ========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");


/* =========================================================
   OUVERTURE / FERMETURE DU MENU
   ========================================================= */

function toggleMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    const isOpen =
        navMenu.classList.toggle("is-open");

    menuToggle.classList.toggle(
        "is-open",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Fermer le menu"
            : "Ouvrir le menu"
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );
}


/* =========================================================
   FERMETURE
   ========================================================= */

function closeMenu() {

    if (!menuToggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("is-open");

    menuToggle.classList.remove("is-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Ouvrir le menu"
    );

    document.body.classList.remove(
        "menu-open"
    );
}


/* =========================================================
   BOUTON MENU
   ========================================================= */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );
}


/* =========================================================
   FERMETURE APRÈS CLIC
   ========================================================= */

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        closeMenu
    );

});


/* =========================================================
   TOUCHE ESCAPE
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);

/* =========================================================
   PAGE ACTIVE
   ========================================================= */

function setActivePage() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    navLinks.forEach((link) => {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop();


        if (!linkPage) {
            return;
        }


        if (
            linkPage === currentPage ||
            (
                currentPage === ""
                && linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}


setActivePage();





/* =========================================================
   CLICK CARTE FONCTION
   ========================================================= */


const niveauxCard = document.querySelector(".feature-niveaux");

if (niveauxCard) {
    niveauxCard.addEventListener("click", () => {
        window.location.href = "niveaux.html";
    });

    niveauxCard.style.cursor = "pointer";
}
/* =========================================================
   CLICK CARTE BONUS
   ========================================================= */

const bonusCard = document.querySelector(".feature-bonus");

if (bonusCard) {
    bonusCard.addEventListener("click", () => {
        window.location.href = "bonus.html";
    });

    bonusCard.style.cursor = "pointer";
}
/* =========================================================
   CLICK CARTE MALUS
   ========================================================= */

const malusCard = document.querySelector(".feature-malus");

if (malusCard) {
    malusCard.addEventListener("click", () => {
        window.location.href = "./malus.html";
    });

    malusCard.style.cursor = "pointer";
}
/* =========================================================
   CLICK CARTE PEMP
   ========================================================= */

const pempCard = document.querySelector(".feature-plateformes");

if (pempCard) {
    pempCard.addEventListener("click", () => {
        window.location.href = "pemp.html";
    });

    pempCard.style.cursor = "pointer";
}
/* =========================================================
   CLICK CARTE MÉTÉOR
   ========================================================= */

const asteroidCard = document.querySelector(".feature-asteroides");

if (asteroidCard) {
    asteroidCard.addEventListener("click", () => {
        window.location.href = "meteor.html";
    });

    asteroidCard.style.cursor = "pointer";
}
/* =========================================================
   CLICK CARTE ENVIRONNEMENT
   ========================================================= */

const environmentCard = document.querySelector(".feature-stages");

if (environmentCard) {
    environmentCard.addEventListener("click", () => {
        window.location.href = "environnement.html";
    });

    environmentCard.style.cursor = "pointer";
}
/* =========================================================
   ARTWORK AGRANDISSEMENT CLICK
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const artworkCards =
        document.querySelectorAll(".artwork-card");


    /* =====================================================
       OUVERTURE / FERMETURE
       ===================================================== */

    artworkCards.forEach((card) => {

        card.addEventListener("click", () => {

            /*
             * Si l'image est déjà ouverte,
             * on la ferme.
             */

            if (card.classList.contains("artwork-open")) {

                card.classList.remove(
                    "artwork-open"
                );

                document.body.classList.remove(
                    "artwork-viewer-open"
                );

                return;
            }


            /*
             * Ferme les autres artworks
             */

            artworkCards.forEach((otherCard) => {

                otherCard.classList.remove(
                    "artwork-open"
                );

            });


            /*
             * Ouvre l'artwork sélectionné
             */

            card.classList.add(
                "artwork-open"
            );

            document.body.classList.add(
                "artwork-viewer-open"
            );

        });

    });


    /* =====================================================
       FERMETURE AVEC ESC
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }


        artworkCards.forEach((card) => {

            card.classList.remove(
                "artwork-open"
            );

        });


        document.body.classList.remove(
            "artwork-viewer-open"
        );

    });

});
