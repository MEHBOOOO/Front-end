<template>
    <section class="services">
      <h2 class="services__title" >Наши услуги</h2>
      <div class="services__list">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </section>
</template>

<script>
import './servicesView.scss'
import ServiceCard from '@/components/ServiceCard/ServiceCard.vue'
export default {
  name: 'ServicesView',
  components: {
    ServiceCard
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
