<template>
  <v-card>
    <v-card-title>
      <div class="text-overline">
        <slot name="top"></slot>
      </div>
      <v-spacer />

      <v-text-field
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :items="items"
      :headers="headers"
      :show-select="showSelect"
      single-select
      @click:row="clickedRow($event)"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "CustomDataTable",
  props: ["items", "headers", "showSelect"],
  methods: {
    clickedRow(evt) {
      this.$emit("clickedRow", evt);
    },
  },
};
</script>

<style lang="scss">
table > tbody > tr {
  cursor: pointer;
}
</style>
