<template>
  <v-container>
    <v-row dense>
      <v-col cols="8">
        <CustomDataTable
          :items="condominios"
          :headers="headerCondominios"
          @clickedRow="clickedRow"
        >
          <template v-slot:top>
            Condomínios
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
            <v-text-field v-model="editItem.address" label="Endereço" />
            <v-autocomplete
              v-model="editItem.containers"
              :items="containers"
              item-text="name"
              label="Containers"
              chips
              multiple
            />
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
              :disabled="!editItem.name || !editItem.address"
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
import CustomDataTable from "../components/CustomDataTable.vue";

export default {
  name: "Condominios",
  computed: {
    ...mapState("condominios", ["editIndex", "headerCondominios"]),
    ...mapGetters("condominios", ["editItem", "condominios"]),
    ...mapGetters("containers", ["containers"]),
  },
  components: { CustomCrud, CustomDataTable },
  methods: {
    clickedRow(val) {
      this.atRowClick(val);
    },
    ...mapActions("condominios", [
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
