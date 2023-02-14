<template>
  <div class="search">
    <input type="text" placeholder="Buscar..." class="input-search" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="css" scoped>
@import url("../assets/styles/variables.css");

.search input[type="text"] {
  padding: 10px;
  width: 90%;
  background: var(--backgroundColorMessages);
  border: none;
  outline: none;
  color: var(--fontColor);
}
.search input[type="text"]::placeholder {
  color: var(--fontColor);
}
</style>
