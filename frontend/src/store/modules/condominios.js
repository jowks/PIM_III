import api from "../../services/api";

const state = {
  condominios: [],
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
        commit("SET_STATE", { prop: "condominios", attr: data })
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
    const item = state.editItem;

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
