import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { getStats, getAPY } from '~/utils/devkit'
import { fetchPrizeInfo } from '~/utils/gendou-backend'
import { toNaturalNumber } from '~/utils/bignumber'
import { HTTP_PROVIDER_URL } from '~/utils/web3'

export const state = () => ({
  account: '',
  githubId: '',
  reward: 0,
  rewardUSD: 0,
  claimUrl: '',
  stakersAPY: 0,
  creatorsAPY: 0,
  contributions: 0,
})

export const getters = {
  getClaimUrl: (state) => state.claimUrl,
  isGotPrize: (state) => state.reward > 0,
}

export const mutations = {
  setAccount: (state, value) => (state.account = value),
  setGitHubId: (state, value) => (state.githubId = value),
  setReward: (state, value) => (state.reward = value),
  setRewardUSD: (state, value) => (state.rewardUSD = value),
  setStakersAPY: (state, value) => (state.stakersAPY = value),
  setCreatorsAPY: (state, value) => (state.creatorsAPY = value),
  setClaimUrl: (state, value) => (state.claimUrl = value),
}

export const actions = {
  async getPrizeInfo({ commit }, githubId) {
    commit('setGitHubId', githubId)
    const { data } = await fetchPrizeInfo(this.$axios, githubId)

    if (data.reward) {
      commit('setReward', toNaturalNumber(data.reward))
    }
  },
  async fetchDevInfo({ commit, state }) {
    if (state.stakersAPY !== 0) {
      return
    }

    const { devPrice } = await getStats()
    const rewardUSD = new BigNumber(state.reward)
      .multipliedBy(new BigNumber(devPrice))
      .dp(0)
      .toNumber()

    const web3 = new Web3(HTTP_PROVIDER_URL)
    const { apy, creators } = await getAPY(web3)
    const creatorsAPY = creators.toFixed(2)
    const stakersAPY = apy.toFixed(2)
    commit('setRewardUSD', rewardUSD)
    commit('setCreatorsAPY', creatorsAPY)
    commit('setStakersAPY', stakersAPY)
  },
}
