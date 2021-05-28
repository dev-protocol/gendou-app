<template>
  <div>
    <section>
      <div class="result">
        <p class="message display-5">Rewards you can claim:</p>
        <p class="prize">{{ prize }} DEV</p>
        <p class="usd display-6">
          <a-icon v-if="prizeUSD === 0" type="loading" />
          <span v-else>${{ prizeUSD }}</span> in USD
        </p>
      </div>

      <a-steps class="flow" direction="vertical" :current="1">
        <a-step
          title="Check"
          description="Check your maximum reward you can get."
        />
        <a-step title="Entry">
          <template slot="description"
            ><div>
              <p>
                Apply on an airdrop entry form. Rewards will be distributed on a
                first-come, first-served basis and you may not get a reward once
                the quota is full. Entry is scheduled to open on 3 June. Be sure
                to follow us on Twitter and join on Discord to be the first to
                know when the entry open!
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
            </div></template
          ></a-step
        >
        <a-step title="Claiming" description="This is a description." />
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
    </section>

    <section v-if="claimUrl" class="then">
      <div class="stakes-social">
        <h2>Next?</h2>
        <img
          width="100%"
          src="https://devprotocol.xyz/assets/img/macbook_stakes.png"
        />
        <p class="display-5">Explore the 1,600+ OSS projects on</p>
        <img
          width="240px"
          src="https://devprotocol.xyz/assets/img/Stakes.svg"
        />
        <div class="ss-explore-button">
          <a ref="noopener noreferrer" href="//stakes.social/" target="_blank">
            <a-button type="default" class="button display-5">
              Explore
            </a-button>
          </a>
        </div>
      </div>

      <a-divider />

      <div class="joinus">
        <div class="joinus-heading">Join us</div>
        <div class="apply-oss">
          <div class="apply-oss-info">
            <div class="apply-oss-title display-5">Apply your OSS Project!</div>
            <div class="apply-oss-description">
              <p>
                Offer your patrons an additional incentive to support your OSS
                project by allowing them to collect an interest rate on the DEV
                they stake.
              </p>
              <div class="apply-oss-description-more">Learn more</div>
            </div>
          </div>
          <div>
            <a
              ref="noopener noreferrer"
              href="https://stakes.social/create"
              target="_blank"
            >
              <a-button type="default" class="button display-5">Apply</a-button>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  async fetch() {
    await this.initDevInfo()
  },
  computed: {
    ...mapState({
      prize: (state) => state.reward,
      prizeUSD: (state) => state.rewardUSD,
      creatorsAPY: (state) => state.creatorsAPY,
      stakersAPY: (state) => state.stakersAPY,
      claimUrl: (state) => state.claimUrl,
    }),
  },
  methods: {
    ...mapActions({
      initDevInfo: 'fetchDevInfo',
    }),
  },
}
</script>

<style lang="scss">
@media (max-width: 576px) {
  .layout {
    padding: 0 25px;
  }
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
  &:hover {
    border: none;
    color: #fff;
    background-color: #0a0a0a;
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

.stakes-social {
  text-align: center;
  h2 {
    font-family: 'Whyte Inktrap', sans-serif;
    font-weight: bold;
    font-size: 6rem;
    @media (max-width: 576px) {
      font-size: 4rem;
    }
  }
  .ss-explore-button {
    margin-top: 4rem;
  }
}

.joinus {
  margin: 0 0 80px 0;
  &-heading {
    margin-bottom: 6rem;
    @media (max-width: 576px) {
      margin-bottom: 4rem;
    }
  }
  .apply-oss {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-info {
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: space-between;
      margin-bottom: 2rem;
      gap: 6rem;
      @media (max-width: 576px) {
        grid-template-columns: none;
        gap: 2rem;
      }
    }
    &-title {
      font-family: 'IBM Plex Mono', monospace;
    }
    &-description {
      &-more {
        text-align: right;
      }
    }
  }
}

.result {
  display: grid;
  gap: 1rem;
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

.then {
  margin-top: 12rem;
  @media (max-width: 576px) {
    margin-top: 8rem;
  }
}
</style>
