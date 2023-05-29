<template>
  <p class="text-center">
    👋<br />
    Hi, I'm Eliaz, a {{ age }} years-old developer who is curently studying at
    <a href='https://www.iut-clermont.fr/formations/dut-informatique/'>UCA</a>.
    <br />
    I'm interested in a lot of subjects ranging from economics to technology in general.<br />
    I'm open to offers if you're looking for a full-stack developer. 😄<br />
    <a href="https://github.com/Eliaz-LR">My Github</a>. <a href="mailto:me@eliaz-lr.dev">Email me here</a> !
  </p>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data() {
    return {
      age: {}
    }
  },
  created() {
    this.interval = setInterval(() => {
      this.age = (dayjs().diff(dayjs('2000-12-03'), 'year', true)).toFixed(9);
    }, 50)
  }
}
</script>

<style scoped>
a {
  @apply link font-bold link-primary;
}
</style>