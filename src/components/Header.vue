<template>
  <nav>
    <v-toolbar dark class="indigo">
      <v-toolbar-title class="headline">
        <span>News App</span>
        <button v-on:click="goToHistory()">View History</button>
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