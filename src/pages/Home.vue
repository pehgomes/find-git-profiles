<template>
  <div class="container grid-xs py-2 search-top">
    <div class="text-center">
      <h2>
        <label class="text-bold">Github</label>
        <label class="text-italic"> Search</label>
      </h2>
    </div>

    <form @submit.prevent="searchUser(user)">
      <div class="input-group">
        <input
          type="search"
          class="form-input"
          v-model="user.name"
        />
        <button class="btn btn-primary input-group-btn">
          <i class="icon icon-search"></i>
        </button>
      </div>
    </form>
    <UserTile v-if="profile != undefined" v-bind:profile="profile" />

    <div v-else class="empty">
      <div class="empty-icon">
        <i class="icon icon-people"></i>
      </div>

      <p class="empty-title h5">Você não pesquisou por ninguém.</p>
      <p class="empty-subtitle">Tente começando com: "jennymont"</p>
    </div>
  </div>
</template>

<script>
// import Profile from "@/pages/Profile.vue";
import UserTile from "@/components/UserTile.vue";
import api from "@/services/api.js";

export default {
  name: "HomePage",
  components: { UserTile },
  data() {
    return {
      user: {},
      profile: undefined,
    };
  },
  methods: {
    searchUser(user) {
      api.get(`/users/${user.name}`).then((response) => {
        this.profile = response.data;
      });
    },
  },
};
</script>