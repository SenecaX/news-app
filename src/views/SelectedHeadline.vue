<template>
  <v-content>
    <v-container>
      <v-row align="center" justify="center">
        <v-progress-circular v-if="loading" :size="50" color="primary" indeterminate class="loader"></v-progress-circular>
      </v-row>
      <v-row>
        <v-col :cols="2" class="mobile-view">
          <OtherHeadlines
            v-on:newlySelectedHeadline="otherHeadlinesClick"
            class="sidebar-headlines"
          ></OtherHeadlines>
        </v-col>

        <v-col :cols="10" v-if="!loading">
          <v-layout row>
            <h1>{{this.news.title}}</h1>
            <div class="image-content">
              <img :src="this.news.urlToImage" alt="image" class="image-style" />
            </div>
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
      loading: true,
      noArticle: null
    };
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);

    if (this.news === undefined) {
      this.noArticle = true;
    }
  },
  methods: {
    ...mapActions(["addHistoryAction"]),
    async otherHeadlinesClick(value) {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
      }, 2500);

      await this.addHistoryAction(value);
      this.news = value;
    }
  }
};
</script>

<style>
.sidebar-headlines {
  height: 100vh;
}

.loader {
  margin-top: 10em;
}

.image-style {
  width: 50%;
  height: 35vh;
  margin: 0 auto;
}

.image-content {
  display: flex;
  justify-content: center;
  margin-bottom: 2em;
}

@media only screen and (max-width: 1024px) {
  .mobile-view {
    display: none;
  }
}
</style>