<template>
  <nav>
    <v-toolbar dark class="indigo">
      <v-toolbar-title class="headline">
        <span>News App</span>
        <v-btn small color="primary" v-on:click="goToHistory()">View History</v-btn>
      </v-toolbar-title>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  props: {},
  components: {},
  methods: {
    goToHistory() {
      this.$router.push("/newshistory");
    }
  }
};
</script>

<style>
</style>