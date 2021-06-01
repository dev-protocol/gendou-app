<template>
  <a-button
    type="default"
    class="button display-5"
    :disabled="disabled"
    @click="sign"
  >
    Sign
  </a-button>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Web3 from 'web3'

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      requestState: (state) => state.github.requestState,
    }),
  },
  methods: {
    async sign() {
      const provider = this.$web3modal.connect()
      const web3 = new Web3(provider)
      const inputMessage = ''
      const [account] = await web3.eth.getAccounts()
      const signature = await web3.eth.personal.sign(inputMessage, account, '')
      console.log(signature)
    },
  },
})
</script>
