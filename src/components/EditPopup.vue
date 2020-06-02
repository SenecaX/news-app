<template>
  <span class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">{{ editFont }}</v-icon>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Modify the headline.</v-card-title>

        <v-text-field v-model="childData.title" :counter="100" label="headline" required></v-text-field>
        <span v-if="validate">
          <p style="font-size: 12px; color: red">Please enter a headling with length less than 100.</p>
        </span>

        <v-card-actions>
          <v-spacer></v-spacer>
          {{this.childData.title.length}}
          <v-btn color="primary" text @click="dialog = false" :disabled="validate">Modify</v-btn>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mdiPuzzleEdit } from "@mdi/js";

export default {
  props: ["parentData"],
  data() {
    return {
      dialog: false,
      editFont: mdiPuzzleEdit,
      childData: this.parentData
    };
  },
  computed: {
    validate() {
      if (this.childData.title.length > 100) {
        return true;
      }
      return false;
    }
  },
  created() {},
  methods: {}
};
</script>