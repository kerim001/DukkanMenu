<script setup>
import { ref } from 'vue'
import { useMenuStore } from './stores/menuStore'
import { useNavigation } from './composables/useNavigation'
import CategoryPage from './components/CategoryPage.vue'

const store = useMenuStore()
const trackRef = ref(null)
const { goToPage } = useNavigation(trackRef, store)
</script>

<template>
  <div>
    <header class="header">
      <div class="brand">
        <div class="hamb" aria-hidden="true"><span></span><span></span><span></span></div>
        <img class="logo" src="/dukkan-logo-transparent.png" alt="Dükkan - Your Daily Escape" loading="lazy" />
        <div class="leaf" aria-hidden="true"></div>
      </div>

      <nav class="tabs" aria-label="Menü kategorileri">
        <button
          v-for="(category, index) in store.menu"
          :key="category.name"
          type="button"
          class="tab"
          :class="{ active: store.activePage === index + 1 }"
          :aria-current="store.activePage === index + 1 ? 'page' : 'false'"
          @click="goToPage(index + 1)"
        >
          {{ category.name }}
        </button>
      </nav>
    </header>

    <main ref="trackRef" class="track" role="region" aria-label="Menü içeriği">
      <section class="page cover" aria-label="Kapak sayfası">
        <div>
          <img class="cover-logo" src="/dukkan-logo-transparent.png" alt="Dükkan Çanakkale" loading="lazy" />
          <p class="place">Çanakkale</p>
          <div class="rule"></div>
          <p
            class="hint"
            role="button"
            tabindex="0"
            @click="goToPage(1)"
            @keydown="(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); goToPage(1) } }"
          >
            Menüyü keşfet <span aria-hidden="true">→</span>
          </p>
        </div>
      </section>

      <CategoryPage
        v-for="(category, index) in store.menu"
        :key="category.name"
        :category="category"
        :index="index"
        :total="store.menu.length"
        :next-category-name="store.menu[index + 1]?.name ?? ''"
        @nav="goToPage"
      />
    </main>

    <div class="frame" aria-hidden="true">
      <div class="v left"></div>
      <div class="v right"></div>
    </div>
  </div>
</template>
