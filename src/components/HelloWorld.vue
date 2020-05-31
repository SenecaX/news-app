<template>
  <div class="home">
    <v-container grid-list-lg>
      <h1>Headlines</h1>
      <v-layout row>
        <v-flex lg3 v-for="(item, index) in arr" :key="item.id" class="space-bottom">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content v-if="index % 2 === 0" height="400px">
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
                <v-list-item-content v-if="index % 2 !== 0">
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
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      arr: [
        {
          description: "description 1",
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          description: "description 2",
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          description: "description 3",
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          description: "description 4",
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          description: "description 1",
          imageUrl: "https://via.placeholder.com/150"
        },
        {
          description: "description 1",
          imageUrl: "https://via.placeholder.com/150"
        }
      ]
    };
  }
};
</script>

<style>
</style>