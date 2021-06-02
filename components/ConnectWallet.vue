<template>
  <a-button
    type="default"
    class="button display-5"
    :disabled="disabled"
    @click="showModal"
  >
    <span v-if="isConnected">Connected</span>
    <span v-else>Connect to your wallet</span>
  </a-button>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isConnected: false,
    }
  },
  fetch() {
    console.log(this.$web3modal.getProvider())
    this.isConnected = this.$web3modal.getProvider() !== undefined
  },
  computed: {
    ...mapState({
      requestState: (state) => state.github.requestState,
    }),
  },
  methods: {
    async showModal() {
      const provider = await this.$web3modal.connect()
      console.log('show web3modal', provider)
      this.setCurrentStep(2)
    },
    ...mapMutations({
      setCurrentStep: 'claim/setCurrentStep',
    }),
  },
})
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  .button {
    padding: 10px 15px;
    line-height: 100%;
  }
}
</style>
<style>
.ant-btn-loading::before {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
