/* =========================================================
   AKUR FAMILY - PREMIUM APP
   Slideshow + 21 Photo Gallery + Lightbox
========================================================= */

(function () {

  /* =========================
     SLIDESHOW
  ========================= */

  const slideshowImages = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg'
  ];

  const slideshow = document.getElementById('slideshow');
  let slides = [];

  if (slideshow) {

    slideshowImages.forEach((src, i) => {

      const div = document.createElement('div');

      div.className = 'slide';

      div.style.backgroundImage = `url("${src}")`;

      div.setAttribute('aria-label', `Foto keluarga ${i + 1}`);

      slideshow.appendChild(div);

      slides.push(div);

    });

  }

  let currentSlide = 0;

  function showSlide(index) {

    slides.forEach(slide => {
      slide.classList.remove('show');
    });

    if (slides[index]) {
      slides[index].classList.add('show');
    }

  }

  if (slides.length) {

    showSlide(0);

    setInterval(() => {

      currentSlide =
        (currentSlide + 1) % slides.length;

      showSlide(currentSlide);

    }, 4500);

  }


  /* =========================
     PREMIUM GALLERY
  ========================= */

  const galleryGrid =
    document.getElementById('galleryGrid');

  const galleryImages = [];

  for (let i = 1; i <= 21; i++) {
  if (i <= 13) {
    galleryImages.push(`images/photo${i}.jpg`);
  } else {
    galleryImages.push(`images/photo${i}.jpeg`);
  }
}


  if (galleryGrid) {

    galleryGrid.innerHTML = '';

    galleryImages.forEach((src, index) => {

      const item =
        document.createElement('div');

      item.className = 'gallery-item';

      item.dataset.index = index;

      item.innerHTML = `

        <img
          src="${src}"
          alt="Momen AKUR FAMILY ${index + 1}"
          loading="lazy"
        >

        <div class="gallery-overlay">

          <span class="photo-number">
            ${String(index + 1).padStart(2, '0')}
          </span>

          <span class="view-photo">
            ⌕
          </span>

        </div>

      `;

      galleryGrid.appendChild(item);

      /* Efek ketika gambar selesai loading */

      const img =
        item.querySelector('img');

      img.addEventListener('load', () => {
        item.classList.add('loaded');
      });

      /* Jika gambar gagal */

      img.addEventListener('error', () => {

        item.classList.add('image-error');

        img.alt =
          `Foto ${index + 1} tidak ditemukan`;

      });

      /* Klik foto */

      item.addEventListener('click', () => {

        openLightbox(index);

      });

    });

  }


  /* =========================
     LIGHTBOX
  ========================= */

  let lightbox =
    document.getElementById('familyLightbox');

  if (!lightbox) {

    lightbox =
      document.createElement('div');

    lightbox.id =
      'familyLightbox';

    lightbox.innerHTML = `

      <div class="lightbox-backdrop"></div>

      <div class="lightbox-content">

        <button
          class="lightbox-close"
          aria-label="Tutup"
        >
          ×
        </button>

        <button
          class="lightbox-prev"
          aria-label="Foto sebelumnya"
        >
          ‹
        </button>

        <div class="lightbox-image-wrap">

          <img
            class="lightbox-image"
            src=""
            alt=""
          >

          <div class="lightbox-caption">

            <span class="lightbox-counter">
              01 / 21
            </span>

            <span class="lightbox-title">
              Momen AKUR FAMILY
            </span>

          </div>

        </div>

        <button
          class="lightbox-next"
          aria-label="Foto berikutnya"
        >
          ›
        </button>

      </div>

    `;

    document.body.appendChild(lightbox);

  }


  let lightboxIndex = 0;

  const lightboxImage =
    lightbox.querySelector('.lightbox-image');

  const counter =
    lightbox.querySelector('.lightbox-counter');


  function updateLightbox() {

    const src =
      galleryImages[lightboxIndex];

    lightboxImage.style.opacity = '0';

    setTimeout(() => {

      lightboxImage.src = src;

      lightboxImage.alt =
        `Momen AKUR FAMILY ${lightboxIndex + 1}`;

      counter.textContent =
        `${String(lightboxIndex + 1).padStart(2, '0')} / 21`;

      lightboxImage.onload = () => {

        lightboxImage.style.opacity = '1';

      };

    }, 120);

  }


  function openLightbox(index) {

    lightboxIndex = index;

    updateLightbox();

    lightbox.classList.add('active');

    document.body.classList.add('lightbox-open');

  }


  function closeLightbox() {

    lightbox.classList.remove('active');

    document.body.classList.remove('lightbox-open');

  }


  function nextPhoto() {

    lightboxIndex =
      (lightboxIndex + 1) %
      galleryImages.length;

    updateLightbox();

  }


  function previousPhoto() {

    lightboxIndex =
      (lightboxIndex - 1 +
        galleryImages.length) %
      galleryImages.length;

    updateLightbox();

  }


  lightbox
    .querySelector('.lightbox-close')
    .addEventListener('click', closeLightbox);

  lightbox
    .querySelector('.lightbox-next')
    .addEventListener('click', nextPhoto);

  lightbox
    .querySelector('.lightbox-prev')
    .addEventListener('click', previousPhoto);

  lightbox
    .querySelector('.lightbox-backdrop')
    .addEventListener('click', closeLightbox);


  /* Keyboard */

  document.addEventListener('keydown', event => {

    if (!lightbox.classList.contains('active')) {
      return;
    }

    if (event.key === 'Escape') {
      closeLightbox();
    }

    if (event.key === 'ArrowRight') {
      nextPhoto();
    }

    if (event.key === 'ArrowLeft') {
      previousPhoto();
    }

  });


  /* =========================
     AUDIO
  ========================= */

  const audio =
    document.getElementById('bgAudio');

  const playBtn =
    document.getElementById('playBtn');

  const pauseBtn =
    document.getElementById('pauseBtn');


  function tryPlayAudio() {

    if (!audio) return;

    audio.volume = 0.18;

    audio.play().catch(() => {

      if (playBtn) {
        playBtn.style.display =
          'inline-block';
      }

    });

  }


  document.addEventListener(
    'DOMContentLoaded',
    () => {

      tryPlayAudio();

      if (playBtn) {

        playBtn.addEventListener(
          'click',
          () => {

            audio.play();

          }
        );

      }

      if (pauseBtn) {

        pauseBtn.addEventListener(
          'click',
          () => {

            audio.pause();

          }
        );

      }

    }
  );


  /* =========================
     SCROLL REVEAL
  ========================= */

  const revealElements =
    document.querySelectorAll(
      '.card, .gallery-item, .section h2'
    );


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              'reveal-visible'
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.08
      }
    );


  revealElements.forEach(element => {

    element.classList.add(
      'reveal-element'
    );

    observer.observe(element);

  });


})();