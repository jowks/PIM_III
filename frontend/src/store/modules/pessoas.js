const state = {
  pessoas: [
    {
      id: 1,
      cpf: "",
      name: "Joao 1",
      type: "S",
      condominios: [
        { id: 2, name: "Container 2" },
        { id: 5, name: "Container 5" },
      ],
    },
    {
      id: 2,
      cpf: "",
      name: "Joaquim 2",
      type: "Z",
      condominios: [],
    },
    {
      id: 3,
      cpf: "",
      name: "Jobel 3",
      type: "M",
      condominios: [],
    },
    {
      id: 4,
      cpf: "",
      name: "Jetulho 4",
      type: "Z",
      condominios: [],
    },
  ],
  headerPessoas: [
    { text: "Tipo", width: "10%", value: "type", sortable: true },
    { text: "Nome", value: "name", sortable: true },
    {
      text: "Condominios",
      width: "20%",
      align: "center",
      value: "condominios.length",
      sortable: false,
    },
  ],
  editIndex: -1,
  editItem: {
    id: "",
    name: "",
    address: "",
    condominios: [],
  },
  defaultItem: {
    id: "",
    name: "",
    address: "",
    condominios: [],
  },
};

const getters = {
  editItem: (state) => state.editItem,
  pessoas: (state) => state.pessoas,
};

const actions = {
  atRowClick({ commit, state }, props) {
    let idx = state.pessoas.findIndex((v) => v == props);

    commit("SET_STATE", {
      prop: "editIndex",
      attr: idx,
    });
    commit("SET_STATE", {
      prop: "editItem",
      attr: Object.assign({}, props),
    });
  },
  cancel({ commit, state }) {
    commit("SET_STATE", {
      prop: "editIndex",
      attr: -1,
    });
    commit("SET_STATE", {
      prop: "editItem",
      attr: Object.assign({}, state.defaultItem),
    });
  },
  erase() {},
  save() {},
};

const mutations = {
  SET_STATE(state, { prop, attr }) {
    state[prop] = attr;
  },
  SET_SUB_STATE(state, { prop, sub, attr }) {
    state[prop][sub] = attr;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
