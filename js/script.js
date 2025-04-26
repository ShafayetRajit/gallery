const galleryImgs = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const exifData = document.getElementById('exifData');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  const img = galleryImgs[index];

  const fullImageSrc = img.getAttribute('data-full') || img.src;

  lightboxImg.classList.remove('fade-out'); // Remove exit class if it exists
  lightboxImg.src = fullImageSrc;
  lightbox.style.display = 'flex';

  // Delay adding .show to trigger animation
  requestAnimationFrame(() => {
    lightbox.classList.add('show');
  });

  loadExifData(fullImageSrc); // ✅ Load EXIF from full JPG, not the webp
}

  

function loadExifData(imgSrc) {
    exifData.textContent = "Loading EXIF data...";
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imgSrc, true);
    xhr.responseType = 'blob';
  
    xhr.onload = function () {
      if (this.status === 200) {
        const blob = this.response;
        const img = new Image();
        img.onload = function () {
          EXIF.getData(img, function () {
            const make = EXIF.getTag(this, 'Make') || 'Unknown';
            const model = EXIF.getTag(this, 'Model') || 'Unknown';
            const date = EXIF.getTag(this, 'DateTimeDigitized') || 'Unknown';
            const exposure = EXIF.getTag(this, 'ExposureTime') || 'Unknown';
            const iso = EXIF.getTag(this, 'ISOSpeedRatings') || 'Unknown';
  
            exifData.innerHTML = `
            <i class="fas fa-camera-retro"></i> ${model}
            &nbsp;&nbsp; <i class="fa fa-clock"></i> ${exposure}
            &nbsp;&nbsp; <i class="fa fa-bolt"></i> ${iso}
            &nbsp;&nbsp; <i class="fa fa-calendar"></i> ${date}
            `;
          });
        };
        img.src = URL.createObjectURL(blob);
      } else {
        exifData.textContent = "Failed to load image for EXIF data.";
      }
    };
  
    xhr.onerror = function () {
      exifData.textContent = "Error loading image.";
    };
  
    xhr.send();
  }
  

galleryImgs.forEach((img, index) => {
  img.addEventListener('click', () => showLightbox(index));
});

// closeBtn.onclick = () => lightbox.style.display = 'none';


const aboutBtn = document.getElementById('aboutBtn');
const aboutOverlay = document.getElementById('aboutOverlay');
const aboutBackdrop = document.getElementById('aboutBackdrop');

aboutBtn.addEventListener('click', () => {
  aboutOverlay.classList.toggle('active');
});

aboutBackdrop.addEventListener('click', () => {
  aboutOverlay.classList.remove('active');
});

document.getElementById('prev').addEventListener('click', (e) => {
    e.stopPropagation();
    transitionToImage((currentIndex - 1 + galleryImgs.length) % galleryImgs.length);
  });
  
  document.getElementById('next').addEventListener('click', (e) => {
    e.stopPropagation();
    transitionToImage((currentIndex + 1) % galleryImgs.length);
  });
  
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
  
    // Delay actual hiding so the animation plays
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 400);
});

function transitionToImage(newIndex) {
  lightboxImg.classList.add('fade-out');

  setTimeout(() => {
      currentIndex = newIndex;
      const img = galleryImgs[currentIndex];

      const fullImageSrc = img.getAttribute('data-full') || img.src;

      lightboxImg.src = fullImageSrc;

      lightboxImg.onload = () => {
          lightboxImg.classList.remove('fade-out');
          loadExifData(fullImageSrc); // ✅ Again, load EXIF from JPG
      };
  }, 200); // Matches fade-out duration
}

// ✅ Preload all full-size images (the JPGs) after page loads
window.addEventListener('load', () => {
  galleryImgs.forEach(img => {
    const fullImageSrc = img.getAttribute('data-full');
    if (fullImageSrc) {
      const preloadImg = new Image();
      preloadImg.src = fullImageSrc;
    }
  });
});

document.getElementById('current-year').textContent = new Date().getFullYear();



  const greetingPhrases = [
    "Oh, you came unannounced! <br> Let me just finish tidying the gallery...<br><br>While we get things ready, enjoy these tidbits!",
    "Look who dropped by without warning! <br> One sec...sweeping up some stray snapshots!<br><br>While we get things ready, enjoy these tidbits!",
    "A surprise guest! Just a moment. <br> I'm straightening the frames and dusting the pixels.<br><br>While we get things ready, enjoy these tidbits!",
    "You snuck in quietly, huh? <br> Just adjusting the light and shadows...won't be long!<br><br>While we get things ready, enjoy these tidbits!",
    "Whoa, unexpected company! <br> Getting the gallery dressed up for you. Patience, please!<br><br>While we get things ready, enjoy these tidbits!",
    "An unannounced visit! I love it! <br> The memories are combing their hair, preparing for you!<br><br>While we get things ready, enjoy these tidbits!",
    "Pardon the mess. I didn't know you'd pop in! <br> Still fluffing the clouds and sunsets. Almost done!<br><br>While we get things ready, enjoy these tidbits!",
    "You came early! Let me tidy up quickly.<br><br>While we get things ready, enjoy these tidbits!"
  ];

  const photoFacts = [
    "The first color photograph was taken in 1861 by James Clerk Maxwell.",
    "The word 'photography' means 'drawing with light' in Greek.",
    "The oldest surviving photograph is from 1826 — it took 8 hours to expose!",
    "The most expensive photograph ever sold is worth $4.3 million.",
    "Digital cameras were invented long before smartphones — in the 1970s!",
    "Kodak built the first digital camera prototype in 1975 — it was huge!",
    "Early cameras needed several minutes of exposure time for a single photo.",
    "Today, more pictures are taken every two minutes than in all of the 19th century."
  ];

  // Pick random greeting and message
  const randomGreeting = greetingPhrases[Math.floor(Math.random() * greetingPhrases.length)];

  // Set it inside the loading-text div
  document.getElementById('loading-text').innerHTML = randomGreeting;

    // Function to show a random photography fact
    function showRandomFact() {
      const randomFact = photoFacts[Math.floor(Math.random() * photoFacts.length)];
      document.getElementById('photo-fact').textContent = randomFact;
    }
  
    // Show first fact immediately
    showRandomFact();
  
    // Update the fact every 10 seconds
    const factInterval = setInterval(showRandomFact, 10000);
  
    // When page is fully loaded
    window.addEventListener('load', function() {
      document.getElementById('loading-screen').style.display = 'none';
      clearInterval(factInterval); // Stop changing facts after loading
    });


  

