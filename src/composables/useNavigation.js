import { onMounted, onBeforeUnmount } from 'vue'

export function useNavigation(trackRef, store) {
  let scrollTimer = null
  let scrollListener = null

  const goToPage = (pageIndex) => {
    const safeIndex = Math.min(Math.max(Number(pageIndex) || 0, 0), store.menu.length)

    if (trackRef.value) {
      trackRef.value.scrollTo({
        left: safeIndex * trackRef.value.clientWidth,
        behavior: 'smooth',
      })
    }

    store.setActivePage(safeIndex)
  }

  const updateActivePage = () => {
    if (!trackRef.value) return

    const pageWidth = trackRef.value.clientWidth || window.innerWidth
    const nextIndex = Math.min(
      Math.max(Math.round(trackRef.value.scrollLeft / pageWidth), 0),
      store.menu.length,
    )

    store.setActivePage(nextIndex)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') goToPage(store.activePage + 1)
    if (event.key === 'ArrowLeft') goToPage(store.activePage - 1)
  }

  const onResize = () => {
    if (!trackRef.value) return
    const safeIndex = Math.min(Math.max(store.activePage, 0), store.menu.length)
    trackRef.value.scrollLeft = safeIndex * trackRef.value.clientWidth
    store.setActivePage(safeIndex)
  }

  onMounted(() => {
    scrollListener = () => {
      window.clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(updateActivePage, 60)
    }

    trackRef.value?.addEventListener('scroll', scrollListener, { passive: true })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    // ensure initial state
    store.setActivePage(store.activePage || 0)
  })

  onBeforeUnmount(() => {
    if (trackRef.value && scrollListener) trackRef.value.removeEventListener('scroll', scrollListener)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('resize', onResize)
    window.clearTimeout(scrollTimer)
  })

  return { goToPage, updateActivePage }
}
