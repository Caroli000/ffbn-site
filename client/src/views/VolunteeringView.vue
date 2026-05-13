<template>
  <div class="volunteer-page">
    <PageHero 
      :title="t('nav.volunteer')" 
      :subtitle="t('volunteer.subtitle')" 
    />

    <section class="volunteer-content reveal reveal-up" v-reveal>
      <div class="container">
        <div class="split">
          <div class="form-container">
            <h2>{{ t('volunteer.btnVolunteer') }}</h2>
            <p>Remplissez le formulaire pour nous rejoindre. Nous avons besoin de talents dans tous les domaines (communication, logistique, académique, etc.).</p>
            
            <form @submit.prevent="submitVolunteer" class="volunteer-form">
              <div class="form-group">
                <label>Nom complet</label>
                <input type="text" placeholder="Ex: Aimé Ndayishimiye" required />
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="Ex: aime@example.com" required />
              </div>
              <div class="form-group">
                <label>Pourquoi voulez-vous nous rejoindre ?</label>
                <textarea rows="4" placeholder="Dites-nous en plus sur vos motivations..."></textarea>
              </div>
              <button type="submit" class="btn-submit">Envoyer ma candidature</button>
            </form>
          </div>

          <div class="donate-info">
             <div class="donate-card">
               <div class="drum-icon">
                 <svg width="100" height="100" viewBox="0 0 100 100">
                    <path d="M20 30 L80 30 L70 90 L30 90 Z" fill="var(--burundi-red)" opacity="0.1" />
                    <path d="M20 30 L80 30 L70 90 L30 90 Z" fill="none" stroke="var(--burundi-red)" stroke-width="2" />
                    <circle cx="50" cy="90" r="10" fill="var(--burundi-green)" opacity="0.2" />
                 </svg>
               </div>
               <h3>Soutenir nos actions</h3>
               <p>Votre don permet de financer nos projets d'aide aux étudiants et l'organisation d'événements culturels.</p>
               <a href="https://www.helloasso.com/associations/ffbn" target="_blank" rel="noopener noreferrer" class="btn-donate">{{ t('volunteer.btnDonate') }}</a>
             </div>
             
             <div class="perks">
               <h4>Pourquoi devenir bénévole ?</h4>
               <ul>
                 <li><i class="fas fa-heart"></i> Impact social direct</li>
                 <li><i class="fas fa-users"></i> Réseau international</li>
                 <li><i class="fas fa-certificate"></i> Développement de compétences</li>
                 <li><i class="fas fa-laugh-beam"></i> Une ambiance fraternelle</li>
               </ul>
             </div>
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

const submitVolunteer = () => {
    alert('Merci ! Votre candidature a été envoyée. Nous vous contacterons bientôt.')
}
</script>

<style scoped>
.volunteer-content {
  padding: 80px 0;
}

.split {
  display: flex;
  gap: 80px;
}

.form-container {
  flex: 1.5;
}

.form-container h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.form-container p {
  color: #666;
  margin-bottom: 40px;
}

.volunteer-form {
  background: #f9f9f9;
  padding: 40px;
  border-radius: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 700;
  margin-bottom: 10px;
  color: #444;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-family: inherit;
}

.btn-submit {
  width: 100%;
  padding: 15px;
  background: var(--burundi-red);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.donate-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.donate-card {
  background: linear-gradient(135deg, white, #fff5f5);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: var(--shadow-soft);
  border: 1px solid #ffeded;
}

.drum-icon {
  margin-bottom: 20px;
  animation: float-subtle 6s ease-in-out infinite;
}

@keyframes float-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.btn-donate {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 30px;
  background: var(--burundi-green);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 700;
}

.perks {
  padding: 30px;
}

.perks h4 {
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.perks ul {
  list-style: none;
}

.perks li {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: #555;
  font-weight: 600;
}

.perks i {
  color: var(--burundi-red);
}

@media (max-width: 992px) {
  .split { flex-direction: column; }
}
</style>
