<!-- This was taken from my previous portfolio website (with a few tweaks to deal with the way astro works) -->

<template>
  <p class="text-center text-lg">
    👋<br />
    Hi, I'm Eliaz, a {{ age }} years-old developer who is curently studying at
    <a href="https://www.uca.fr/licence-informatique">UCA</a>.
    <br />
    I'm interested in a lot of subjects ranging from economics to technology in
    general.<br />
    <a href="https://github.com/Eliaz-LR">My Github</a>.
    <a href="mailto:me@eliaz-lr.dev">Email me here</a> !
  </p>
</template>

<script>
import dayjs from "dayjs";

const calculateAge = () => {
  return dayjs().diff(dayjs("2000-12-03"), "year", true).toFixed(9);
};

export default {
  data() {
    return {
      age: calculateAge(),
    };
  },
  created() {
    this.interval = setInterval(() => {
      this.age = calculateAge();
    }, 50);
  },
};
</script>

<style scoped>
a {
  @apply link font-bold link-primary;
}
</style>
