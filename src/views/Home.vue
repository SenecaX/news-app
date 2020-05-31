<template>
  <div class="home">
    <v-container grid-list-lg>
      <h1>Headlines</h1>
      <v-layout row v-if="fetchedData">
        <v-flex lg3 v-for="(item, index) in 20" :key="item.id" class="space-bottom">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content height="400px" v-html="swapCondition(index)"></v-list-item-content>
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
      rowLength: 4,
      fetchedData: false,
      imgObj: {
        hasImg: false,
        noImg: false
      }
    };
  },
  async created() {
    await this.loadNews();
  },
  methods: {
    async loadNews() {
      await data.getNews().then(res => {
        this.news = res["data"]["articles"];
        this.fetchedData = true;
      });
    },
    readMore() {
      this.readMore = true;
    },
    swapCondition(index) {
      if (index !== -1) {
        console.log(index, "entered");
        if (this.fetchedData) {
          let card1 = `
           <v-list-item-content height="400px">
                <v-list-item-subtitle>${this.news[index].publishedAt}</v-list-item-subtitle>
                <v-list-item-title>${this.news[index].title}</v-list-item-title>

                <v-list-item-subtitle class="subtitle-style">
                  {{item.content && item.content.slice(0, 200)}}
                  <span>
                    <a href="#">Read more</a>
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
      `;

          let card2 = `
           <v-list-item-content>
                    <img src="${this.news[index].urlToImage}" alt="image"/>
                    <v-fade-transition>
                      <v-overlay v-if="hover" absolute color="#036358">
                        <v-btn>See more info</v-btn>
                      </v-overlay>
                    </v-fade-transition>
                  </v-list-item-content>
      `;

          if (this.news[index]) {
            return this.rowLength % 2 ||
              (this.rowLength * 2 + index) % (this.rowLength * 2) >=
                this.rowLength
              ? index % 2
                ? card1
                : card2
              : index % 2
              ? card2
              : card1;
          }
        }
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