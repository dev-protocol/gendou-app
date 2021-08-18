<template>
  <div>
    <div class="property-card">
      <div
        class="property-card-cover-image"
        :style="{ 'background-image': 'url(' + property.imageUrl + ')' }"
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
              <img :src="property.author.imageUrl" />
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
  },
  fetch() {
    console.log(this.property)
  },
}
</script>

<style lang="scss" scoped>
.property-card {
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  justify-content: stretch;
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-bottom: 0;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  pointer-events: auto;
  background: #fff;
  overflow: hidden;
  height: 350px;
  width: 350px;

  &-cover-image {
    position: relative;
    background-size: cover;
    background-position: center;
    padding-top: 20%;
  }

  &-content {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 0.7rem;
    align-content: baseline;
    text-align: left;
    grid-template-rows: auto 2fr 1fr;
    padding: 4px 16px 0 16px;
  }

  &-title {
    font-size: 1.4em;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &-description {
    color: grey;
    margin: 0;
    flex-grow: 1;
    font-size: 0.95em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* number of lines to show */
    -webkit-box-orient: vertical;
  }
  &-flex-row {
    display: flex;
    img {
      border-radius: 90px;
    }
  }
  &-flex-column {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    max-lines: 3;
    padding-bottom: 16px;
    span {
      margin-left: 10px;
      font-size: 0.9em;
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
    }
  }
}
</style>
