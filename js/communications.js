
document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("communications-trigger");
  const overlay = document.getElementById("communications-overlay");
  const panel = document.getElementById("communications-panel");
  const closeButton = document.getElementById("communications-close");
  const video = document.getElementById("comms-video");

  if (!trigger || !overlay || !panel || !closeButton || !video) {
    console.error("ASTEROID : élément HTML manquant", {
      trigger, overlay, panel, closeButton, video
    });
    return;
  }

 function openCommunications() {
  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  trigger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";

  panel.focus();

  video.currentTime = 0;
  video.play();
}

function closeCommunications() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  trigger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";

  video.pause();
  video.currentTime = 0;

  trigger.focus();
}

  trigger.addEventListener("click", openCommunications);
  closeButton.addEventListener("click", closeCommunications);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeCommunications();
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      overlay.classList.contains("is-open")
    ) {
      closeCommunications();
    }
  });

  console.log("ASTEROID : communications initialisées");
});
