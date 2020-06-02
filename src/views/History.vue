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
export default {
  props: {
    source: String
  }
};
</script>

<style>
</style>