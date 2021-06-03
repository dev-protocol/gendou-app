<template>
  <section>
    <div class="result">
      <p class="message display-5">Rewards you can claim is:</p>
      <p class="prize">{{ prize }} DEV</p>
      <p class="usd display-6">
        <a-icon v-if="prizeUSD === 0" type="loading" />
        <span v-else>${{ prizeUSD }}</span> in USD
      </p>
      <p class="contributions">
        Your calculated contributions is:<br />
        <span class="contributions-count">{{ contributions }}</span>
      </p>
      <p class="contributions-description">
        *Geometric mean of annual<br />total contributions over the last 5 years
      </p>
      <p class="center">
        <a
          ref="noopener noreferrer"
          class="tweet"
          :href="
            '//twitter.com/intent/tweet?text=My contributions score was ' +
            contributions +
            ' and claimable reward was ' +
            prize +
            ' DEV%0ADev Airdrop 🎁🎁 Get DEV tokens with your contributions to OSS 👩‍💻👨‍💻%0A%0AFor most active GitHub users!&url=https://airdrop.devprotocol.xyz&hashtags=devprotocol'
          "
          target="_blank"
        >
          <a-icon type="twitter" /> Tweet
        </a>
      </p>
    </div>

    <a-steps class="flow" direction="vertical" :current="currentStep">
      <a-step>
        <template slot="description">
          <ConnectGitHubApp :disabled="currentStep !== 0" />
        </template>
      </a-step>
      <a-step>
        <template slot="description">
          <ConnectWallet :disabled="currentStep !== 1" />
        </template>
      </a-step>
      <a-step title="Please read the following notes and sign if you agree">
        <template slot="description"
          ><div class="entry">
            <a-form>
              <a-checkbox-group
                v-model="agreements"
                class="agreements"
                :options="agreementsOptions"
              />
            </a-form>
            <a-alert
              v-if="entryError"
              :message="'Please try again: ' + entryError"
              banner
            />
            <SignButton
              :message="username"
              :disabled="
                currentStep !== 2 ||
                agreements.length < agreementsOptionsCount ||
                entrySucceed
              "
              :loading="entering"
              @signed="onSigned"
            />
            <div v-if="entrySucceed" class="finished">
              <a-icon type="check-circle" />
              Successful entry
            </div>
          </div>
        </template>
      </a-step>
      <a-step title="Claiming">
        <template slot="description"
          ><div>
            <p>
              Entry is closed on June 3. Come back here on June 3 and check your
              determined claimable reward. Be sure to follow us on Twitter and
              join Discord to be the first to know when the determind your
              reward!
            </p>
            <ul class="social-links">
              <li>
                <a
                  ref="noopener noreferrer"
                  class="twitter"
                  href="//twitter.com/devprtcl"
                  target="_blank"
                  ><a-icon type="twitter" /> Twitter</a
                >
              </li>
              <li>
                <a
                  ref="noopener noreferrer"
                  class="discord"
                  href="//discord.gg/VwJp4KM"
                  target="_blank"
                  ><img src="/image/discord.svg" /> Discord</a
                >
              </li>
            </ul>
            <aside class="prepare">
              <h3><a-icon type="check-square" /> Preparing for next steps</h3>
              <p>
                Preparing what is necessary for the entry and claiming process
                will help the flow run smoothly.
              </p>
              <ol class="prepare-items">
                <li>
                  <h4>Ethereum wallet</h4>
                  <p>
                    A wallet that supports Ethereum and any ERC-20 tokens,
                    <a
                      ref="noopener noreferrer"
                      class="metamask"
                      target="_blank"
                      href="//metamask.io"
                      >MetaMask</a
                    >
                    is recommended.
                  </p>
                </li>
                <li>
                  <h4>ETH</h4>
                  <p>
                    To create an Ethereum transaction for claiming purposes, a
                    small amount of ETH is consumed as a gas fee. The gas fee
                    will vary depending on Ethereum congestion, but it is safe
                    to set aside around <i>0.005</i> ETH.
                  </p>
                </li>
              </ol>
            </aside>
          </div>
        </template>
      </a-step>
    </a-steps>

    <div class="next">
      <p class="description display-6">
        Stake your DEV for an OSS project to earn
        <a-icon v-if="stakersAPY === 0" type="loading" />
        <span v-else>{{ stakersAPY }}</span> %/year<br />
        and support an OSS project by
        <a-icon v-if="creatorsAPY === 0" type="loading" />
        <span v-else>{{ creatorsAPY }}</span> %/year
        <a href="/" class="how-to">How to stake?</a>
      </p>
    </div>

    <CtoA />
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

const agreementsOptions = [
  'Your claimable reward is undecided at the time of entry',
  'After closing, the all entries are sorted by the number of calculated contributions and then mapped to the rewards table. Even if the calculated contributions meet the criteria for the reward table, the result of the sorting process may result in the quota being moved down.',
  'Entries with tampered contributions will be excluded by review.',
  'Entries is open for 2 weeks, then reviewed, and claimable after X weeks.',
]

