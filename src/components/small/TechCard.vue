<template>
  <div class="m-2">
    <div
      @click="desc"
      :id="name"
      class="cursor-pointer max-w-lg flex flex-col xl:flex-row w-auto border-2 border-base-300 rounded-box"
    >
      <div class="flex flex-row shrink-0">
        <img
          class="mx-5 h-auto flex-none bg-cover rounded-t text-center overflow-hidden"
          width="80"
          height="80"
          loading="lazy"
          :src="image"
          :alt="name"
        />
        <div class="shrink-0 p-4 flex flex-col justify-between leading-normal">
          <div class="mb-8">
            <div class="font-semibold text-xl mb-2">{{ name }}</div>
            {{ level_txt }}
          </div>
        </div>
      </div>
      <p v-if="display_description" class="p-2 h-full">
        {{ comments }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  setup() {},
  props: ["name", "image", "level", "comments"],
  data() {
    return {
      level_txt: "To be determined",
      hovered: false,
      display_description: false,
    };
  },
  methods: {
    desc() {
      this.display_description = !this.display_description;
    },
  },
  mounted() {
    switch (this.level) {
      case 1:
        this.level_txt = "Novice";
        break;
      case 2:
        this.level_txt = "Beginner";
        break;
      case 3:
        this.level_txt = "Intermediate";
        break;
      case 4:
        this.level_txt = "Advanced";
        break;
      case 5:
        this.level_txt = "Expert";
        break;
      default:
        this.level_txt = "To be determined";
        break;
    }
  },
};
</script>
