<script setup>
import { computed } from 'vue'
import MenuItem from './MenuItem.vue'
import { useMenuStore } from '../stores/menuStore'

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  nextCategoryName: {
    type: String,
    default: '',
  },
})

const store = useMenuStore()
const emit = defineEmits(['nav'])
const categoryImage = props.category?.image ?? store.categoryImages[props.index] ?? null
const pageNumber = `${String(props.index + 1).padStart(2, '0')} / ${String(props.total).padStart(2, '0')}`
const prevPage = props.index === 0 ? 0 : props.index
const nextPage = props.index === props.total - 1 ? props.total : props.index + 2
const heroStyle = computed(() => ({
  backgroundImage: categoryImage ? `url("${categoryImage}")` : undefined,
}))
</script>

<template>
  <section class="page" :id="`cat-${index}`" :aria-label="category.name">
    <div class="category">
      <div class="hero" :class="{ 'has-image': !!categoryImage }" :style="heroStyle">
        <div v-if="categoryImage" class="shade" aria-hidden="true"></div>

        <button
          class="hero-btn prev"
          type="button"
          :disabled="index === 0"
          aria-label="Önceki kategori"
          @click="emit('nav', prevPage)"
        >
          ‹
        </button>

        <div class="hero-content">
          <p class="orn" aria-hidden="true">❧</p>
          <h1 class="hero-title">{{ category.name }}</h1>
          <p v-if="category.sub" class="hero-sub">{{ category.sub }}</p>
        </div>

        <div class="hero-number">{{ pageNumber }}</div>

        <button
          class="hero-btn next"
          type="button"
          :disabled="index === total - 1"
          aria-label="Sonraki kategori"
          @click="emit('nav', nextPage)"
        >
          ›
        </button>
      </div>

      <div class="menu">
        <div class="items">
          <MenuItem v-for="item in category.items" :key="item.n" :item="item" />
        </div>
      </div>

      <div class="end">
        <template v-if="index < total - 1">
          Sonraki kategori: <strong>{{ nextCategoryName || 'Sonraki' }}</strong> · sağa kaydır
        </template>
        <template v-else>
          Menünün sonu · <strong>Dükkan Çanakkale</strong>
        </template>
      </div>
    </div>
  </section>
</template>
