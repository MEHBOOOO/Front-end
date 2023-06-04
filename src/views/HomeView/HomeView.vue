<template>
  <div class="home">
    <section class="home__services">
      <div class="home__services__wrapper">
        <h2 class="home__services__title" >Наши услуги</h2>
        <div class="home__services__list">
          <ServiceCard v-for="service in services" :key="service.id" :service="service" />
        </div>
      </div>
    </section>
    <SubscribeForm />
  </div>
</template>

<script>
import './homeView.scss'
import ServiceCard from '@/components/ServiceCard/ServiceCard.vue'
import SubscribeForm from '@/components/SubscribeForm/SubscribeForm.vue'

export default {
  name: 'HomeView',
  components: {
    ServiceCard,
    SubscribeForm
  },
  async created () {
    await this.fetchServices()
  },
  data () {
    return {
      services: []
    }
  },
  methods: {
    async fetchServices () {
      try {
        const response = await this.$axios.get('/api/services')
        this.services = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
