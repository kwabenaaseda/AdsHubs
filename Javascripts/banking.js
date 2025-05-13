const adData = [
    {
        image: "https://1000logos.net/wp-content/uploads/2017/06/JPMorgan-Chase-Logo.png",
        name: "JPMorgan Chase: The Right Relationship is Everything",
        link: "https://www.jpmorganchase.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/Bank-of-America-Logo.png",
        name: "Bank of America: Life's Better When We're Connected",
        link: "https://www.bankofamerica.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/Wells-Fargo-Logo.png",
        name: "Wells Fargo: Together We'll Go Far",
        link: "https://www.wellsfargo.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/Citigroup-Logo.png",
        name: "Citigroup: Citi Never Sleeps",
        link: "https://www.citigroup.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/Goldman-Sachs-Logo.png",
        name: "Goldman Sachs: Our Clients' Interests Always Come First",
        link: "https://www.goldmansachs.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/Morgan-Stanley-Logo.png",
        name: "Morgan Stanley: Capital Creates Change",
        link: "https://www.morganstanley.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/HSBC-Logo.png",
        name: "HSBC: The World's Local Bank",
        link: "https://www.hsbc.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/Barclays-Logo.png",
        name: "Barclays: Fluent in Finance",
        link: "https://www.barclays.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/UBS-Logo.png",
        name: "UBS: For Some of Life's Questions",
        link: "https://www.ubs.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/06/Deutsche-Bank-Logo.png",
        name: "Deutsche Bank: Passion to Perform",
        link: "https://www.db.com/"
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
