/* =========================================================
   ASTÉROÏD DESTROYER
   DEMO COUNTDOWN SYSTEM

   RELEASE:
   05 OCTOBRE 2026 — 18:00
   EUROPE/PARIS
   ========================================================= */


/* =========================================================
   CONFIGURATION
   ========================================================= */

const DEMO_RELEASE = {
    year: 2026,
    month: 10,
    day: 5,
    hour: 18,
    minute: 0,
    second: 0
};


/* =========================================================
   ÉLÉMENTS HTML
   ========================================================= */

const countdown = document.querySelector("[data-demo-countdown]");

const daysElement = document.querySelector("[data-demo-days]");
const hoursElement = document.querySelector("[data-demo-hours]");
const minutesElement = document.querySelector("[data-demo-minutes]");
const secondsElement = document.querySelector("[data-demo-seconds]");

const countdownPanel = document.querySelector("[data-demo-countdown-panel]");
const releaseSection = document.querySelector("[data-demo-release]");

const statusText = document.querySelector("[data-demo-status]");
const releaseStatus = document.querySelector("[data-demo-release-status]");


/* =========================================================
   VÉRIFICATION
   ========================================================= */

if (
    countdown &&
    daysElement &&
    hoursElement &&
    minutesElement &&
    secondsElement
) {

    initDemoCountdown();

}


/* =========================================================
   INITIALISATION
   ========================================================= */

function initDemoCountdown() {

    let releaseTimestamp;


    /* =====================================================
       MODE TEST
       ===================================================== */

    if (DEMO_TEST_MODE) {

        releaseTimestamp =
            Date.now() +
            (DEMO_TEST_SECONDS * 1000);

    }


    /* =====================================================
       MODE RÉEL
       ===================================================== */

    else {

        releaseTimestamp =
            getParisTimestamp(
                DEMO_RELEASE.year,
                DEMO_RELEASE.month,
                DEMO_RELEASE.day,
                DEMO_RELEASE.hour,
                DEMO_RELEASE.minute,
                DEMO_RELEASE.second
            );

    }


    /*
     * Première mise à jour immédiate.
     */

    updateCountdown(releaseTimestamp);


    /*
     * Mise à jour chaque seconde.
     */

    const countdownInterval =
        setInterval(() => {

            const finished =
                updateCountdown(
                    releaseTimestamp
                );


            if (finished) {

                clearInterval(
                    countdownInterval
                );

            }

        }, 1000);

}



/* =========================================================
   CALCUL DE LA DATE EUROPE/PARIS
   ========================================================= */

function getParisTimestamp(
    year,
    month,
    day,
    hour,
    minute,
    second
) {

    /*
     * On utilise le moteur Intl du navigateur afin de
     * respecter automatiquement l'heure française et son
     * éventuel changement heure d'été / heure d'hiver.
     */

    const targetString =
        `${year}-${String(month).padStart(2, "0")}-` +
        `${String(day).padStart(2, "0")}T` +
        `${String(hour).padStart(2, "0")}:` +
        `${String(minute).padStart(2, "0")}:` +
        `${String(second).padStart(2, "0")}`;


    /*
     * Recherche de l'offset correspondant à Europe/Paris.
     */

    const utcGuess =
        Date.UTC(
            year,
            month - 1,
            day,
            hour,
            minute,
            second
        );


    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                timeZone: "Europe/Paris",
                timeZoneName: "longOffset"
            }
        );


    const parts =
        formatter.formatToParts(
            new Date(utcGuess)
        );


    const offsetPart =
        parts.find(
            part => part.type === "timeZoneName"
        );


    let offsetMinutes = 0;


    if (
        offsetPart &&
        offsetPart.value
    ) {

        const match =
            offsetPart.value.match(
                /GMT([+-])(\d{2}):?(\d{2})/
            );


        if (match) {

            const sign =
                match[1] === "+"
                    ? 1
                    : -1;

            const hours =
                Number(match[2]);

            const minutes =
                Number(match[3]);

            offsetMinutes =
                sign *
                (
                    hours * 60 +
                    minutes
                );

        }

    }


    return (
        Date.UTC(
            year,
            month - 1,
            day,
            hour,
            minute,
            second
        ) -
        offsetMinutes * 60 * 1000
    );

}


/* =========================================================
   MISE À JOUR DU COMPTEUR
   ========================================================= */

function updateCountdown(releaseTimestamp) {

    const now =
        Date.now();


    let remaining =
        releaseTimestamp - now;


    /*
     * La date est atteinte.
     */

    if (remaining <= 0) {

        remaining = 0;

        updateDisplay(
            0,
            0,
            0,
            0
        );

        activateDemoRelease();

        return true;

    }


    /*
     * Conversion millisecondes → unités.
     */

    const totalSeconds =
        Math.floor(
            remaining / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    updateDisplay(
        days,
        hours,
        minutes,
        seconds
    );


    return false;

}


/* =========================================================
   AFFICHAGE
   ========================================================= */

function updateDisplay(
    days,
    hours,
    minutes,
    seconds
) {

    daysElement.textContent =
        formatNumber(days);

    hoursElement.textContent =
        formatNumber(hours);

    minutesElement.textContent =
        formatNumber(minutes);

    secondsElement.textContent =
        formatNumber(seconds);

}


/* =========================================================
   FORMAT DES NOMBRES
   ========================================================= */

function formatNumber(value) {

    return String(value)
        .padStart(2, "0");

}


/* =========================================================
   DÉVERROUILLAGE DE LA DÉMO
   ========================================================= */

function activateDemoRelease() {

    /* Empêche un double déclenchement */

    if (
        document.body.dataset.demoReleased === "true"
    ) {

        return;

    }


    document.body.dataset.demoReleased =
        "true";


    /* =====================================================
       COMPTEUR
       ===================================================== */

    if (countdownPanel) {

        countdownPanel.classList.add(
            "demo-countdown-finished"
        );

    }


    /* =====================================================
       SECTION TÉLÉCHARGEMENT
       ===================================================== */

    if (releaseSection) {

        releaseSection.hidden = false;

        requestAnimationFrame(() => {

            releaseSection.classList.add(
                "demo-release-visible"
            );

        });

    }


    /* =====================================================
       STATUT PRINCIPAL
       ===================================================== */

    if (statusText) {

        statusText.textContent =
            "SYSTEM ONLINE";

    }


    /* =====================================================
       STATUT TÉLÉCHARGEMENT
       ===================================================== */

    if (releaseStatus) {

        releaseStatus.textContent =
            "DOWNLOAD AVAILABLE";

    }

}

/* =========================================================
   FIN DU SYSTÈME
   ========================================================= */
