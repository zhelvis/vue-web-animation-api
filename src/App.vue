<template>
  <div class="container">
    <div style="position: relative">
      <bubbles ref="bubbles">
        ❤️
      </bubbles>
      <md-button
        v-on:click="createBubbles"
        class="container__button md-raised md-primary"
      >
        <md-icon class="container__button__icon">favorite</md-icon>Like
      </md-button>
    </div>
  </div>
</template>

<script>
import Bubbles from "./components/Bubbles.vue";
export default {
  name: "App",
  components: {
    Bubbles,
  },
  methods: {
    createBubbles: function () {
      this.$refs.bubbles.createBubbles(3);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  &__button {
    &__icon {
      margin-right: 0.3rem;
    }
  }
}

</style>
