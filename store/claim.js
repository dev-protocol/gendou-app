export const state = () => ({
  currentStep: 1,
})

export const mutations = {
  setCurrentStep: (state, value) => (state.currentStep = value),
}
