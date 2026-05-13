<template>
  <div class="actions-page">
    <PageHero 
      :title="t('nav.actions')" 
      :subtitle="t('actions.subtitle')" 
    />

    <section class="poles reveal reveal-up" v-reveal>
      <div class="container">
        <div class="pole-item academic">
          <div class="pole-content">
            <span class="tag">01</span>
            <h2>Pôle Académique</h2>
            <p>Nous facilitons l'accès aux ressources académiques, organisons des séances de tutorat et guidons les étudiants dans leurs démarches administratives. Notre objectif est la réussite de chacun.</p>
            <ul>
              <li><i class="fas fa-check"></i> Aide à l'inscription</li>
              <li><i class="fas fa-check"></i> Tutorat entre étudiants</li>
              <li><i class="fas fa-check"></i> Ateliers méthodologiques</li>
            </ul>
          </div>
          <div class="pole-image">
             <div class="motif-float circle"></div>
             <img src="/images/actions/academic.jpg" alt="Académique" />
          </div>
        </div>

        <div class="pole-item social reverse">
          <div class="pole-content">
            <span class="tag">02</span>
            <h2>Pôle Social & Intégration</h2>
            <p>Parce que s'installer dans un nouveau pays est un défi, nous créons des liens de solidarité pour rompre l'isolement et favoriser une intégration harmonieuse.</p>
            <ul>
              <li><i class="fas fa-check"></i> Accueil des nouveaux arrivants</li>
              <li><i class="fas fa-check"></i> Réseautage et entraide</li>
              <li><i class="fas fa-check"></i> Accompagnement logistique</li>
            </ul>
          </div>
          <div class="pole-image">
             <div class="motif-float square"></div>
             <img src="/images/actions/social.webp" alt="Social" />
          </div>
        </div>

        <div class="pole-item cultural">
          <div class="pole-content">
            <span class="tag">03</span>
            <h2>Pôle Culturel</h2>
            <p>Nous sommes les ambassadeurs de la culture burundaise. À travers nos événements, nous partageons la richesse de nos traditions avec le monde entier.</p>
            <ul>
              <li><i class="fas fa-check"></i> Spectacles de tambours</li>
              <li><i class="fas fa-check"></i> Cuisine traditionnelle</li>
              <li><i class="fas fa-check"></i> Débats et conférences</li>
            </ul>
          </div>
          <div class="pole-image">
             <div class="motif-float triangle"></div>
             <img src="/images/actions/cultural.jpg" alt="Culturel" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'

const { t } = useI18n()
</script>

<style scoped>
.poles {
  padding: 100px 0;
}

.pole-item {
  display: flex;
  align-items: center;
  gap: 80px;
  margin-bottom: 150px;
}

.pole-item.reverse {
  flex-direction: row-reverse;
}

.pole-item:last-child {
  margin-bottom: 0;
}

.pole-content {
  flex: 1;
}

.tag {
  font-size: 3rem;
  font-weight: 900;
  color: rgba(0,0,0,0.05);
  line-height: 1;
  display: block;
}

.pole-content h2 {
  font-size: 2.5rem;
  margin-bottom: 25px;
  color: #222;
}

.pole-content p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.7;
}

.pole-content ul {
  list-style: none;
}

.pole-content li {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: 600;
  color: #444;
}

.pole-content i {
  color: var(--burundi-green);
}

.pole-image {
  flex: 1;
  position: relative;
}

.pole-image img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 30px;
  box-shadow: var(--shadow-medium);
  z-index: 2;
  position: relative;
}

.motif-float {
  position: absolute;
  z-index: 1;
  opacity: 0.3;
  color: var(--burundi-red);
}

.circle {
  top: -30px;
  left: -30px;
  width: 100px;
  height: 100px;
  border: 15px solid currentColor;
  border-radius: 50%;
}

.square {
  bottom: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  border: 15px solid var(--burundi-green);
}

.triangle {
  top: -30px;
  right: -30px;
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: 100px solid currentColor;
}

@media (max-width: 992px) {
  .pole-item, .pole-item.reverse { flex-direction: column; text-align: center; gap: 40px; }
  .pole-content li { justify-content: center; }
  .pole-image img { height: 300px; }
}
</style>
