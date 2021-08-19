<template>
  <div>
    <div class="property-card">
      <div
        class="property-card-cover-image"
        :style="[
          coverImage
            ? { 'background-image': 'url(' + coverImage + ')' }
            : { 'background-image': 'url(' + property.imageUrl + ')' },
        ]"
      />
      <a
        :href="'https://stakes.social/' + property.address"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="property-card-content">
          <div class="property-card-title">{{ property.name }}</div>
          <span class="property-card-description">
            {{ property.description }}
          </span>
          <div class="property-card-flex-row">
            <div class="property-card-avatar-image">
              <img
                :src="profileImage ? profileImage : property.author.imageUrl"
              />
            </div>
            <div class="property-card-flex-column">
              <span>Creator</span>
              <span :style="{ color: '#1AC9FC' }">{{
                property.author.name
              }}</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    property: {
      type: Object,
      required: true,
      default: () => {},
    },
    coverImage: {
      type: String,
      default: undefined,
    },
    profileImage: {
      type: String,
      default: undefined,
    },
  },
  fetch() {
    console.log(this.property)
  },
}
</script>

<style lang="scss" scoped>
.property-card {
  width: 100%;
  height: 350px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: 0;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  pointer-events: auto;
  background: #fff;
  overflow: hidden;

  &-cover-image {
    position: relative;
    background-size: cover;
    background-position: center;
    padding-top: 40%;
  }

  &-content {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0.7rem;
    align-content: baseline;
    grid-template-rows: auto 2fr 1fr;
    padding: 4px 16px 0 16px;
    height: 75%;
    text-align: left;
  }

  &-title {
    font-size: 1em;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-description {
    flex-grow: 1;
    margin: 0;
    max-height: 100px;
    color: grey;
    font-size: 0.8em;
    text-overflow: ellipsis;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 5; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  &-flex-row {
    display: flex;
    img {
      border-radius: 90px;
    }
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: center;
    }
  }
  &-flex-column {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    max-lines: 3;
    padding-bottom: 16px;
    @media (max-width: 576px) {
      align-items: center;
    }
    span {
      margin-left: 10px;
      font-size: 0.8em;
      @media (max-width: 576px) {
        margin: 0;
      }
    }
  }
  &-avatar-image {
    img {
      border: 1px solid lightgrey;
      border-radius: 90px;
      object-fit: cover;
      object-position: center;
      width: 60px;
      height: 60px;
      @media (max-width: 576px) {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
