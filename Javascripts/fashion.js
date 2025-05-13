const adData = [
    {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Nike-Logo.png",
        name: "Nike: Just Do It",
        link: "https://www.nike.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Adidas-Logo.png",
        name: "Adidas: Impossible Is Nothing",
        link: "https://www.adidas.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Zara-Logo.png",
        name: "Zara: Fast Fashion for All",
        link: "https://www.zara.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/HM-Logo.png",
        name: "H&M: Fashion and Quality at the Best Price",
        link: "https://www.hm.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Uniqlo-Logo.png",
        name: "Uniqlo: Made for All",
        link: "https://www.uniqlo.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Gucci-Logo.png",
        name: "Gucci: Quality Is Remembered Long After Price Is Forgotten",
        link: "https://www.gucci.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Louis-Vuitton-Logo.png",
        name: "Louis Vuitton: L'Art de Vivre",
        link: "https://www.louisvuitton.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Levis-Logo.png",
        name: "Levi's: Quality Never Goes Out of Style",
        link: "https://www.levi.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Under-Armour-Logo.png",
        name: "Under Armour: Protect This House",
        link: "https://www.underarmour.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Ralph-Lauren-Logo.png",
        name: "Ralph Lauren: Defining Modern Luxury",
        link: "https://www.ralphlauren.com/"
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
