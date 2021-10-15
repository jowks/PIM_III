<template>
  <v-app>
    <v-navigation-drawer permanent app dark>
      <v-spacer />
      <div class="centered-div">
        <div class="centered-div">
          <router-link to="/">
            <!-- <v-img src="./assets/logo.png" style="max-width: 144px" /> -->
          </router-link>
        </div>
      </div>
      <v-divider />
      <!--  -->
      <v-spacer />
      <v-list nav>
        <router-link v-for="(item, i) in sidebar" :to="item.path" :key="i">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {},
  methods: {},
  data: () => ({
    sidebar: [
      { title: "Home", icon: "mdi-home-city", path: "/" },
      { title: "Condomínios", icon: "mdi-home-city", path: "/condominios" },
      { title: "Pessoas", icon: "mdi-account-group", path: "/pessoas" },
      { title: "Containers", icon: "mdi-package-variant", path: "/containers" },
    ],
  }),
};
</script>

<style>
.centered-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.v-toolbar {
  flex: none !important;
}

.v-application a {
  color: undefined;
  text-decoration: none !important;
}

.btn__size {
  width: 100% !important;
  height: 100% !important;
}

.select__items {
  display: flex;
  align-items: center;
  justify-content: center;
}

.max-width {
  max-width: 1100px !important;
}

#app {
  background: #f0f0f0;
}
* {
  font-family: monospace;
}
</style>
