<template>
  <p>hello</p>
</template>

<script>
import rapidapi from '@/utils/rapidapi'

export default {
  methods: {
    async getData() {
      rapidapi.get('history', {
        params: { country: 'usa' }
      }).then(data => console.log(data))
    }
  },
  created() {
    this.getData()
  }
}

</script>
