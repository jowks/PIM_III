const state = {
  containers: [
    { id: 1, name: "Container 1", local: "", available: true },
    { id: 2, name: "Container 2", local: "Condominio 1", available: false },
    { id: 3, name: "Container 3", local: "", available: true },
    { id: 4, name: "Container 4", local: "", available: true },
    { id: 5, name: "Container 5", local: "Condominio 1", available: false },
  ],
  headerContainers: [
    { text: "Disponível", width: "10%", value: "available", sortable: true },
    { text: "Nome", widht: "40%", value: "name", sortable: true },
    { text: "Local", value: "local", sortable: true },
  ],
  editIndex: -1,
  editItem: {
    id: "",
    name: "",
    local: "",
  },
  defaultItem: {
    id: "",
    name: "",
    local: "",
  },
};
const getters = {
  containers: (state) => state.containers,
  editItem: (state) => state.editItem,
  listAvailableContainers: (state) =>
    state.containers.reduce((acc, cur) => {
      cur.available ? acc.push(cur) : [];
      return acc;
    }, []),
};
const actions = {
  atRowClick({ commit, state }, props) {
    let idx = state.containers.findIndex((v) => v == props);

    commit("SET_STATE", {
      prop: "editIndex",
      attr: idx,
    });
    commit("SET_STATE", {
      prop: "editItem",
      attr: Object.assign({}, props),
    });
  },
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
