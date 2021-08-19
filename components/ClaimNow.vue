<template>
  <div>
    <section>
      <div class="result">
        <p class="message display-5">You can claim now</p>
        <p class="prize">{{ prize }} DEV</p>
        <p class="usd display-6">
          <a-icon v-if="prizeUSD === 0" type="loading" />
          <span v-else>${{ prizeUSD }}</span> in USD
        </p>
      </div>

      <div v-if="claimUrl !== ''" class="warning">
        Rewards will be picked up by October 31th.<br />
        You will not be able to receive it after the period
      </div>

      <div v-if="claimUrl === ''" class="connect-github-app">
        <a-divider class="divider" />
        <ConnectGitHubApp />
      </div>
      <div v-else class="claim-url">
        <a ref="noopener noreferrer" :href="claimUrl" target="_blank">
          <a-button type="default" class="button display-5">
            Claim with Iroiro <a-icon type="link" />
          </a-button>
        </a>
        <a
          ref="noopener noreferrer"
          class="tweet"
          :href="
            '//twitter.com/intent/tweet?text=I received ' +
            prize +
            ' DEV with my GitHub contributions&url=https://airdrop.devprotocol.xyz&hashtags=devprotocol'
          "
          target="_blank"
        >
          <a-icon type="twitter" />
        </a>
      </div>

      <div class="next">
        <p class="description display-6">
          Stake your DEV for an
          <a href="#properties" style="color: #007afd">OSS project</a> to earn
          <a-icon v-if="stakersAPY === 0" type="loading" />
          <span v-else>{{ stakersAPY }}</span> %/year<br />
          and support an OSS project by
          <a-icon v-if="creatorsAPY === 0" type="loading" />
          <span v-else>{{ creatorsAPY }}</span> %/year
          <a
            href="https://docs.devprotocol.xyz/en/stakes-social/token-guide/"
            class="how-to"
            target="_blank"
            >How to stake?</a
          >
        </p>
      </div>
    </section>

    <section v-if="claimUrl" class="then">
      <div class="stakes-social">
        <h2 id="properties">
          Stake the DEV you receive to OSS project Staking<br />
          Staking will help developers and increase your DEV
        </h2>

        <a-row class="card-row" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col class="card-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p class="card-title">
              This project is recommended for<br />
              Front-End Developer
            </p>
          </a-col>
          <a-col class="card-col" :xs="0" :sm="0" :md="6" :lg="6" :xl="6">
            <p class="card-title">
              This project is recommended for<br />
              Pythonista
            </p>
          </a-col>
          <a-col class="card-col" :xs="0" :sm="0" :md="6" :lg="6" :xl="6">
            <p class="card-title">
              This project is recommended for<br />
              Vimmer
            </p>
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard
              :property="properties[0]"
              cover-image="/image/property/redux-image.png"
            />
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard :property="properties[1]" />
          </a-col>

          <a-col
            class="card-col space-mobile"
            :xs="24"
            :sm="24"
            :md="0"
            :lg="0"
            :xl="0"
          ></a-col>

          <a-col class="card-col" :xs="12" :sm="12" :md="0" :lg="0" :xl="0">
            <p class="card-title">This project is recommended for Pythonista</p>
          </a-col>
          <a-col class="card-col" :xs="12" :sm="12" :md="0" :lg="0" :xl="0">
            <p class="card-title">This project is recommended for Vimmer</p>
          </a-col>

          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard
              :property="properties[2]"
              cover-image="/image/property/no-image.png"
            />
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard :property="properties[3]" />
          </a-col>
        </a-row>

        <a-row class="card-row" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col class="card-col" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
            <p class="card-title">
              This project is recommended for<br />
              Blockchain Developer
            </p>
          </a-col>
          <a-col class="card-col" :xs="0" :sm="0" :md="12" :lg="12" :xl="12">
            <p class="card-title">
              This project is recommended for<br />
              Back-End Environment
            </p>
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard
              :property="properties[4]"
              profile-image="/image/property/no-profile.png"
            />
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard :property="properties[5]" />
          </a-col>

          <a-col
            class="card-col space-mobile"
            :xs="24"
            :sm="24"
            :md="0"
            :lg="0"
            :xl="0"
          ></a-col>

          <a-col class="card-col" :xs="24" :sm="24" :md="0" :lg="0" :xl="0">
            <p class="card-title">
              This project is recommended for<br />
              Back-End Environment
            </p>
          </a-col>

          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard :property="properties[6]" />
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard
              :property="properties[7]"
              cover-image="/image/property/no-image.png"
              profile-image="/image/property/no-profile.png"
            />
          </a-col>
        </a-row>

        <a-row class="card-row" :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
          <a-col class="card-col" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <p class="card-title">
              There’s also many interesting projects that you can support<br />
              to help them in their development
            </p>
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard :property="properties[8]" />
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard :property="properties[9]" />
          </a-col>

          <a-col
            class="card-col space-mobile"
            :xs="24"
            :sm="24"
            :md="0"
            :lg="0"
            :xl="0"
          ></a-col>

          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard :property="properties[10]" />
          </a-col>
          <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
            <PropertyCard
              :property="properties[11]"
              profile-image="/image/property/no-profile.png"
            />
          </a-col>
        </a-row>

        <p class="display-5" style="margin-bottom: 0">
          Explore the 1,600+ OSS projects on
        </p>

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

        <p class="display-5" style="margin-top: 80px">Learn how to stake</p>

        <div class="ss-explore-button">
          <a
            ref="noopener noreferrer"
            href="https://docs.devprotocol.xyz/en/stakes-social/token-guide/"
            target="_blank"
          >
            <a-button type="default" class="button display-5">
              How to stake
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
  data() {
    return {
      properties: [
        {
          name: 'reduxjs/redux-toolkit',
          address: '0xB96cBb406F8Eb2712eD8A9055e285E28fd076548',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0xB96cBb406F8Eb2712eD8A9055e285E28fd076548/cover_image/rtk_header_d6ace5a2a7.png',
          description:
            'The official, opinionated, batteries-included toolset for efficient Redux development',
          author: {
            name: 'Redux Toolkit',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0x29013Dc5d2Ee52B7ace7FEaD33C19A5903b5451e/redux_Logo_white_centered_ca69f7be41.png',
          },
        },
        {
          name: 'nolimits4web/swiper',
          address: '0x65D6c1a5A31d49591d3BE41D1cc9a91F2b6209f4',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/share_banner_5961043ec8.png',
          description:
            'Swiper is the most modern free mobile touch slider with hardware accelerated transitions and amazing native behavior. It is intended to be used in mobile websites, mobile web apps, and mobile native/hybrid apps.',
          author: {
            name: 'nolimits4web',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/999588_e4bbaa7512.jpeg',
          },
        },
        {
          name: 'hhatto/autopep8',
          address: '0x6FC83305afb1083CE1Db511d252B47A38CFCE1f7',
          imageUrl: 'https://asset.stakes.social/logo/dev.svg',
          description:
            'A tool that automatically formats Python code to conform to the PEP 8 style guide.',
          author: {
            name: 'hhatto',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0x006f7DA5fE8B1a45D364a677499333099CDb4b75/face_b3bec3b50c.jpg',
          },
        },
        {
          name: 'LunarVim/LunarVim',
          address: '0xe014A52354136B678ff5030397224179bD0F9657',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0xe014A52354136B678ff5030397224179bD0F9657/cover_image/lunarvim_logo_light_b7fda576ce.png',
          description: 'LunarVim - fast extensible IDE Layer for Neovim',
          author: {
            name: 'chris@machine',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0xc763a82f81A0C5D525b1Af74A23E996751735307/me2_3a8650af87.jpg',
          },
        },
        {
          name: 'WalletConnect/walletconnect-monorepo',
          address: '0x4cb307CF044f408C8e71caaf36d8De1Ea5ebA0BC',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/1500x500_0c32ff15aa',
          description: 'Open protocol for connecting Wallets to Dapps',
          author: {
            name: 'WalletConnect',
            imageUrl: 'https://asset.stakes.social/logo/dev.svg',
          },
        },
        {
          name: 'vyperlang/vyper',
          address: '0x90168f9Ba07B95f629f8b77F789d46A549d6470F',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/d3e6c900_6a1b_11ea_91be_d87dfda8b8e7_36d483d5b7.jpg',
          description:
            'Vyper is a contract-oriented, pythonic programming language that targets the Ethereum Virtual Machine (EVM).',
          author: {
            name: 'Vyper',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/d3e6c900_6a1b_11ea_91be_d87dfda8b8e7_36d483d5b7.jpg',
          },
        },
        {
          name: 'talentlessguy/tinyhttp',
          address: '0x14308514785B216904a41aB817282d25425Cce39',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0x14308514785B216904a41aB817282d25425Cce39/cover_image/cover_52d54ababd.jpg',
          description:
            '🎁 EACH ADDRESS THAT STAKES 1K+ DEV GETS A 10DEV BONUS 🎁 tinyhttp is a modern Express-like web framework written in TypeScript and compiled to native ESM, that uses a bare minimum amount of dependencies trying to avoid legacy hell. - ⚡ 2x faster than Express - ⚙ Express middleware compat - ↪ Async middleware support - ☑ Native ESM and CommonJS support - 🚀 No legacy dependencies, just the JavaScript itself - 🔨 Types out of the box - 🔥 Prebuilt middleware for modern Node.js ',
          author: {
            name: 'v1rtl',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0xD3B282e9880cDcB1142830731cD83f7ac0e1043f/pfp_82728c3db8.jpg',
          },
        },
        {
          name: 'lukechilds/keyv',
          address: '0x4Dfd87f4D9cb1f5345AE3F5fAB85be4218543283',
          imageUrl: 'https://asset.stakes.social/logo/dev.svg',
          description:
            'Simple key-value storage with support for multiple backends. Keyv provides a consistent interface for key-value storage across multiple backends via storage adapters. It supports TTL based expiry, making it suitable as a cache or a persistent key-value store.',
          author: {
            name: '',
            imageUrl: 'https://asset.stakes.social/logo/dev.svg',
          },
        },
        {
          name: 'framework7io',
          address: '0x4E451B79800CCCC76a194A908cD06487918f4701',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0x4E451B79800CCCC76a194A908cD06487918f4701/cover_image/share_banner_bd412ce956.jpg',
          description:
            'Framework7 - is a free and open source framework to develop mobile, desktop or web apps with native look and feel',
          author: {
            name: 'nolimits4web',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/999588_e4bbaa7512.jpeg',
          },
        },
        {
          name: 'vadimdemedes/ink',
          address: '0x7dC42FA19C5CfDfACdcf7B7bEeE9b6CfC77A6F1b',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/dd18698b_66fa74abb6',
          description:
            '🌈 React for interactive command-line apps. Ink provides the same component-based UI building experience that React offers in the browser, but for command-line apps.',
          author: {
            name: 'Vadim Demedes',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/66f211dc_fbdb1a7402',
          },
        },
        {
          name: 'crowi/crowi',
          address: '0x375bB44E669A14a09a982b98B74c677a8400EDbf',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/crowi_logo_master_inverse_for_dev_88b00401a4.png',
          description: 'Empower the team with sharing your knowledge.',
          author: {
            name: 'sotarok',
            imageUrl:
              'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0x4908Bf2c81a71647e6a579acbE1Bf1aa2778c874/sotarok_icon2_square_c5257a1951.png',
          },
        },
        {
          name: 'netbootxyz/netboot.xyz',
          address: '0xdFB462BfD71128b96DB742a2621aEb801c4FD611',
          imageUrl:
            'https://storageaccountdevfobc15.blob.core.windows.net/dev-for-apps-images/assets/0xdFB462BfD71128b96DB742a2621aEb801c4FD611/cover_image/dbe68b80_7b20_11e9_8541_8d2b4dd8f636_8f38bf767b.png',
          description:
            'Network bootable operating system installer based on iPXE',
          author: {
            name: 'netboot.xyz',
            imageUrl: 'https://asset.stakes.social/logo/dev.svg',
          },
        },
      ],
    }
  },
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
    linkToOtherWindow() {
      window.open(this.claimUrl, '_blank')
      this.$router.push('/claim')
    },
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
  &:hover,
  &:focus {
    border: none;
    color: #fff;
    background-color: #0a0a0a;
  }
}

.warning {
  margin-top: 3rem;
  text-align: center;
  color: #ff3815;
}

.claim-url {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 3rem auto;
  text-align: center;
  .tweet {
    background: #1da1f2;
    width: 3rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    &,
    &:hover {
      color: white;
    }
  }
}

.stakes-social {
  margin: 0 auto;
  max-width: 970px;
  text-align: center;

  h2 {
    margin-bottom: 90px;
    font-family: 'Whyte Inktrap', sans-serif;
    font-weight: bold;
    font-size: 1.6rem;
    @media (max-width: 576px) {
      margin-bottom: 50px;
      font-size: 1.2rem;
    }
  }
  .card-row {
    margin-bottom: 4rem;
    .card-col {
      &.space-mobile {
        margin-bottom: 4rem;
      }
      .card-title {
        font-size: 0.9rem;
      }
    }
  }
  .ss-explore-button {
    margin-top: 2rem;
  }

  &-property-card-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(345px, 1fr));
    gap: 6rem 1rem;
    -moz-box-pack: justify;
    margin: 1rem 0;
    justify-content: space-between;
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
