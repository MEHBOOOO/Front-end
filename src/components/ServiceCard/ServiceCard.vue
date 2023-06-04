<template>
<div class="service-card">
    <img class="service-card__image" :src="service.image" alt="Service image" />

    <div class="service-card__content">
      <h2 class="service-card__title">{{ service.title }}</h2>
      <hr />
      <button class="service-card__button" @click="bookService">Записаться</button>
    </div>
  </div>
</template>

<script>
import './serviceCard.scss'
export default {
  name: 'ServiceCard',
  props: {
    service: Object
  },
  methods: {
    bookService () {
      this.$router.push({ name: 'Booking', params: { serviceType: this.service.type } })
    }
  }
}
</script>
