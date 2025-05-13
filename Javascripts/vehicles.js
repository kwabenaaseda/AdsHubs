const adData = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/McDonald%27s_logo.svg",
        name: "McDonald's: I'm Lovin' It",
        link: "https://www.mcdonalds.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Starbucks_Corporation_Logo_2011.svg",
        name: "Starbucks: Inspire and Nurture the Human Spirit",
        link: "https://www.starbucks.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Subway_2016_logo.svg",
        name: "Subway: Eat Fresh",
        link: "https://www.subway.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/KFC_logo.svg",
        name: "KFC: Finger Lickin' Good",
        link: "https://www.kfc.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Burger_King_2021.svg",
        name: "Burger King: Have It Your Way",
        link: "https://www.burgerking.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Pizza_Hut_logo.svg",
        name: "Pizza Hut: No One OutPizzas the Hut",
        link: "https://www.pizzahut.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dominos_pizza_logo.svg",
        name: "Domino's: Oh Yes We Did",
        link: "https://www.dominos.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Taco_Bell_2016_logo.svg",
        name: "Taco Bell: Live Más",
        link: "https://www.tacobell.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Dunkin%27_logo.svg",
        name: "Dunkin': America Runs on Dunkin'",
        link: "https://www.dunkindonuts.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Chick-fil-A_Logo.svg",
        name: "Chick-fil-A: We Didn't Invent the Chicken, Just the Chicken Sandwich",
        link: "https://www.chick-fil-a.com/"
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
