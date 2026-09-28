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

/*
 * MODE TEST
 *
 * false = vrai compte à rebours
 * true  = simulation de 15 secondes
 *
 * IMPORTANT :
 * Pour le site final, laisser false.
 */

const DEMO_TEST_MODE = false;

const DEMO_TEST_SECONDS = 15;


/*
 * DATE RÉELLE DE SORTIE
 */

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

const countdown =
    document.querySelector(
        "[data-demo-countdown]"
    );


const daysElement =
    document.querySelector(
        "[data-demo-days]"
    );


const hoursElement =
    document.querySelector(
        "[data-demo-hours]"
    );


const minutesElement =
    document.querySelector(
        "[data-demo-minutes]"
    );


const secondsElement =
    document.querySelector(
        "[data-demo-seconds]"
    );


const countdownPanel =
    document.querySelector(
        "[data-demo-countdown-panel]"
    );


const releaseSection =
    document.querySelector(
        "[data-demo-release]"
    );


const statusText =
    document.querySelector(
        "[data-demo-status]"
    );


const releaseStatus =
    document.querySelector(
        "[data-demo-release-status]"
    );


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
            (
                DEMO_TEST_SECONDS *
                1000
            );

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

    updateCountdown(
        releaseTimestamp
    );


    /*
     * Mise à jour toutes les secondes.
     */

    const countdownInterval =
        setInterval(

            () => {

                const finished =
                    updateCountdown(
                        releaseTimestamp
                    );


                if (finished) {

                    clearInterval(
                        countdownInterval
                    );

                }

            },

            1000

        );

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
     * Conversion robuste de la date Paris
     * vers un timestamp UTC.
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

                timeZone:
                    "Europe/Paris",

                timeZoneName:
                    "longOffset"

            }

        );


    const parts =
        formatter.formatToParts(

            new Date(
                utcGuess
            )

        );


    const offsetPart =
        parts.find(

            part =>
                part.type ===
                "timeZoneName"

        );


    let offsetMinutes = 0;


    if (
        offsetPart &&
        offsetPart.value
    ) {

        const match =
            offsetPart.value.match(

                /GMT([+-])(\d{1,2})(?::?(\d{2}))?/

            );


        if (match) {

            const sign =
                match[1] === "+"
                    ? 1
                    : -1;


            const hours =
                Number(
                    match[2]
                );


            const minutes =
                Number(
                    match[3] || 0
                );


            offsetMinutes =
                sign *
                (
                    hours * 60 +
                    minutes
                );

        }

    }


    return (

        utcGuess -
        (
            offsetMinutes *
            60 *
            1000
        )

    );

}


/* =========================================================
   MISE À JOUR DU COMPTEUR
   ========================================================= */

function updateCountdown(
    releaseTimestamp
) {

    const now =
        Date.now();


    const remaining =
        releaseTimestamp -
        now;


    /* =====================================================
       FIN DU COMPTE À REBOURS
       ===================================================== */

    if (
        remaining <= 0
    ) {

        updateDisplay(

            0,
            0,
            0,
            0

        );


        activateDemoRelease();


        return true;

    }


    /* =====================================================
       CONVERSION
       ===================================================== */

    const totalSeconds =
        Math.floor(

            remaining /
            1000

        );


    const days =
        Math.floor(

            totalSeconds /
            86400

        );


    const hours =
        Math.floor(

            (
                totalSeconds %
                86400
            ) /
            3600

        );


    const minutes =
        Math.floor(

            (
                totalSeconds %
                3600
            ) /
            60

        );


    const seconds =
        totalSeconds %
        60;


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
        formatNumber(
            days
        );


    hoursElement.textContent =
        formatNumber(
            hours
        );


    minutesElement.textContent =
        formatNumber(
            minutes
        );


    secondsElement.textContent =
        formatNumber(
            seconds
        );

}


/* =========================================================
   FORMAT DES NOMBRES
   ========================================================= */

function formatNumber(
    value
) {

    return String(
        value
    ).padStart(
        2,
        "0"
    );

}


/* =========================================================
   DÉVERROUILLAGE DE LA DÉMO
   ========================================================= */

function activateDemoRelease() {

    /*
     * Empêche plusieurs déclenchements.
     */

    if (

        document.body.dataset
            .demoReleased === "true"

    ) {

        return;

    }


    document.body.dataset
        .demoReleased = "true";


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

        /*
         * On retire réellement hidden.
         */

        releaseSection.hidden =
            false;


        /*
         * Laisse le navigateur appliquer
         * le changement avant l'animation.
         */

        requestAnimationFrame(

            () => {

                releaseSection.classList.add(
                    "demo-release-visible"
                );

            }

        );

    }


    /* =====================================================
       STATUT PRINCIPAL
       ===================================================== */

    if (statusText) {

        statusText.textContent =
            "SYSTEM ONLINE";

    }


    /* =====================================================
       STATUT DOWNLOAD
       ===================================================== */

    if (releaseStatus) {

        releaseStatus.textContent =
            "DOWNLOAD AVAILABLE";

    }

}


/* =========================================================
   FIN DU SYSTÈME
   ========================================================= */
