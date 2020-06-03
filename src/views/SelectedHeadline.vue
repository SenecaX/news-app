<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-progress-circular
          v-if="loading"
          :size="50"
          color="primary"
          indeterminate
          style="margin-top: 10em;"
        ></v-progress-circular>
      </v-row>
      <v-row>
        <v-col :cols="2">
          <OtherHeadlines
            v-on:newlySelectedHeadline="otherHeadlinesClick"
            class="sidebar-headlines"
          ></OtherHeadlines>
        </v-col>

        <v-col :cols="10" v-if="!loading">
          <v-layout row>
            <h1>{{this.news.title}}</h1>
            <div>
              <img :src="this.news.urlToImage" alt="image" style="width: 50%; height: 50vh;" />
            </div>
            <p>{{this.news.publishedAt}}</p>
            <p>{{this.news.content}}</p>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import OtherHeadlines from "@/components/OtherHeadlines.vue";
import { mapActions } from "vuex";

export default {
  props: ["selected"],
  components: {
    OtherHeadlines
  },
  data() {
    return {
      news: this.selected,
      receivingFromChild: "",
      loading: true
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
  methods: {
    ...mapActions(["addHistoryAction"]),
    async otherHeadlinesClick(value) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2500);
      await this.addHistoryAction(value);
      this.receivingFromChild = value;
      this.news = this.receivingFromChild;
    }
  }
};
</script>

<style>
.sidebar-headlines {
  height: 100vh;
}
</style>