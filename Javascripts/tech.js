const adData = [
    {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Apple-Logo.png",
        name: "Apple: Think Different",
        link: "https://www.apple.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Microsoft-Logo.png",
        name: "Microsoft: Empowering Us All",
        link: "https://www.microsoft.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Google-Logo.png",
        name: "Google: Organize the World's Information",
        link: "https://www.google.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Amazon-Logo.png",
        name: "Amazon: Work Hard. Have Fun. Make History.",
        link: "https://www.amazon.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Facebook-Logo.png",
        name: "Meta (Facebook): Bringing the World Closer Together",
        link: "https://about.facebook.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Tesla-Logo.png",
        name: "Tesla: Accelerating the World's Transition to Sustainable Energy",
        link: "https://www.tesla.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Nvidia-Logo.png",
        name: "NVIDIA: The Way It's Meant to Be Played",
        link: "https://www.nvidia.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Samsung-Logo.png",
        name: "Samsung: Inspire the World, Create the Future",
        link: "https://www.samsung.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/Intel-Logo.png",
        name: "Intel: Experience What's Inside",
        link: "https://www.intel.com/"
      },
      {
        image: "https://1000logos.net/wp-content/uploads/2017/03/IBM-Logo.png",
        name: "IBM: Think",
        link: "https://www.ibm.com/"
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
