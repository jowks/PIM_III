<template>
  <v-card class="mx-auto" outlined>
    <v-list-item dense>
      <v-list-item-content>
        <div class="text-overline mb-4">
          <slot name="header"></slot>
        </div>
        <v-list-item-subtitle>
          <slot name="body"></slot>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-spacer />
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "CustomCrud",
};
</script>
