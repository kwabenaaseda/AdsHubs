const adData = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Chanel_logo_interlocking_cs.svg",
        name: "Chanel: Elegance in Simplicity",
        link: "https://www.chanel.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/L%27Or%C3%A9al_logo.svg",
        name: "L'Oréal: Because You're Worth It",
        link: "https://www.loreal.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Est%C3%A9e_Lauder_Companies_logo.svg",
        name: "Estée Lauder: Bringing the Best to Everyone We Touch",
        link: "https://www.esteelauder.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Maybelline_logo.svg",
        name: "Maybelline: Maybe She's Born With It. Maybe It's Maybelline.",
        link: "https://www.maybelline.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Clinique_logo.svg",
        name: "Clinique: Allergy Tested. 100% Fragrance Free.",
        link: "https://www.clinique.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Nivea_logo.svg",
        name: "Nivea: Care for Skin – Care for Life",
        link: "https://www.nivea.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Dove_logo.svg",
        name: "Dove: Real Beauty",
        link: "https://www.dove.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Avon_logo.svg",
        name: "Avon: The Company for Women",
        link: "https://www.avon.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sephora_logo.svg",
        name: "Sephora: Endless Ways to Be You",
        link: "https://www.sephora.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Neutrogena_logo.svg",
        name: "Neutrogena: Healthy Skin Starts Here",
        link: "https://www.neutrogena.com/"
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
