import { defineStore } from 'pinia'
import menuData from '../data/menu.json'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: menuData.MENU || [],
    categoryImages: menuData.CATEGORY_IMAGES || {},
    // activePage follows the original app: 0 = cover, 1..N = categories
    activePage: 0,
  }),
  actions: {
    setActivePage(i) {
      const safe = Math.min(Math.max(Number(i) || 0, 0), this.menu.length)
      this.activePage = safe
    },
  },
})
