<template>
  <div class="discover-page" ref="pageRef">
    
    <section class="d-hero">
      
      <img src="/images/drum-motif.png" class="d-watermark-drum-hero rotate-slow" alt="Motif Tambour" />
      
      <div class="d-hero-content">
        <h1 class="huge-text-hero stagger-up">Solidarité.<br>Excellence.<br>Culture.</h1>
        <p class="subtitle-text-hero stagger-up delay-1">L'ADN du Burundi rayonnant dans la diaspora.</p>
        <div class="scroll-wrapper stagger-up delay-2">
          <div class="scroll-indicator">
            <span class="line"></span>
            <span class="text">Découvrez notre univers</span>
          </div>
        </div>
      </div>
    </section>

<section class="d-section d-mission">
      
      <div class="burundi-geometric-accents">
        <div class="accent circle fade-in-up delay-1"></div>
        <div class="accent triangle fade-in-up delay-2"></div>
      </div>
      
      <div class="container d-split">
        <div class="d-text-block fade-in-left position-relative">
          <span class="d-tag">Notre Mission</span>
          <h2>Élever <br>& Transmettre.</h2>
          <p>Nous sommes bien plus qu'une association ; nous sommes un pont entre deux cultures, une famille bâtie sur des valeurs intemporelles de solidarité et d'excellence. La FFBN rassemble les filles et fils du Burundi dans le Nord-Pas-de-Calais, mais notre rayonnement dépasse les frontières régionales.</p>
          <router-link to="/about" class="btn-discover">Découvrir notre histoire</router-link>
        </div>
        <div class="d-image-block fade-in-right">
          <div class="image-wrapper image-reveal position-relative">
            <img src="/images/discover/mission.webp" alt="Notre Mission" />
          </div>
        </div>
      </div>
    </section>

<section class="d-section d-poles">
      <div class="bg-shape"></div>
      <div class="container position-relative">
        <div class="section-title fade-in-up">
           <span class="d-tag">Actions Déterminantes</span>
           <h2>Nos Trois Piliers</h2>
        </div>
        <div class="d-grid-3">
           <div class="d-card fade-in-up">
             <div class="d-card-img image-reveal">
                 <img src="/images/discover/card1.jpg" alt="Académique">
                 
                 <div class="card-motif motif-stripes"></div>
             </div>
             <h3>Excellence Académique</h3>
             <p>Parce que la réussite se construit ensemble, par le tutorat et le soutien.</p>
           </div>
           <div class="d-card fade-in-up delay-1">
             <div class="d-card-img image-reveal">
                 <img src="/images/discover/card2.webp" alt="Social">
                 
                 <div class="card-motif motif-dots"></div>
             </div>
             <h3>Action Sociale</h3>
             <p>Une main tendue en permanence pour ne laisser personne en marge.</p>
           </div>
           <div class="d-card fade-in-up delay-2">
             <div class="d-card-img image-reveal">
                 <img src="/images/discover/card3.jpg" alt="Culture">
                 
                 <div class="card-motif motif-zigzag"></div>
             </div>
             <h3>Rayonnement Culturel</h3>
             <p>Le tambour battant de nos origines, offert et partagé au monde.</p>
           </div>
        </div>
      </div>
    </section>

<section class="d-asso-divider">
        <div class="parallax-bg d-asso-divider-bg" style="background-image: url('/images/about/about-history.jpg')" data-speed="0.2"></div>
        <div class="d-asso-overlay"></div>

<div class="floating-particles">
           <div class="particle p1"></div>
           <div class="particle p2"></div>
           <div class="particle p3"></div>
           <div class="particle p4"></div>
        </div>

        <div class="container text-center d-asso-content fade-in-up">
           <div class="d-glass-card">
               <h2 class="asso-title">UNE FAMILLE UNIE</h2>
               <div class="asso-line"></div>
               <p class="asso-sub">Au cœur de la FFBN, chaque membre compte. Ensemble, nous bâtissons un avenir plus solidaire et rayonnant.</p>
           </div>
        </div>
    </section>

<section class="d-section d-cta">
       
       <div class="hero-decorative-pattern" style="opacity: 0.1;"></div>
       <div class="container text-center position-relative">
         <div class="d-cta-content fade-in-up">
           <span class="d-tag">L'Aventure Commence Ici</span>
           <h2>Faites partie de l'histoire</h2>
           <p>Rejoignez un réseau solidaire et dynamique. Donnez du sens à votre engagement.</p>
           <div class="d-cta-buttons">
             <router-link to="/volunteer" class="btn-primary-d">Nous Rejoindre</router-link>
             <a href="https://www.helloasso.com/associations/ffbn" target="_blank" class="btn-outline-d">Soutenir Nos Actions</a>
           </div>
         </div>
       </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const pageRef = ref(null)
let ticking = false
let observer = null

const handleScroll = () => {
  const scrollPos = window.scrollY
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax(scrollPos)
      ticking = false
    })
    ticking = true
  }
}

