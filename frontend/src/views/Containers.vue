<template>
  <v-container>
    <v-row dense>
      <v-col cols="8">
        <v-data-table
          :items="containers"
          :headers="headerContainers"
          single-select
          @click:row="clickedRow($event)"
        >
          <template v-slot:item.action="{ item }">
            <v-icon small :color="!item.local ? 'green' : 'red'">
              mdi-circle
            </v-icon>
          </template>
        </v-data-table>
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
            <v-btn
              v-if="editIndex !== -1"
              @click="cancel()"
              outlined
              color="blue"
            >
              Cancelar
            </v-btn>
            <v-btn
              v-if="editIndex !== -1"
              @click="erase()"
              outlined
              color="red"
            >
              Apagar
            </v-btn>
            <v-btn
              @click="save()"
              outlined
              :disabled="!editItem.name"
              :color="editIndex !== -1 ? 'orange' : 'green'"
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
// import CustomDataTable from "../components/CustomDataTable.vue";

export default {
  name: "Containers",
  computed: {
    ...mapState("containers", ["editIndex", "headerContainers"]),
    ...mapGetters("containers", ["editItem", "containers"]),
  },
  components: { CustomCrud /* CustomDataTable */ },
  methods: {
    clickedRow(val) {
      this.atRowClick(val);
    },
    ...mapActions("containers", [
      "cancel",
      "erase",
      "save",
      "atRowClick",
      "fetch",
    ]),
  },
  created() {
    this.fetch();
  },
};
</script>
