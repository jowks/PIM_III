<template>
  <v-container>
    <v-row dense>
      <v-col cols="8">
        <CustomDataTable
          :items="pessoas"
          :headers="headerPessoas"
          @clickedRow="clickedRow"
        >
          <template v-slot:top>
            Pessoas
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
            <v-text-field v-model="editItem.cpf_1" label="CPF" maxLength="11" />
            <v-radio-group v-model="editItem.type" row>
              <v-radio label="Morador" value="M"></v-radio>
              <v-radio label="Síndico" value="S"></v-radio>
              <v-radio label="Zelador" value="Z"></v-radio>
            </v-radio-group>
            <v-autocomplete
              v-model="editItem.condominios"
              :items="condominios"
              item-text="name"
              item-value="id"
              label="Condominios"
              multiple
              chips
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
              :disabled="!editItem.name || !editItem.cpf_1 || !editItem.type"
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
  name: "Pessoas",
  computed: {
    ...mapState("pessoas", ["editIndex", "headerPessoas"]),
    ...mapGetters("pessoas", ["editItem", "pessoas"]),
    ...mapGetters("condominios", ["condominios"]),
  },
  components: { CustomCrud, CustomDataTable },
  methods: {
    clickedRow(val) {
      this.atRowClick(val);
    },
    ...mapActions("condominios", {
      fetchCondominios: "fetch",
    }),
    ...mapActions("pessoas", [
      "cancel",
      "erase",
      "save",
      "atRowClick",
      "fetch",
    ]),
  },
  created() {
    this.fetch();
    this.fetchCondominios();
  },
};
</script>