const updateParallax = (scrolled) => {
  if (!pageRef.value) return

  const bgElements = pageRef.value.querySelectorAll('.parallax-bg')
  bgElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed') || '0.3')
    const yPos = scrolled * speed
    el.style.transform = `translate3d(0, ${yPos}px, 0)`
  })
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  if (pageRef.value) {
    const elementsToReveal = pageRef.value.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .image-reveal, .stagger-up'
    )
    elementsToReveal.forEach(el => observer.observe(el))
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;800;900&display=swap');

.discover-page {
  background: #ffffff;
  color: #1a1a1a;
  overflow-x: hidden;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.fade-in-up, .fade-in-left, .fade-in-right, .stagger-up {
  opacity: 0;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
}

.fade-in-up { transform: translateY(40px); }
.fade-in-left { transform: translateX(-40px); }
.fade-in-right { transform: translateX(40px); }
.stagger-up { transform: translateY(30px); }

.is-visible {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }

.image-reveal {
  position: relative;
  overflow: hidden;
  border-radius: inherit;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.image-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.image-reveal img {
  width: 100%;
  height: 100%; 
  object-fit: cover;
  display: block;
}

.d-hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: #f8f9fa;
  color: #1a1a1a;
}
.d-watermark-drum-hero {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 900px;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
  filter: grayscale(1);
  will-change: transform;
}
.d-hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  padding: 0 20px;
}
.d-hero-content h1.huge-text-hero {
  font-size: clamp(3.2rem, 8vw, 7.5rem);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -3px;
  background: linear-gradient(90deg, #37823a 0%, #76693a 50%, #ae3c2f 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}
.d-hero-content p.subtitle-text-hero {
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

.scroll-wrapper {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
.scroll-indicator .text {
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #666;
  opacity: 0.8;
}
.scroll-indicator .line {
  width: 1px;
  height: 60px;
  background: rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}
.scroll-indicator .line::after {
  content: '';
  position: absolute;
  top: -100%; left: 0; width: 100%; height: 100%;
  background: #1a1a1a;
  animation: scrollLine 1.5s infinite ease-in-out;
}
@keyframes scrollLine {
  0% { top: -100%; }
  100% { top: 100%; }
}

.d-section {
  padding: 180px 0;
  position: relative;
}

.d-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  align-items: center;
}
.burundi-geometric-accents {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}
.accent {
  position: absolute;
  border-width: 4px;
  border-style: solid;
}
.accent.circle {
  width: 200px; height: 200px;
  border-radius: 50%;
  border-color: rgba(24, 182, 57, 0.1);
  top: 10%; right: -50px;
}
.accent.triangle {
  width: 0; height: 0;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  border-bottom: 173px solid rgba(206, 17, 38, 0.05);
  border-top: none;
  border-radius: 0;
  left: -50px; bottom: 20%;
}
.d-tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--burundi-red);
  margin-bottom: 25px;
  position: relative;
  padding-left: 50px;
}
.d-tag::before {
  content: '';
  position: absolute;
  left: 0; top: 50%; width: 40px; height: 1.5px;
  background: var(--burundi-red);
}
.d-text-block h2 {
  font-size: clamp(2.5rem, 4vw, 4rem);
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 30px;
  color: #111;
  letter-spacing: -1px;
}
.d-text-block p {
  font-size: 1.15rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 40px;
}
.btn-discover {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #111;
  text-decoration: none;
  border-bottom: 2px solid var(--burundi-red);
  padding: 8px 0;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.3, 1);
}
.btn-discover:hover {
  color: var(--burundi-red);
  transform: translateX(10px);
}
.d-image-block .image-wrapper {
  border-radius: 8px; 
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
  height: 700px; 
}

.rotate-slow {
  animation: spinSlow 120s linear infinite;
}
@keyframes spinSlow {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.d-poles {
  position: relative;
  background: #fff;
  padding: 180px 0;
}
.bg-shape {
  position: absolute;
  top: 0; right: 0; width: 50%; height: 100%;
  background: #fdfdfd;
  z-index: 0;
}
.position-relative {
  position: relative;
  z-index: 2;
}
.section-title {
  text-align: center;
  margin-bottom: 100px;
}
.section-title h2 {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
}
.d-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
}
.d-card {
  text-align: left;
}
.d-card-img {
  height: 380px; 
  border-radius: 6px;
  margin-bottom: 30px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.06);
  position: relative;
  overflow: hidden;
}
.d-card-img img {
  width: 100%; height: 100%; object-fit: cover;
}

