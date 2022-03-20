<template v-if="profile">
  <form>
    <div class="tile tile-top">
      <div class="tile-icon">
        <div class="example-tile-icon">
          <img class="avatar avatar-xl" :src="profile.avatar_url" />
        </div>
      </div>
      <div class="tile-content">
        <p class="tile-title">{{ profile.name }}</p>
        <p class="tile-subtitle">
          {{ profile.bio }}
        </p>
        {{ profile.location }}
      </div>
      <div class="tile-action">
        <button @click.stop.prevent="submit()" class="btn btn-primary">
          ver
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "UserTile",
  props: { profile: { type: Object } },
  data() {
    return {
      profileUser: {},
    };
  },
  methods: {
    submit() {
      console.log(`vendo ${this.$props.profile.name}`);

      this.$router.push({
        name: "profile",
        params: {
          profile: this.profile,
        },
      });
    },
  },
};
</script>

<style>
.tile-top {
  margin-top: 2rem;
}
</style>