const adData = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Yamaha_logo.svg",
        name: "Yamaha: Make Waves",
        link: "https://www.yamaha.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Roland_logo.svg",
        name: "Roland: Inspire the Enjoyment of Creativity",
        link: "https://www.roland.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Fender_logo.svg",
        name: "Fender: Make History",
        link: "https://www.fender.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Gibson_logo.svg",
        name: "Gibson: Only a Gibson is Good Enough",
        link: "https://www.gibson.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Marshall_Amplification_logo.svg",
        name: "Marshall: Live for Music",
        link: "https://www.marshall.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Bose_logo.svg",
        name: "Bose: Better Sound Through Research",
        link: "https://www.bose.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Shure_logo.svg",
        name: "Shure: Sound Extraordinary",
        link: "https://www.shure.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sennheiser_logo.svg",
        name: "Sennheiser: The Future of Audio",
        link: "https://www.sennheiser.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/AKG_logo.svg",
        name: "AKG: The Sound of Quality",
        link: "https://www.akg.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Beats_Electronics_logo.svg",
        name: "Beats by Dre: Hear What You Want",
        link: "https://www.beatsbydre.com/"
      }
];
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
  }


let currentIndex = 0;
const icon = document.getElementById("icon");
const iconName = document.getElementById("iconName");
const indicatorsContainer = document.getElementById("indicators");

// Fade-out function
function fadeOut(element, callback) {
    element.style.transition = "opacity 0.5s ease";
    element.style.opacity = 0;
    setTimeout(callback, 500);
}

// Fade-in function
function fadeIn(element) {
    element.style.transition = "opacity 0.5s ease";
    element.style.opacity = 1;
}

// Update the ad image and text
function updateAd(index) {
    const current = adData[index];

    fadeOut(icon, () => {
        icon.setAttribute("src", current.image);
        fadeIn(icon);
    });

    fadeOut(iconName, () => {
        iconName.textContent = current.name;
        iconName.setAttribute("href", current.link);
        fadeIn(iconName);
    });

    updateIndicators(index);
}

// Move to next ad
function nextAd() {
    currentIndex = (currentIndex + 1) % adData.length;
    updateAd(currentIndex);
}

// Move to previous ad
function prevAd() {
    currentIndex = (currentIndex - 1 + adData.length) % adData.length;
    updateAd(currentIndex);
}

// Next button functionality
document.getElementById("nextBtn").addEventListener("click", nextAd);

// Previous button functionality
document.getElementById("prevBtn").addEventListener("click", prevAd);

// Swipe support for touch devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const distance = touchEndX - touchStartX;
    if (distance > 50) {
        prevAd();
    } else if (distance < -50) {
        nextAd();
    }
}, false);

// Setup page indicators
function updateIndicators(index) {
    const dots = indicatorsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

// Create and display the indicators (dots)
function setupIndicators() {
    adData.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            currentIndex = i;
            updateAd(currentIndex);
        });
        indicatorsContainer.appendChild(dot);
    });
}

// Auto-play functionality
setInterval(nextAd, 10000);

// Initialize everything
setupIndicators();
updateAd(currentIndex);
