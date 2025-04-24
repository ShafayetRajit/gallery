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
  
    lightboxImg.classList.remove('fade-out'); // Remove exit class if it exists
    lightboxImg.src = img.src;
    lightbox.style.display = 'flex';
  
    // Delay adding .show to trigger animation
    requestAnimationFrame(() => {
      lightbox.classList.add('show');
    });
  
    loadExifData(img.src);
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
      lightboxImg.src = img.src;
  
      // Once new image is loaded, fade it in
      lightboxImg.onload = () => {
        lightboxImg.classList.remove('fade-out');
        loadExifData(img.src);
      };
    }, 200); // Matches fade-out duration
  }
  
  

