<template>
  <!-- <v-row justify="space-around">
      <v-col cols="12">
        <v-select v-model="color" :items="colors" label="Color"></v-select>
      </v-col>

      <v-switch v-model="drawer" class="ma-2" label="v-model"></v-switch>

      <v-switch v-model="permanent" class="ma-2" label="Permanent"></v-switch>

      <v-switch v-model="miniVariant" class="ma-2" label="Mini variant"></v-switch>

      <v-switch v-model="expandOnHover" class="ma-2" label="Expand on hover"></v-switch>

      <v-switch v-model="background" class="ma-2" label="Background"></v-switch>

      <v-switch v-model="right" class="ma-2" label="Right"></v-switch>
  </v-row>-->

  <div>
    <v-navigation-drawer
      :width="330"
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :permanent="permanent"
      :src="bg"
      absolute
      dark
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <!-- <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>-->

          <v-list-item-content>
            <v-list-item-title>Other Headlines</v-list-item-title>

            <!-- <v-list-item-subtitle>Subtext</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="headline in headlines" :key="headline.name" link>
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>-->

          <v-list-item-content>
            <v-list-item-title>
              <span v-on:click="goToHeadline(headline)">{{ headline.title.substring(0, 35) }}</span>
              <span v-on:click="edit(headline.title)" style="padding-left: 35px;">
                <v-icon>{{ editFont }}</v-icon>
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { data } from "../shared";
import { mdiPuzzleEdit } from "@mdi/js";

export default {
  data() {
    return {
      headlines: [],
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" }
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      editFont: mdiPuzzleEdit,
      childMessage: ""
    };
  },

  async created() {
    await this.loadHeadlines();
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  methods: {
    async loadHeadlines() {
      await data.getNews().then(res => {
        this.headlines = res["data"]["articles"];
      });
    },
    goToHeadline(headline) {
      // this.$emit("newlySelectedHeadline", headline);
      this.$emit("newlySelectedHeadline", headline);
    },
    edit(value) {
      console.log(value);
    }
  }
};
</script>