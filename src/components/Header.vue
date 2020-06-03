<template>
  <nav>
    <v-toolbar dark class="indigo">
      <v-row>
        <v-col>
          <!-- <v-toolbar-title class="headline">
            <span <router-link="/"></router-link>>News App</span>
          </v-toolbar-title>-->
          <v-toolbar-title>
            <router-link class="headline" to="/">News App</router-link>
          </v-toolbar-title>
        </v-col>
        <v-col class="text-right">
          <v-btn small color="primary space" v-on:click="goToHistory()">View History</v-btn>
          <v-btn small color="primary" @click="wrongCall()">Wrong Api Call</v-btn>
        </v-col>
      </v-row>
    </v-toolbar>
  </nav>
</template>

<script>
import { data } from "../shared";
export default {
  props: {},
  components: {},
  methods: {
    goToHistory() {
      this.$router.push("/newshistory");
    },
    async wrongCall() {
      let wrongCall = await data.getWrongUrl();
      if (wrongCall.length === 0) {
        this.$toast.error("API broken. Please try later.");
      }
    }
  }
};
</script>

<style>
.space {
  margin-right: 2em;
}

.headline {
  text-decoration: none;
  color: #fff !important;
}
</style>