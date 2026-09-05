/* App JS: slideshow, gallery upload, audio control, localstorage */
(function(){
  const images = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg'
  ];

  // build slideshow
  const slideshow = document.getElementById('slideshow');
  let slides = [];
  images.forEach((src,i)=>{
    const div = document.createElement('div');
    div.className='slide';
    div.style.backgroundImage = `url(${src})`;
    slideshow.appendChild(div);
    slides.push(div);
  });

  let cur = 0;
  function show(idx){
    slides.forEach(s=>s.classList.remove('show'));
    if(slides[idx]) slides[idx].classList.add('show');
  }
  if(slides.length){
    show(0);
    setInterval(()=>{ cur = (cur+1)%slides.length; show(cur); }, 4000);
  } else {
    slideshow.innerHTML = '<div class="slide show" style="background:linear-gradient(135deg,#3a2b18,#1b150f);"></div>';
  }

  // gallery grid (6 items)
  const galleryGrid = document.getElementById('galleryGrid');
  for(let i=0;i<6;i++){
    const d = document.createElement('div');
    d.className='gallery-item';
    const key = 'akimg'+i;
    const saved = localStorage.getItem(key);
    if(saved) d.style.backgroundImage = `url(${saved})`;
    galleryGrid.appendChild(d);

    d.addEventListener('click', ()=>{
      const inp = document.createElement('input'); inp.type='file'; inp.accept='image/*';
      inp.onchange = ()=>{
        const f = inp.files[0]; if(!f) return;
        const r = new FileReader();
        r.onload = ()=>{ d.style.backgroundImage = `url(${r.result})`; localStorage.setItem(key, r.result); }; r.readAsDataURL(f);
      };
      inp.click();
    });
  }

  // audio control + autoplay attempt
  const audio = document.getElementById('bgAudio');
  const playBtn = document.getElementById('playBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  function tryPlay(){ audio.volume = 0.18; audio.play().catch(()=>{ playBtn.style.display='inline-block'; }); }
  document.addEventListener('DOMContentLoaded', ()=>{ tryPlay(); playBtn.addEventListener('click', ()=>{ audio.play(); }); pauseBtn.addEventListener('click', ()=>{ audio.pause(); }); });
})();