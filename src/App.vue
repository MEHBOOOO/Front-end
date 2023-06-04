<template>
  <HeaderComponent />
  <div class="content">
    <router-view/>
  </div>
  <FooterComponent />
</template>

<script>
import '@/scss/_reset.scss'
import '@/scss/fonts/fonts.scss'
import '@/scss/_main.scss'

import HeaderComponent from '@/components/HeaderComponent/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
}
</style>
