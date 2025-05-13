const adData = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg",
        name: "Netflix: See What's Next",
        link: "https://www.netflix.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
        name: "Disney+: The Best Stories in One Place",
        link: "https://www.disneyplus.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/HBO_Max_Logo.svg",
        name: "HBO Max: It's All Here",
        link: "https://www.hbomax.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Hulu_Logo.svg",
        name: "Hulu: Come TV With Us",
        link: "https://www.hulu.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Prime_Video_logo.svg",
        name: "Amazon Prime Video: Watch More. Pay Less.",
        link: "https://www.primevideo.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/YouTube_Logo.svg",
        name: "YouTube: Broadcast Yourself",
        link: "https://www.youtube.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Spotify_logo_with_text.svg",
        name: "Spotify: Music for Everyone",
        link: "https://www.spotify.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Apple_Music_logo.svg",
        name: "Apple Music: All the Ways You Love Music. All in One Place.",
        link: "https://www.apple.com/apple-music/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Pandora_logo.svg",
        name: "Pandora: Personalized Music",
        link: "https://www.pandora.com/"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/SoundCloud_logo.svg",
        name: "SoundCloud: What's Next in Music is First on SoundCloud",
        link: "https://www.soundcloud.com/"
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
