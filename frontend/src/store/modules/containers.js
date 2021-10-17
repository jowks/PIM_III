import api from "../../services/api";

const state = {
  containers: [
    { id: 1, name: "Container 1", local: "" },
    { id: 2, name: "Container 2", local: "Condominio 1" },
    { id: 3, name: "Container 3", local: "" },
    { id: 4, name: "Container 4", local: "" },
    { id: 5, name: "Container 5", local: "Condominio 1" },
  ],
  headerContainers: [
    {
      text: "Disponível",
      width: "10%",
      value: "action",
      align: "center",
      sortable: false,
    },
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
      if (!cur.local) acc.push(cur);
      return acc;
    }, []),
};
const actions = {
  async fetch({ commit }) {
    await api
      .get("/containers")
      .then(({ data }) =>
        commit("SET_STATE", { prop: "containers", attr: data })
      )
      .catch((e) => console.log(e));
  },
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
      .delete("/containers", { data: { id: state.editItem.id } })
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
        .put("/containers", item)
        .then(() => {
          dispatch("fetch");
          dispatch("cancel");
        })
        .catch((e) => console.log(e));
      return;
    }

    await api
      .post("/containers", item)
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
