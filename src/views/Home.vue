<template>
  <div class="home">
    <v-container grid-list-lg>
      <h1>Headlines</h1>
      <!-- <v-layout row>
        <v-flex lg3 v-for="(item, index) in news" :key="item.id" class="space-bottom">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content  height="400px">
                <v-list-item-subtitle>{{item.publishedAt}}</v-list-item-subtitle>
                <v-list-item-title>{{item.title}}</v-list-item-title>

                <v-list-item-subtitle class="subtitle-style">
                  {{item.content && item.content.slice(0, 200)}}
                  <span>
                    <a href="#">Read more</a>
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-hover>
              <template v-slot:default="{ hover }">
                <v-list-item-content v-if="!swapCondition(index)">
                  <img :src="item.urlToImage" />

                  <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="#036358">
                      <v-btn>See more info</v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-list-item-content>
              </template>
            </v-hover>
          </v-card>
        </v-flex>
      </v-layout>-->

      <v-layout row>
        <v-flex lg3 v-for="(item, index) in news" :key="item.id" class="space-bottom">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content height="400px">{{swapCondition(index - 1)}}</v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { data } from "../shared";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      news: [
        {
          author: "",
          urlToImage: ""
        }
      ],
      overlay: false,
      rowLength: 4
    };
  },
  async created() {
    await this.loadNews();
    // console.log(this.news.data.articles);
    // this.news = this.news.data.articles;
  },
  methods: {
    async loadNews() {
      this.news = await data.getNews();
    },
    readMore() {
      this.readMore = true;
    },
    swapCondition(index) {
      if (!isNaN(index)) {
        return this.rowLength % 2 ||
          (this.rowLength * 2 + index) % (this.rowLength * 2) >= this.rowLength
          ? index % 2
            ? this.news[index]["author"]
            : this.news[index]["urlToImage"]
          : index % 2
          ? this.news[index]["urlToImage"]
          : this.news[index]["author"];
      }
    }
  }
};
</script>

<style>
.space-bottom {
  margin-bottom: 20px;
}

img {
  width: (100% - 30vw);
  height: 25vh;
}

.v-list-item {
  padding: 0;
}

.v-list-item__content {
  padding: 0;
}

.subtitle-style {
  height: 148px;
}
</style>