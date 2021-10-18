import api from "../../services/api";

const state = {
  pessoas: [],
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
    cpf_1: "",
    type: "",
    name: "",
    condominios: [],
  },
  defaultItem: {
    id: "",
    cpf_1: "",
    type: "",
    name: "",
    condominios: [],
  },
};

const getters = {
  editItem: (state) => state.editItem,
  pessoas: (state) => state.pessoas,
};

const actions = {
  async fetch({ commit }) {
    await api
      .get("/pessoas")
      .then(({ data }) => commit("SET_STATE", { prop: "pessoas", attr: data }))
      .catch((e) => console.log(e));
  },
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
  async erase({ dispatch, state }) {
    await api
      .delete("/pessoas", { data: { id: state.editItem.id } })
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
        .put("/pessoas", item)
        .then(() => {
          dispatch("fetch");
          dispatch("cancel");
        })
        .catch((e) => console.log(e));
      return;
    }

    await api
      .post("/pessoas", item)
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
