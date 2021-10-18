<template>
  <div>
    <v-row justify="center">
      <v-col cols="10">
        <h1 class="text-center">PIM III</h1>
        <h4 class="text-center">
          Sistema de Coleta de Óleo de Cozinha
        </h4>
      </v-col>
      <v-col cols="5">
        <CustomCard>
          <template v-slot:header>
            Containers Disponíveis
          </template>
          <template v-slot:body>
            <div class="text-center text-h2">
              <span style="color: green;">
                {{ listAvailableContainers.length }}
              </span>
              /
              <span>{{ containers.length }}</span>
            </div>
          </template>
        </CustomCard>
      </v-col>
      <v-col cols="5">
        <CustomCard>
          <template v-slot:header> Condomínios Disponíveis </template>
          <template v-slot:body>
            <div class="text-center text-h2">
              <span style="color: green;">
                {{ listAvailableCondominios.length }}
              </span>
              /
              <span> {{ condominios.length }} </span>
            </div>
          </template>
        </CustomCard>
      </v-col>
      <v-col cols="10">
        <CustomCard>
          <template v-slot:body>
            <v-calendar color="green" />
          </template>
        </CustomCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CustomCard from "../components/CustomCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { CustomCard },
  computed: {
    ...mapGetters("containers", ["listAvailableContainers", "containers"]),
    ...mapGetters("condominios", ["listAvailableCondominios", "condominios"]),
  },
  methods: {},
  created() {},
};
</script>
