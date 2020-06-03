<template>
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
          <v-list-item-content>
            <v-list-item-title>Other Headlines</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="headline in news.data.articles" :key="headline.name" link>
          <v-list-item-content>
            <v-list-item-title>
              <span v-on:click="goToHeadline(headline)">{{ headline.title.substring(0, 35) }}</span>
              <span v-on:click="edit(headline)" class="p-0">
                <EditPopup :parentData="headline"></EditPopup>
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
// import { data } from "../shared";
import { mdiPuzzleEdit } from "@mdi/js";
import { mapState, mapActions } from "vuex";
import EditPopup from "@/components/EditPopup.vue";

export default {
  components: {
    EditPopup
  },
  props: {},
  data() {
    return {
      drawer: true,
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      editFont: mdiPuzzleEdit,
      childMessage: "",
      parentData: {}
    };
  },

  async created() {
    await this.loadHeadlines();
  },
  computed: {
    ...mapState(["news"]),
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  },
  methods: {
    ...mapActions(["getNewsAction", "updateHeadlineAction"]),
    async loadHeadlines() {
      await this.getNewsAction();
    },
    goToHeadline(headline) {
      this.$emit("newlySelectedHeadline", headline);
    },
    edit(value) {
      this.parentData = value;
    }
  }
};
</script>

<style>
.p-0 {
  padding-left: 35px;
}
</style>