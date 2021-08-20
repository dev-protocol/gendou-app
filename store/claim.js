import { toNaturalNumber } from '~/utils/bignumber'
import { fetchAirdropReward } from '~/utils/gendou-backend'

const REWARD_100_URL =
  'https://app.iroiro.social/#/explore/token/0xA2dFDeac7B4456b0A44f36F6111218688D9b1C7a/distributors/0x689e325b55cead95c23cbd0e4b3a6d6ebfaf8fa7/campaigns/8'
const REWARD_400_URL =
  'https://app.iroiro.social/#/explore/token/0xA2dFDeac7B4456b0A44f36F6111218688D9b1C7a/distributors/0x689e325b55cead95c23cbd0e4b3a6d6ebfaf8fa7/campaigns/7'
const REWARD_1000_URL =
  'https://app.iroiro.social/#/explore/token/0xA2dFDeac7B4456b0A44f36F6111218688D9b1C7a/distributors/0x689e325b55cead95c23cbd0e4b3a6d6ebfaf8fa7/campaigns/6'

export const state = () => ({
  currentStep: 0,
  walletConnected: false,
})

export const mutations = {
  setCurrentStep: (state, value) => (state.currentStep = value),
  setWalletConnected: (state, value) => (state.walletConnected = value),
}

export const actions = {
  async fetchAirdropRewardInfo({ commit }, { address, sign }) {
    const res = await fetchAirdropReward(this.$axios, address, sign)
    const reason = res.data.message
    const reward = toNaturalNumber(res.data.reward)
    const claimUrl =
      reward === 100
        ? REWARD_100_URL
        : reward === 400
        ? REWARD_400_URL
        : reward === 1000
        ? REWARD_1000_URL
        : undefined
    commit('setClaimUrl', claimUrl, { root: true })
    commit('setReward', reward, { root: true })
    commit('setRewardNotFoundReason', reason, { root: true })
  },
}
