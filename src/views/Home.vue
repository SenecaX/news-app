<template>
  <div class="home">
    <v-container fluid>
      <v-row>
        <v-col :cols="2">
          <Sources v-on:selectedSource="onClickSelectedSource" class="mobile-view"></Sources>
        </v-col>

        <v-col :cols="10" class="justify-content">
          <h1>Headlines</h1>

          <v-flex xs6>
            <v-text-field v-model="search" label="Search" @keyup="updateData();"></v-text-field>
          </v-flex>
          <v-row align="center" justify="center">
            <v-progress-circular
              v-if="loading"
              :size="50"
              color="primary"
              indeterminate
              class="progress-style"
            ></v-progress-circular>
          </v-row>
          <v-layout row v-if="fetchedData" class="space-around">
            <v-flex
              lg3
              v-for="(item, index) in news.data.articles"
              :key="item.id"
              class="space-bottom"
            >
              <v-card class="mx-auto selection card-style" outlined>
                <v-list-item three-line>
                  <v-list-item-content
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
import moment from "moment";

export default {
  name: "Home",
  components: {
    Sources
  },
  data() {
    return {
      rowLength: 4,
      fetchedData: false,
      newsObj: null,
      search: "",
      loading: true
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
      this.loading = false;
    },
    readMore() {
      this.readMore = true;
    },
    swapCondition(index) {
      if (
        index !== -1 ||
        (index !== undefined && Object.keys(this.newsObj).length !== 0)
      ) {
        if (this.fetchedData) {
          let card1 = `
           <div class="infoText">
                <div>${moment(this.newsObj[index]?.publishedAt).format(
                  "DD.MM.YYYY"
                )}</div>
                <h1 class="card-title">${this.newsObj[index]?.title.slice(
                  0,
                  25
                )}</h1>
                <v-spacer></v-spacer>
                <div class="content">
                  ${this.newsObj[index]?.content &&
                    this.newsObj[index]?.content.slice(0, 100)}...
                </div>
              </div>
      `;

          let card2 = `
            <div class="card img">
                    <img src="${this.newsObj[index]?.urlToImage}" alt="image"/>
            </div>
      `;

          if (this.newsObj[index]) {
            //TODO: to refactor
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
      this.newsObj = this.getNewsBySourceName(value);
    },
    async updateData() {
      let deconstructObj;
      if (this.search) {
        deconstructObj = await data.getSearchHeadline(this.search);
        this.newsObj = deconstructObj.data?.articles;
      } else {
        await this.loadNews();
      }
    }
  }
};
</script>

<style>
.space-bottom {
  margin-bottom: 20px;
}

.space-around {
  justify-content: space-around;
}

.selection {
  cursor: pointer;
}

.selection:hover {
  background: #1e88e5;
}

img {
  height: 200px;
  width: 280px;
}

.card-style {
  height: 200px;
  width: 280px;
}

.card-style:hover {
  color: white;
}

.v-list-item {
  padding: 0;
}

.v-list-item__content {
  padding: 0;
}

.v-list-item__content:hover {
  color: white;
}

.subtitle-style {
  height: 148px;
  color: white !important;
}

.infoText {
  padding-top: 4em;
  padding-left: 2em;
  padding-right: 2em;
  display: flex;
  flex-direction: column;
  font-size: small;
  color: #666;
}

.infoText:hover {
  color: white;
}

.card-title {
  font-size: 1em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.content {
  font-size: 1em;
}

.card .img {
  height: 200px;
}

.progress-style {
  margin-top: 10em;
}

@media only screen and (min-width: 1024px) {
  .justify-content {
    padding-right: 4em;
  }
}

@media only screen and (max-width: 1024px) {
  .mobile-view {
    display: none;
  }
}
</style>