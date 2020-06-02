<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col :cols="2">
          <Sources v-on:selectedSource="onClickSelectedSource"></Sources>
        </v-col>

        <v-col :cols="10" class="justify-content">
          <h1>Headlines</h1>
          <v-layout row v-if="fetchedData">
            <v-flex
              lg3
              v-for="(item, index) in news.data.articles"
              :key="item.id"
              class="space-bottom"
            >
              <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item three-line>
                  <v-list-item-content
                    height="400px"
                    v-html="swapCondition(index)"
                    v-on:click="selectedHeadling(item)"
                  ></v-list-item-content>
                </v-list-item>
              </v-card>
            </v-flex>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import { data } from "../shared";
import Sources from "@/components/Sources.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Sources
  },
  data() {
    return {
      // news: [
      //   {
      //     author: "",
      //     urlToImage: ""
      //   }
      // ],
      selectingSource: "",
      receivingFromChild: "",
      overlay: false,
      rowLength: 4,
      fetchedData: false,
      imgObj: {
        hasImg: false,
        noImg: false
      },
      newsObj: null
    };
  },
  async created() {
    await this.loadNews();
  },
  mounted() {
    // Object.assign({}, this.newsObj);
    // console.log("this", this.news);
    // console.log(this.news.data.article);
  },
  computed: {
    // news() {
    //   return this.$store.state.news;
    // }
    ...mapGetters(["getNewsBySourceName"]),
    ...mapState(["news"])
  },
  methods: {
    ...mapActions(["getNewsAction", "addHistoryAction"]),
    async loadNews() {
      // await data.getNews().then(res => {
      //   // this.news = res["data"]["articles"];

      //   this.fetchedData = true;
      // });
      await this.getNewsAction();
      this.fetchedData = true;
    },
    readMore() {
      this.readMore = true;
    },
    swapCondition(index) {
      if (index !== -1) {
        if (this.fetchedData) {
          let card1 = `
           <v-list-item-content height="400px">
            <v-list-item-title>${this.news.data.articles[index].source.name}</v-list-item-title>
                <v-list-item-subtitle>${this.news.data.articles[index].publishedAt}</v-list-item-subtitle>
                <v-list-item-title>${this.news.data.articles[index].title}</v-list-item-title>
               


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
                    <img src="${this.news.data.articles[index].urlToImage}" alt="image"/>
            </v-list-item-content>
      `;

          if (this.news.data.articles[index]) {
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
    },
    async selectedHeadling(item) {
      await this.addHistoryAction(item);

      this.$router.push({
        name: "SelectedHeadline",
        params: { selected: item }
      });
    },
    onClickSelectedSource(value) {
      // console.log(value);
      this.receivingFromChild = this.getNewsBySourceName(value);

      if (this.receivingFromChild) {
        // this.news.data.article.push(this.receivingFromChild);
      }
      // this.swapCondition(this.receivingFromChild);
      // console.log("selecting", this.receivingFromChild);
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

@media only screen and (min-width: 1024px) {
  .justify-content {
    padding-right: 4em;
  }
}
</style>