<template>
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
      <v-list dense nav class="py-0" v-if="sources.data">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-content>
            <v-list-item-title>List of sources</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="source in sources.data.sources"
          :key="source.name"
          link
          v-on:click="selectSource($event, source)"
        >
          <v-list-item-content>
            <v-list-item-title v-on:click="gotoSource(source)">{{ source.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

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
      background: false,
      listOfSources: [],
      isSelected: true,
      sourceName: undefined,
      sourceObj: null,
      arrOfSources: []
    };
  },
  computed: {
    ...mapGetters(["getNewsBySourceName"]),
    ...mapState(["sources"]),
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  async created() {
    await this.loadSources();
  },
  methods: {
    ...mapActions(["getSourcesAction"]),
    async loadSources() {
      await this.getSourcesAction();
    },
    gotoSource(source) {
      this.listOfSources.push(source);
      this.$emit("selectedSource", "test");
    },
    selectSource(event, source) {
      //TODO: refactor

      this.$emit("selectedSource", source.name);

      this.isSelected = !this.isSelected;
      this.sourceName = "test";
      //todo: refactor
      event.target.style.backgroundColor = "#fff";
      event.target.style.color = "blue";
      event.target.style.paddingTop = "10px";
      event.target.style.paddingBottom = "10px";
      event.target.style.paddingLeft = "10px";
    }
  }
};
</script>