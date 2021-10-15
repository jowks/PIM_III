const state = {
  condominios: [
    {
      id: 1,
      name: "Condominio 1",
      address: "Jose Feliciano de Camargo Junior, 504",
      containers: [
        { id: 2, name: "Container 2", available: false },
        { id: 5, name: "Container 5", available: false },
      ],
    },
    {
      id: 2,
      name: "Condominio 2",
      address: " Rua 1, numero 2",
      containers: [],
    },
    {
      id: 3,
      name: "Condominio 3",
      address: "Rua 3, numero 1",
      containers: [],
    },
    {
      id: 4,
      name: "Condominio 4",
      address: "Rua 45, numero 2",
      containers: [],
    },
  ],
  headerCondominios: [
    { text: "Nome", value: "name", sortable: true },
    { text: "Endereço", value: "address", sortable: true },
    { text: "Containers", value: "containers.length", sortable: false },
  ],
  editIndex: -1,
  editItem: {
    id: "",
    name: "",
    address: "",
    containers: [],
  },
  defaultItem: {
    id: "",
    name: "",
    address: "",
    containers: [],
  },
};
const getters = {
  editItem: (state) => state.editItem,
  condominios: (state) => state.condominios,
  listAvailableCondominios: (state) =>
    state.condominios.reduce((acc, cur) => {
      if (!cur.containers.length) acc.push(cur);
      return acc;
    }, []),
};
const actions = {
  fetchCondominios({ commit }) {
    console.log(commit);
  },
  atRowClick({ commit, state }, props) {
    let idx = state.condominios.findIndex((v) => v == props);

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
