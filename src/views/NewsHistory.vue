<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col :cols="10" :align="justify">
          <h1>View navigation history</h1>
          <v-layout row v-for="(item, index) in history" :key="item.title">
            <p class="paragraph-style">
              <span>{{index +1}}</span>
              {{item.title}}
            </p>
            <div></div>
          </v-layout>
          <v-layout row v-if="noHistory">
            <h2 class="no-history">No History.</h2>
            <div></div>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  props: {
    source: String
  },
  data() {
    return {
      history: null,
      noHistory: null
    };
  },
  created() {
    this.loadHistory();
    if (Object.keys(this.history).length === 0) {
      this.noHistory = true;
    }
  },
  computed: {
    ...mapGetters(["getNewsHistory"])
  },
  methods: {
    loadHistory() {
      this.history = this.getNewsHistory();
    }
  }
};
</script>

<style>
.paragraph-style {
  margin-top: 3em;
}

.no-history {
  margin-left: 0.6em;
  margin-top: 3em;
  font-size: 1.5em;
}

@media only screen and (max-width: 1024px) {
  .paragraph-style {
    margin-left: 3em;
  }
}
</style>