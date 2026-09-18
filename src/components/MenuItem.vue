<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="item" :class="{ 'no-price': !item.p }">
    <div class="name-row">
      <span class="name">{{ item.n }}</span>
      <!-- <span class="leader" aria-hidden="true"></span> -->
      <span v-if="item.p" class="price">{{ item.p }}</span>
      <span v-else class="price price--muted">Fiyat için sorunuz</span>
    </div>
    <p v-if="item.d" class="desc">{{ item.d }}</p>
  </article>
</template>
