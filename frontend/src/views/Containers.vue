<template>
  <v-container>
    <v-row dense>
      <v-col cols="8">
        <CustomDataTable
          :items="containers"
          :headers="headerContainers"
          @clickedRow="clickedRow"
        >
          <template v-slot:top>
            Containers
          </template>
        </CustomDataTable>
      </v-col>
      <v-col cols="4">
        <CustomCrud>
          <template v-slot:header>
            {{ editIndex !== -1 ? "Editar Cadastro" : "Novo Cadastro" }}
          </template>
          <template v-slot:body>
            <v-text-field v-model="editItem.name" label="Nome" />
            <v-text-field v-model="editItem.local" label="Local" disabled />
          </template>
          <template v-slot:actions>
            <v-btn v-if="editIndex !== -1" outlined color="red">Apagar</v-btn>
            <v-btn
              @click="save()"
              outlined
              :disabled="!editItem.name || !editItem.address"
              color="green"
            >
              {{ editIndex !== -1 ? "Alterar" : "Salvar" }}
            </v-btn>
          </template>
        </CustomCrud>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import CustomCrud from "../components/CustomCrud.vue";
import CustomDataTable from "../components/CustomDataTable.vue";

export default {
  name: "Containers",
  computed: {
    ...mapState("containers", ["editIndex", "headerContainers"]),
    ...mapGetters("containers", ["editItem", "containers"]),
  },
  components: { CustomCrud, CustomDataTable },
  methods: {
    clickedRow(val) {
      this.atRowClick(val);
    },
    ...mapActions("containers", ["atRowClick"]),
  },
};
</script>
