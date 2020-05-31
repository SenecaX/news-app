<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col :cols="2">
          <OtherHeadlines></OtherHeadlines>
        </v-col>

        <v-col :cols="10">
          <v-layout row>
            <h1>{{this.selected.title}}</h1>
            <div>
              <img :src="this.selected.urlToImage" alt="image" style="width: 50%; height: 50vh;" />
            </div>
            <p>{{this.selected.publishedAt}}</p>
            <p>{{this.selected.content}}</p>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import OtherHeadlines from "@/components/OtherHeadlines.vue";
export default {
  props: ["selected"],
  components: {
    OtherHeadlines
  },
  data() {
    return {
      news: this.selected
    };
  },
  created() {}
};
</script>

<style></style>