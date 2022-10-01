<template>
  <p>Covid-19 History</p>
</template>

<script>
import rapidapi from '@/utils/rapidapi'

export default {
  methods: {
    async getData() {
      rapidapi.get('statistics').then(data => console.log(data))
    }
  },
  created() {
    this.getData()
  }
}
</script>
