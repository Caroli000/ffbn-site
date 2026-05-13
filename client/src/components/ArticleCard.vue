<template>
  <div :class="['article-card', { featured }]">
    
    <div class="article-image">
      <img 
        :src="article.image" 
        :alt="article.title"
        loading="lazy"
      >
      <span class="category-badge">{{ article.category }}</span>
    </div>

<div class="article-content">
      
      <div class="article-meta">
        <span class="date">{{ formatDate(article.date) }}</span>
        <span class="reading-time">{{ article.readingTime }} min</span>
      </div>

<h3 class="article-title">{{ article.title }}</h3>

<p class="article-description">{{ article.metaDescription }}</p>

<div class="article-tags">
        <span 
          v-for="keyword in article.keywords"
          :key="keyword"
          class="tag"
        >
          #{{ keyword }}
        </span>
      </div>

<div class="article-footer">
        <span class="author">Par {{ article.author }}</span>
        <RouterLink 
          :to="`/blog/${article.slug}`"
          class="read-more"
        >
          Lire l'article →
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

defineProps({
  article: {
    type: Object,
    required: true,
    properties: {
      id: Number,
      slug: String,
      title: String,
      metaDescription: String,
      author: String,
      date: String,
      category: String,
      image: String,
      readingTime: Number,
      keywords: Array
    }
  },
  featured: {
    type: Boolean,
    default: false
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped lang="css">
.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.article-card.featured {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-height: 400px;
}

.article-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, #e5e7eb, #f3f4f6);
}

.article-card.featured .article-image {
  height: 100%;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(59, 130, 246, 0.9);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
}

.article-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 0.9em;
  color: #999;
}

.article-title {
  font-size: 1.3em;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1e3a8a;
  line-height: 1.4;
}

.article-card.featured .article-title {
  font-size: 1.8em;
}

.article-description {
  color: #666;
  margin-bottom: 16px;
  line-height: 1.6;
  flex-grow: 1;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  background: #f3f4f6;
  color: #1e3a8a;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 500;
}

.article-card:hover .tag {
  background: #3b82f6;
  color: white;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.author {
  font-size: 0.9em;
  color: #999;
  font-style: italic;
}

.read-more {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.read-more:hover {
  color: #1e3a8a;
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .article-card.featured {
    grid-template-columns: 1fr;
    max-height: none;
  }

  .article-card.featured .article-image {
    height: 250px;
  }

  .article-title {
    font-size: 1.1em;
  }

  .article-card.featured .article-title {
    font-size: 1.5em;
  }
}
</style>
