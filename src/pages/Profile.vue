<template>
  <div class="main">
    <div class="sidenav container grid-xs py-2 search-top">
      <div class="text-center">
        <h2>
          <label class="text-bold">Github</label>
          <label class="text-italic"> Search</label>
        </h2>
      </div>
      <!-- <figure > -->
      <img class="s-circle" :src="profile.avatar_url" alt="..." />
      <!-- </figure> -->

      <div class="card" style="border: none">
        <div class="card-header">
          <div class="card-title h5 text-bold">{{ profile.name }}</div>
          <div class="card-subtitle text-gray">{{ profile.login }}</div>
        </div>

        <div class="card-body">
          <div class="container">
            <div class="columns">
              <div class="column col-1">
                <font-awesome-icon
                  icon="fa-solid fa-suitcase"
                  class="text-center"
                />
              </div>
              <div class="column col-6 text-small text-center">
                {{ profile.company }}
              </div>
            </div>
            <div class="columns">
              <div class="column col-1">
                <font-awesome-icon
                  icon="fa-solid fa-location-dot"
                  class="text-left"
                />
              </div>
              <div class="column col-7 text-small text-center">
                {{ profile.location }}
              </div>
            </div>

            <div class="columns">
              <div class="column col-1">
                <font-awesome-icon icon="fa-solid fa-box-archive" />
              </div>
              <div class="column col-3 text-small text-center">
                {{ profile.public_repos }}
              </div>
            </div>

            <div class="columns">
              <div class="column col-1">
                <font-awesome-icon
                  icon="fa-solid fa-user-group"
                  class="text-left"
                />
              </div>
              <div class="column col-3 text-small text-center">
                {{ profile.followers }}
              </div>
            </div>

            <div class="columns">
              <div class="column col-1">
                <font-awesome-icon icon="fa-solid fa-star" />
              </div>
              <div class="column col-3 text-small text-center">
                {{ stars }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer"></div>
      </div>
    </div>

    <div class="item">
      <div class="item-repository text-left">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title h2 text-bold">Repositórios</div>
          </div>
          <div class="panel-nav">
            <!-- navigation components: tabs, breadcrumbs or pagination -->
          </div>
          <div class="panel-body repos">
            <div v-for="(repo, index) in this.repos" :key="index" class="tile">
              <div class="tile-content">
                <p class="tile-title text-bold">{{ repo.name }}</p>
                <p class="tile-subtitle">
                  <font-awesome-icon icon="fa-solid fa-star" />
                  {{ repo.stargazers_count }} <br />
                  {{ repo.description }}
                </p>
              </div>
              <div class="tile-action">
                <button class="btn btn-primary">Join</button>
              </div>
            </div>
          </div>
          <div class="panel-footer">
            <!-- buttons or inputs -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.js";

import { library } from "@fortawesome/fontawesome-svg-core";

/* import specific icons */
/* add some free styles */
import {
  faLocationDot,
  faSuitcase,
  faUserGroup,
  faBoxArchive,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// <font-awesome-icon icon="fa-regular fa-face-smile" />
// https://api.github.com/users/pehgomes/starred/ n funciona
// https://api.github.com/users/pehgomes/starred funciona

library.add(faLocationDot, faSuitcase, faUserGroup, faBoxArchive, faStar);

export default {
  name: "ProfilePage",
  props: {
    profile: { type: Object },
  },
  data() {
    return {
      stars: 0,
      repos: [],
    };
  },
  mounted() {
    api.get(`/users/${this.profile.login}/starred`).then((response) => {
      this.stars = response.data.length;
    });

    api.get(`/users/${this.profile.login}/repos`).then((response) => {
      console.log(response.data);
      this.repos = response.data;
      this.repos.sort((a, b) => (a.stargazers_count > b.stargazers_count ? -1 : 1));
    });
  },
};
</script>

<style scoped>
.repos {
  max-height: 30rem;
}

.repos::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.card {
  text-align: left;
}

.item-repository {
  margin-top: 3rem;
}

img {
  max-width: 200px;
}

.main {
  display: grid;
  grid-template-columns: 1fr 3fr;
  max-width: 1200px;
  /* border: 0.5px solid #000; */
  margin: 0 auto;
  grid-gap: 20px;
  grid-template-areas: "sidenav item";
}

.sidenav {
  max-width: 300px;
  min-height: 200px;
  height: 900px;

  border-radius: 20px;
  grid-area: "sidenav";
  /* grid-row: sidenav; */
}

.item {
  /* max-width: 300px; */
  /* min-height: 200px; */
  height: 100%;
  width: 100%;
  margin: 0 auto;

  /* border: 1px solid #d1d0d0; */
  /* background-color: #333; */
  border-radius: 20px;

  /* grid-area: "item"; */
  /* grid-column: item; */
}

.footer {
  width: auto;
  height: 300px;
  background-color: #333;
  border-radius: 20px;

  grid-column: footer;
  grid-area: "footer";
}
</style>
