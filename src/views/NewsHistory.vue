<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col :cols="10">
          <h1>View navigation history</h1>
          <v-layout row v-for="(item, index) in test" :key="item.title">
            <p>
              <span>{{index +1}}</span>
              {{item.title}}
            </p>
            <div>
              <!-- <img :src="this.news.urlToImage" alt="image" style="width: 50%; height: 50vh;" /> -->
            </div>
            <!-- <p>{{this.news.publishedAt}}</p>
            <p>{{this.news.content}}</p>-->
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
      test: null
    };
  },
  created() {
    this.loadHistory();

    console.log(this);
  },
  computed: {
    // ...mapState(["getNewsHistory"]),
    ...mapGetters(["getNewsHistory"])
  },
  methods: {
    // ...mapActions(["getNewsHistoryAction"]),
    loadHistory() {
      // await this.getNewsHistory();
      this.test = this.getNewsHistory();
      this.test.forEach(element => {
        console.log(element);
      });
    }
  }
};
</script>

<style>
</style>