.card-motif {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 90px; height: 90px;
  z-index: 5;
  opacity: 0.8;
  border-top-left-radius: 20px;
}
.motif-stripes {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(206,17,38,0.9) 10px, rgba(206,17,38,0.9) 20px);
}
.motif-dots {
  background-image: radial-gradient(rgba(24,182,57,0.9) 20%, transparent 20%);
  background-size: 15px 15px;
}
.motif-zigzag {
  background: linear-gradient(135deg, rgba(206,17,38,0.9) 25%, transparent 25%) -25px 0, linear-gradient(225deg, rgba(206,17,38,0.9) 25%, transparent 25%) -25px 0, linear-gradient(315deg, rgba(206,17,38,0.9) 25%, transparent 25%), linear-gradient(45deg, rgba(206,17,38,0.9) 25%, transparent 25%);
  background-size: 20px 20px;
}

.d-card h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 15px;
  color: #111;
}
.d-card p {
  color: #666;
  font-size: 1.05rem;
  line-height: 1.6;
}

.d-asso-divider {
    position: relative;
    height: 60vh;
    min-height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}
.d-asso-divider-bg {
    position: absolute;
    top: -20%; left: 0; width: 100%; height: 140%;
    background-size: cover;
    background-position: center;
    z-index: 0;
}
.d-asso-overlay {
    position: absolute;
    top:0; left:0; width:100%; height:100%;
    
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
}
.d-asso-content {
    position: relative;
    z-index: 10;
    color: #fff;
    padding: 0 20px;
}
.d-glass-card {
    background: rgba(255, 255, 255, 0.05); 
    backdrop-filter: blur(15px); 
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.15); 
    border-radius: 24px;
    padding: 70px 40px;
    max-width: 850px;
    margin: 0 auto;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}
.asso-title {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 800;
    margin-bottom: 20px;
    letter-spacing: 2px; 
    text-transform: uppercase;
}
.asso-line {
    width: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--burundi-red), var(--burundi-green));
    margin: 0 auto 30px;
    border-radius: 2px;
    transition: width 1s ease-out;
}
.is-visible .asso-line {
    width: 100px;
}
.asso-sub {
    font-size: clamp(1.1rem, 2vw, 1.4rem);
    font-weight: 400;
    max-width: 700px;
    margin: 0 auto;
    text-shadow: 0 2px 5px rgba(0,0,0,0.3);
    line-height: 1.6;
}

.floating-particles {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 5;
    pointer-events: none;
    overflow: hidden;
}
.particle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    filter: blur(15px);
    will-change: transform;
    animation: floatAnim 25s ease-in-out infinite alternate;
}
.p1 { width: 150px; height: 150px; top: 10%; left: 5%; animation-delay: 0s; }
.p2 { width: 250px; height: 250px; top: 50%; right: 10%; animation-delay: -5s; background: rgba(206,17,38,0.15); }
.p3 { width: 120px; height: 120px; bottom: 5%; left: 25%; animation-delay: -8s; background: rgba(24,182,57,0.15); }
.p4 { width: 180px; height: 180px; top: -15%; right: 35%; animation-delay: -12s; }

@keyframes floatAnim {
    0% { transform: translateY(0); }
    100% { transform: translateY(-20px); }
}

.d-cta {
  background: #111;
  color: #fff;
  padding: 150px 0;
}
.d-cta-content {
  max-width: 800px;
  margin: 0 auto;
}
.d-cta-content h2 {
  font-size: clamp(2.5rem, 4.5vw, 4.5rem);
  font-weight: 800;
  margin-bottom: 20px;
}
.d-cta-content p {
  font-size: 1.3rem;
  color: #aaa;
  margin-bottom: 50px;
}
.d-cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary-d, .btn-outline-d {
  padding: 18px 45px;
  border-radius: 40px 15px 40px 15px; 
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.5s cubic-bezier(0.25, 1, 0.3, 1);
}
.btn-primary-d {
  background: var(--burundi-red);
  color: #fff;
  border: 2px solid var(--burundi-red);
  box-shadow: 0 10px 20px rgba(206, 17, 38, 0.2);
}
.btn-primary-d:hover {
  background: transparent;
  color: var(--burundi-red);
  transform: translateY(-5px) rotate(-1deg);
  border-radius: 15px 40px 15px 40px;
  box-shadow: 0 15px 30px rgba(206, 17, 38, 0.3);
}
.btn-outline-d {
  border: 2px solid #fff;
  color: #fff;
}
.btn-outline-d:hover {
  background: #fff;
  color: #111;
  transform: translateY(-5px) rotate(1deg);
  border-radius: 15px 40px 15px 40px;
}

@media (max-width: 992px) {
  .d-section { padding: 100px 0; }
  .d-split { gap: 60px; grid-template-columns: 1fr; }
  .d-grid-3 { grid-template-columns: 1fr; gap: 40px; }
  .d-image-block .image-wrapper { height: 500px; }
  .d-card-img { height: 350px; }
  .btn-primary-d, .btn-outline-d { width: 100%; padding: 15px; }
}

@media (max-width: 576px) {
  .d-section { padding: 80px 0; }
  .d-hero { min-height: 500px; }
  .d-image-block .image-wrapper { height: 350px; }
}
</style>
