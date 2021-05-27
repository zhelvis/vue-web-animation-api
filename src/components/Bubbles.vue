<template>
  <div ref="container" class="bubbles">
    <div ref="item" class="bubbles__item"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "Bubbles",
  methods: {
    createBubbles: function (num) {
      for (let i = 0; i < num; i++) {
        this.createBubble();
      }
    },
    createBubble: function () {
      // getting ref to DOM container
      const container = this.$refs.container;

      // cloning subtree from slot wrapped by div with bubble style
      const item = this.$refs.item.cloneNode(true);

      // injecting clone node into container
      container.appendChild(item);

      // getting random end points for animation in fixed range
      const y = this.getRandomInt(-200, -100);
      const x = this.getRandomInt(-75, 75);

      if (this.isCompositeAnimationSupported) {
        // declaring keyframes
        const MainKeyFrame = [
          // 0%
          {
            transform: "translateY(-50%) scale(1)",
            opacity: 1,
          },
          // 100%
          {
            transform: `translateY(${y}px) scale(1.25)`,
            opacity: 0,
          },
        ];

        const additionalKeyFrame = [
          {
            transform: "translateX(-50%)",
          },
          {
            transform: `translateX(${x}px)`,
          },
        ];

        /* 
        animation start. 
        Injected item will move by curve, because we have async timing for each axis
      */
        item.animate(MainKeyFrame, {
          duration: 1500,
          iterations: 1,
          fill: "both",
          easing: "ease-out",
        });

        item.animate(additionalKeyFrame, {
          composite: "add",
          duration: 1500,
          iterations: 1,
          fill: "both",
          easing: "ease-in",
        });
      } else {
        const keyFrame = [
          // 0%
          {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: 1,
          },
          // 100%
          {
            transform: `translate(${y}px, ${x}px) scale(1.25)`,
            opacity: 0,
          },
        ];

        item.animate(keyFrame, {
          duration: 1500,
          iterations: 1,
        });
      }

      // removing item from dom after composite animation will complited
      Promise.all(
        item
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished)
      ).then(() => item.remove());
    },
    // generating random integer in fixed range
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // check WAAPI composite mode support
    isCompositeAnimationSupported: function () {
      const { isSafari, isIOS, isChromeIOS } = this.$browserDetect;
      return !(isSafari || isIOS || isChromeIOS);
    },
  },
};
</script>

<style lang="scss" scoped>
.bubbles {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__item {
    position: absolute;
    opacity: 0;
  }
}
</style>