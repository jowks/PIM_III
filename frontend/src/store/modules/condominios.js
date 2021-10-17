import api from "../../services/api";

const state = {
  condominios: [
    {
      id: 1,
      name: "Condominio 1",
      address: "Jose Feliciano de Camargo Junior, 504",
      containers: [
        { id: 2, name: "Container 2" },
        { id: 5, name: "Container 5" },
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
    {
      text: "Containers",
      value: "containers.length",
      align: "center",
      sortable: false,
    },
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
  async fetch({ commit }) {
    await api
      .get("/condominios")
      .then(({ data }) =>
        commit("SET_STATE", { prop: "consominios", attr: data })
      )
      .catch((e) => console.log(e));
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
  async erase({ dispatch, state }) {
    await api
      .delete("/condominios", { data: { id: state.editItem.id } })
      .then(() => {
        dispatch("fetch");
        dispatch("cancel");
      })
      .catch((e) => console.log(e));
  },
  async save({ dispatch, state }) {
    const item = state.defaultItem;

    if (item.id) {
      await api
        .put("/condominios", item)
        .then(() => {
          dispatch("fetch");
          dispatch("cancel");
        })
        .catch((e) => console.log(e));
      return;
    }

    await api
      .post("/condominios", item)
      .then(() => {
        dispatch("fetch");
        dispatch("cancel");
      })
      .catch((e) => console.log(e));
    return;
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
