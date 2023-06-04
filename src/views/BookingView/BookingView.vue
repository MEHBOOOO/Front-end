<template>
  <div class="booking">
    <div class="booking__wrapper">
      <h2 class="booking__title" >{{ bookingTitle }}</h2>
      <span class="booking__desc">Посмотрите календарь и запишитесь на удобные дату и время</span>

      <div class="booking__list">
        <div class="booking__list__items">
          <div class="booking__list__item">
            <div class="booking__list__item__title">Выберите этаж:</div>
            <select v-model="selectedFloor" class="booking__list__items__select" :disabled="!selectedFloor || !floors.length">
              <option v-for="floor in floors" :key="floor" :value="floor">{{floor}} Этаж</option>
            </select>
          </div>

          <div class="booking__list__item">
            <div class="booking__list__item__title">Выберите кабинет:</div>
            <select v-model="selectedRoom" class="booking__list__items__select" :disabled="!selectedRoom">
              <option v-for="room in floorCabinets" :key="room" :value="room">{{ room.number }} кабинет</option>
            </select>
          </div>
        </div>

        <div class="booking__list__items">
          <div class="booking__list__item">
            <div class="booking__list__item__title">Выберите дату:</div>
            <VueDatePicker
              v-model="selectedDate"
              :min-date="minDate"
              :enable-time-picker="false"
              :disabled-dates="disabledDates"
            />
          </div>

          <div class="booking__list__item">
            <div class="booking__list__item__title">Выберите время:</div>
            <VueDatePicker
              v-model="selectedTime"
              time-picker
              minutes-increment="60"
              :start-time="{ hours: 8, minutes: 0 }"
              :min-time="{ hours: 8, minutes: 0 }"
              :max-time="{ hours: 18, minutes: 0 }"
              :disabled="!selectedDate"
              no-minutes-overlay
              :state="isTimeOccupied ? false : null"
            />
          </div>
        </div>

        <div class="booking__list__items">
          <div class="booking__list__item">
            <div class="booking__list__item__title">Укажите ФИО:</div>
            <input class="booking__list__item__input" type="text" v-model="username" placeholder="Введите ФИО..." />
          </div>

          <div class="booking__list__item">
            <div class="booking__list__item__title">Укажите телефон:</div>
            <input class="booking__list__item__input" type="number" v-model="phone" maxlength="12" placeholder="Введите телефон..." />
          </div>
        </div>

      </div>
      <button class="booking__submit" :disabled="!isDataFilled" @click="book">Забронировать</button>
    </div>
  </div>
</template>

<script>
import './bookingView.scss'

export default {
  name: 'BookingView',
  props: {
    serviceType: String
  },
  data () {
    return {
      selectedFloor: 1,
      selectedDate: null,
      selectedTime: null,
      selectedRoom: null,
      cabinets: [],
      bookedDates: [],
      username: '',
      phone: ''
    }
  },
  async created () {
    await this.requestCabinets()
    await this.requestBookedDates()
  },
  computed: {
    minDate () {
      const date = new Date()
      return date
    },
    bookingTitle () {
      return this.serviceType === 'cabinet'
        ? 'Бронирование Кабинетов/аудиторий'
        : 'Бронирование Open Rooms'
    },
    floors () {
      const floors = new Set()

      this.cabinets.forEach(value => {
        floors.add(value.floor)
      })

      return Array.from(floors)
    },
    floorCabinets () {
      return this.cabinets.filter(cabinet => cabinet.floor === this.selectedFloor)
    },
    isDataFilled () {
      return (
        this.selectedRoom &&
        this.selectedRoom.id &&
        this.serviceType &&
        this.selectedDate &&
        this.selectedTime &&
        this.username &&
        this.phone &&
        !this.isTimeOccupied
      )
    },
    disabledDates () {
      if (!this.bookedDates.length || !this.selectedRoom) return []

      const cabinetFilteredDates = this.bookedDates.filter(value => {
        return value.cabinet_id === this.selectedRoom.id
      })

      const dateBooksCount = cabinetFilteredDates.reduce((result, currentDate) => {
        result[currentDate.date] ||= 0
        result[currentDate.date] += 1
        return result
      }, {})

      const fullyBooked = []

      for (const date in dateBooksCount) {
        if (dateBooksCount[date] >= 11) {
          fullyBooked.push(new Date(date))
        }
      }

      return fullyBooked
    },
    isTimeOccupied () {
      if (!this.selectedDate || !this.selectedTime || !this.selectedRoom) return

      const books = this.bookedDates.filter(value => {
        const cabinetEqual = value.cabinet_id === this.selectedRoom.id
        const timeEqual = value.time.toString() === this.selectedTime.hours.toString()

        const bookedDate = new Date(value.date).toDateString()
        const dateEqual = bookedDate === this.selectedDate.toDateString()

        return cabinetEqual && timeEqual && dateEqual
      })
      return Boolean(books.length)
    }
  },
  methods: {
    async requestCabinets () {
      try {
        const response = await this.$axios.get('/api/cabinets')
        this.cabinets = response.data.filter(value => value.type === this.serviceType)

        if (this.cabinets.length) {
          this.selectedRoom = this.cabinets[0]
        }
      } catch (error) {
        console.error(error)
      }
    },
    async requestBookedDates () {
      const response = await this.$axios.get(`/api/booked-dates/${this.serviceType}`)
      this.bookedDates = response.data
    },
    clearData () {
      this.username = ''
      this.phone = ''
    },
    serializeDate (date) {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      return `${year}/${month}/${day}`
    },
    async book () {
      if (!this.isDataFilled) return

      try {
        const respone = await this.$axios.post('/api/book', {
          cabinet: this.selectedRoom.id,
          serviceType: this.serviceType,
          date: this.serializeDate(this.selectedDate),
          time: this.selectedTime.hours,
          username: this.username,
          phone: this.phone
        })

        console.log(respone.data)
        await this.requestBookedDates()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
