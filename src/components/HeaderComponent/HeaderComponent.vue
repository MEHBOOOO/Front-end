<template>
  <header class="header">
    <router-link to="/" class="header__title">Booking ClassRooms</router-link>
    <nav class="header__nav">
      <router-link to="/">Главная</router-link>
    </nav>
  </header>
</template>

<script>
import './headerComponent.scss'
export default {
  name: 'HeaderComponent'
}
</script>
