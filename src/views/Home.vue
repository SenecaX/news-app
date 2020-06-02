<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col :cols="2">
          <Sources v-on:selectedSource="onClickSelectedSource"></Sources>
        </v-col>

        <v-col :cols="10" class="justify-content">
          <h1>Headlines</h1>

          <v-flex xs6>
            <v-text-field v-model="search" label="Search" @keyup="updateData();"></v-text-field>
          </v-flex>

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
import { data } from "../shared";

export default {
  name: "Home",
  components: {
    Sources
  },
  data() {
    return {
      selectingSource: "",
      receivingFromChild: "",
      overlay: false,
      rowLength: 4,
      fetchedData: false,
      imgObj: {
        hasImg: false,
        noImg: false
      },
      newsObj: null,
      search: ""
    };
  },
  async created() {
    await this.loadNews();
  },
  mounted() {},
  computed: {
    ...mapGetters(["getNewsBySourceName"]),
    ...mapState(["news"])
  },
  methods: {
    ...mapActions(["getNewsAction", "addHistoryAction"]),
    async loadNews() {
      await this.getNewsAction();
      if (this.news.data && this.news.data?.articles) {
        this.newsObj = { ...this.news.data.articles };
        this.fetchedData = true;
      }
    },
    readMore() {
      this.readMore = true;
    },
    swapCondition(index) {
      if (index !== -1) {
        if (this.fetchedData) {
          let card1 = `
           <v-list-item-content height="400px">
            <v-list-item-title>${this.newsObj[index]?.source.name}</v-list-item-title>
                <v-list-item-subtitle>${this.newsObj[index]?.publishedAt}</v-list-item-subtitle>
                <v-list-item-title>${this.newsObj[index]?.title}</v-list-item-title>
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
                    <img src="${this.newsObj[index]?.urlToImage}" alt="image"/>
            </v-list-item-content>
      `;

          if (this.newsObj[index]) {
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
      console.log("val", value);
      this.newsObj = this.getNewsBySourceName(value);
    },
    async updateData() {
      console.log(this.search);
      this.newsObj = await data.getSearchHeadline(this.search);
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