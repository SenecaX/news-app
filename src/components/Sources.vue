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
      :width="200"
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
            <v-list-item-title>List of sources</v-list-item-title>
            <!-- <v-list-item-subtitle>Subtext</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="source in sources.data.sources" :key="source.name" link>
          <!-- <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>-->

          <v-list-item-content>
            <v-list-item-title v-on:click="gotoSource(source)">{{ source.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
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
      background: false
    };
  },
  computed: {
    ...mapState(["sources"]),
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  async created() {
    await this.loadSources();
    console.log("sources", this.sources);
  },
  methods: {
    ...mapActions(["getSourcesAction"]),
    async loadSources() {
      // await data.getSources().then(res => {
      //   this.sources = res["data"]["sources"];
      // });
      await this.getSourcesAction();
    },
    gotoSource(source) {
      window.open(source.url);
    }
  }
};
</script>