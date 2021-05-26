<template>
  <div>
    <div class="hero">
      <lottie
        class="lottie"
        :controled="controled"
        :options="defaultOptions"
        :start="opening"
        :width="0"
        @complete="handleComplete"
      />
      <Header />
      <div class="hero-contents">
        <slot name="hero"></slot>
      </div>
    </div>
    <slot name="main"></slot>
    <Footer />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapState } from 'vuex'
import Lottie from '~/components/Lottie'

import * as animationData from '~/assets/lottie-data.json'

export default Vue.extend({
  components: {
    Lottie,
  },
  data() {
    return {
      defaultOptions: { animationData },
    }
  },
  computed: {
    ...mapState({
      opening: (state) => state.door.opening,
      opened: (state) => state.door.opened,
      controled: (state) => state.door.controled,
    }),
  },
  methods: {
    ...mapActions({
      open: 'door/open',
      toggle: 'door/toggle',
    }),
    handleComplete() {
      this.toggle(true)
    },
  },
})
</script>

<style lang="scss">
.lottie {
  position: absolute;
  &[controled='opened'] {
    background: url('/image/background01.png');
    background-position: center center;
    background-size: auto 100%;
    & > svg {
      visibility: hidden;
    }
  }
}
.hero-contents {
  position: relative;
}
// @media (max-width: 576px) {
// }
</style>
