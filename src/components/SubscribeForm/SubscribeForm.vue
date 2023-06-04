<template>
  <form @submit.prevent="subscribe" class="subscribe-form">
    <h1 class="subscribe-form__title">Subscribe Form</h1>

    <div class="subscribe-form__container">
      <input class="subscribe-form__input" type="email" v-model="email" placeholder="Enter your email" />
      <button class="subscribe-form__button" type="submit">Join</button>
    </div>

  </form>
</template>

<script>
import './subscribeForm.scss'

export default {
  name: 'SubscribeForm',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async subscribe () {
      if (!this.email) return

      try {
        const response = await this.$axios.post('/api/subscribe', {
          email: this.email
        })
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
