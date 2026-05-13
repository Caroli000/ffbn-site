<template>
  <div class="blog-section">
    
    <section class="blog-hero">
      <div class="container">
        <h1>{{ $t('blog.title') || 'Blog FFBN' }}</h1>
        <p>{{ $t('blog.description') || 'Découvrez nos articles sur l\'association, les actions, et les témoignages' }}</p>
      </div>
    </section>

<section class="blog-controls">
      <div class="container">
        <div class="search-bar">
          <input 
            v-model="searchQuery"
            type="text"
            :placeholder="$t('blog.search') || 'Rechercher...'"
            @input="performSearch"
            class="search-input"
          >
          <button @click="clearSearch" v-if="searchQuery" class="search-clear">✕</button>
        </div>

        <div class="filters">
          <button 
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = selectedCategory === cat ? null : cat"
            :class="['filter-btn', { active: selectedCategory === cat }]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </section>

<section v-if="searchQuery && searchResults.length > 0" class="search-results">
      <div class="container">
        <h2>{{ searchResults.length }} {{ $t('blog.results') || 'résultats trouvés' }}</h2>
        <div class="articles-grid">
          <article-card 
            v-for="article in searchResults"
            :key="article.id"
            :article="article"
          />
        </div>
      </div>
    </section>

<section v-if="searchQuery && searchResults.length === 0" class="no-results">
      <div class="container">
        <p>{{ $t('blog.noResults') || 'Aucun article trouvé pour votre recherche' }}</p>
      </div>
    </section>

<section v-if="!searchQuery || searchResults.length === 0" class="blog-articles">
      <div class="container">
        <div v-if="loading" class="loading">
          <p>{{ $t('blog.loading') || 'Chargement...' }}</p>
        </div>

        <div v-else-if="filteredArticles.length > 0">
          
          <div class="featured-article">
            <article-card 
              :article="filteredArticles[0]"
              :featured="true"
            />
          </div>

<div class="articles-grid">
            <article-card 
              v-for="article in filteredArticles.slice(1)"
              :key="article.id"
              :article="article"
            />
          </div>
        </div>

        <div v-else class="no-articles">
          <p>{{ $t('blog.noArticles') || 'Aucun article pour cette catégorie' }}</p>
        </div>
      </div>
    </section>

<section class="blog-cta">
      <div class="container">
        <h2>{{ $t('blog.cta') || 'Besoin d\'aide?' }}</h2>
        <p>{{ $t('blog.ctaText') || 'Contactez-nous pour plus d\'informations' }}</p>
        <RouterLink to="/contact" class="btn btn-primary">
          {{ $t('blog.contact') || 'Nous Contacter' }}
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ArticleCard from './ArticleCard.vue';

const router = useRouter();
const articles = ref([]);
const categories = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const searchResults = ref([]);
const selectedCategory = ref(null);

const filteredArticles = computed(() => {
  let filtered = articles.value;

  if (selectedCategory.value) {
    filtered = filtered.filter(a => a.category === selectedCategory.value);
  }

  return filtered;
});

const fetchArticles = async () => {
  try {
    loading.value = true;
    const response = await fetch('/api/blog');
    const data = await response.json();
    articles.value = data.articles || [];
  } catch (err) {
    console.error('Error fetching articles:', err);
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch('/api/blog/categories');
    const data = await response.json();
    categories.value = data.categories || [];
  } catch (err) {
    console.error('Error fetching categories:', err);
  }
};

const performSearch = async () => {
  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }

  try {
    const response = await fetch(`/api/blog/search?q=${encodeURIComponent(searchQuery.value)}`);
    const data = await response.json();
    searchResults.value = data.articles || [];
  } catch (err) {
    console.error('Error searching articles:', err);
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  searchResults.value = [];
};

onMounted(() => {
  fetchArticles();
  fetchCategories();
});
</script>

<style scoped lang="css">
.blog-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 40px 0;
}

.blog-hero {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
  margin-bottom: 40px;
}

.blog-hero h1 {
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.blog-hero p {
  font-size: 1.2em;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.blog-controls {
  background: white;
  padding: 30px 0;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 12px 40px 12px 16px;
  font-size: 1em;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #999;
  transition: color 0.3s ease;
}

.search-clear:hover {
  color: #3b82f6;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.featured-article {
  margin-bottom: 50px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.loading,
.no-articles,
.no-results,
.search-results {
  text-align: center;
  padding: 40px 20px;
}

.loading p,
.no-articles p,
.no-results p {
  font-size: 1.1em;
  color: #666;
}

.blog-cta {
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.blog-cta h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.blog-cta p {
  font-size: 1.1em;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 30px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  border: none;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: white;
  color: #1e3a8a;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 20%;
  height: 200%;
  background: rgba(30, 58, 138, 0.05);
  transform: rotate(30deg);
  pointer-events: none;
}

.btn:hover::after {
  left: 120%;
  transition: all 0.6s ease;
}

@media (max-width: 768px) {
  .blog-hero h1 {
    font-size: 2em;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    justify-content: center;
  }
}
</style>