export default {
  data() {
    return {
      agreementsOptions,
      agreementsOptionsCount: agreementsOptions.length,
      agreements: [],
      entering: false,
    }
  },
  async fetch() {
    // initialize step
    this.setCurrentStep(0)

    // If the GitHub app has already been connected, use step 2.
    if (this.accessToken !== '') {
      this.setCurrentStep(1)
    }

    await this.initDevInfo()
  },
  computed: {
    ...mapState({
      prize: (state) => state.reward,
      prizeUSD: (state) => state.rewardUSD,
      creatorsAPY: (state) => state.creatorsAPY,
      stakersAPY: (state) => state.stakersAPY,
      claimUrl: (state) => state.claimUrl,
      contributions: (state) => state.contributions,
      currentStep: (state) => state.claim.currentStep,
      accessToken: (state) => state.github.accessToken,
      username: (state) => state.github.username,
      entrySucceed: (state) =>
        ((status, data) => status > 199 && status < 300 && !data.message)(
          state.entryResults.status,
          state.entryResults.data
        ),
      entryError: (state) =>
        ((status, data) => (status > 399 || data ? data.message : undefined))(
          state.entryResults.status,
          state.entryResults.data
        ),
    }),
  },
  methods: {
    ...mapMutations({
      setCurrentStep: 'claim/setCurrentStep',
    }),
    ...mapActions({
      initDevInfo: 'fetchDevInfo',
      entry: 'fetchEntry',
    }),
    async onSigned(e) {
      this.entering = true
      const { signature } = e
      const accessToken = this.accessToken
      const res = await this.entry({ signature, accessToken })
      this.entering = false
      if (res.status === 200 && res.data.github_id) {
        this.setCurrentStep(3)
      }
    },
  },
}
</script>

<style lang="scss">
@media (max-width: 576px) {
  .layout {
    padding: 0 25px;
  }
}

.entry,
.agreements {
  display: grid;
  gap: 1rem;
  justify-items: baseline;
}

.finished {
  display: grid;
  grid-gap: 1rem;
  gap: 1rem;
  grid-auto-flow: column;
  align-items: center;
  color: #4caf50;
  padding: 0.8rem 1rem;
  justify-content: start;
  font-size: 1.5rem;
}

.button {
  padding: 8px 24px;
  height: initial;
  color: #fff;
  background-color: #0a0a0a;
  line-height: 32px;
  border-radius: 0;
  border: none;
  cursor: pointer;
  &:hover,
  &:focus {
    border: none;
    color: #fff;
    background-color: #0a0a0a;
  }
}

.center {
  text-align: center;
}

.tweet {
  background: #1da1f2;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1rem;
  font-size: 1.4rem;
  font-family: 'IBM Plex Mono', monospace;
  gap: 1rem;
  &,
  &:hover {
    color: white;
  }
}

.flow {
  max-width: 42rem;
  margin: 3rem auto;
  font-family: 'IBM Plex Mono', monospace;
  .ant-steps-item-icon {
    border-color: #000 !important;
    background: transparent !important;
  }
  .ant-steps-item-tail::after {
    background: #000 !important;
  }
  .ant-steps-icon,
  .ant-steps-item-active .ant-steps-item-title,
  .ant-steps-item-active .ant-steps-item-description {
    color: black !important;
  }
  .ant-steps-item-title:empty {
    display: none;
  }
  &.ant-steps-vertical .ant-steps-item-content {
    display: grid;
    gap: 1rem;
  }
  &.ant-steps-vertical .ant-steps-item-description {
    padding-bottom: 3rem;
  }
}

.social-links {
  display: flex;
  align-content: center;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2rem;
  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: stretch;
  }
  li {
    width: 100%;
  }
  a {
    display: inline-flex;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    height: 4rem;
    font-size: 2rem;
    padding: 1rem 1.3rem;
    border-radius: 5px;
    &.twitter {
      background: #1da1f2;
    }
    &.discord {
      background: #7289da;
    }
    &,
    &:hover {
      color: white;
    }
    i {
      font-size: 2.8rem;
    }
    img {
      height: 3.4rem;
      width: auto;
    }
  }
}

.prepare {
  border: 1px solid;
  border-radius: 3px;
  padding: 0.8rem;
  margin-top: 1rem;
  font-family: sans-serif;
  h3,
  h4 {
    color: inherit;
  }
  &-items {
    padding-left: 2rem;
    > li {
      > h4 {
        font-family: 'IBM Plex mono', monospace;
      }
      > p {
        margin-left: -1rem;
        > .metamask {
          text-decoration: underline;
          &::after {
            content: '↗';
          }
        }
      }
    }
  }
}

.result {
  display: grid;
  gap: 1rem;
  margin-bottom: 12rem;
  @media (max-width: 576px) {
    margin-bottom: 6rem;
  }
  & > * {
    margin: 0;
  }
  .message {
    text-align: center;
  }

  .prize {
    font-family: 'Whyte Inktrap', sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 6rem;
    line-height: 1em;
    text-align: center;
    @media (max-width: 576px) {
      font-size: 4rem;
    }
  }
  .usd {
    font-family: 'Whyte Inktrap', sans-serif;
    text-align: center;
  }

  .contributions {
    font-family: 'Whyte Inktrap', sans-serif;
    font-weight: bold;
    text-align: center;
    margin: 3rem auto;
    margin-bottom: 0;
    &-count {
      font-size: 4rem;
      @media (max-width: 576px) {
        font-size: 2rem;
      }
    }
    &-description {
      font-size: 14px;
      text-align: center;
      font-weight: normal;
    }
  }
}

.content {
  .connect-github-app {
    margin-bottom: 2rem;
    text-align: center;
  }

  .next {
    .description {
      position: relative;
      font-size: 16px;
      line-height: 1.6em;
      text-align: center;
      .how-to {
        border-bottom: 3px solid;
      }
    }
  }
}

.divider {
  margin: 4.6rem 0;
  @media (max-width: 576px) {
    margin: 4rem 0;
  }
}
</style>
