<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col :cols="2">
          <OtherHeadlines v-on:newlySelectedHeadline="otherHeadlinesClick"></OtherHeadlines>
        </v-col>

        <v-col :cols="10">
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
      receivingFromChild: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["addHistoryAction"]),
    async otherHeadlinesClick(value) {
      await this.addHistoryAction(value);
      this.receivingFromChild = value;
      this.news = this.receivingFromChild;
    }
  }
};
</script>

<style></style>