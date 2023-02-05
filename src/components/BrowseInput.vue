<template>
  <div class="browse">
    <input class="input" type="text" placeholder="Buscar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="css" scoped>
@import url("../assets/variables.css");

.input {
  padding: 10px;
  width: 90%;
  background: var(--backgroundColorMessages);
  border: none;
  outline: none;
  color: var(--fontColor);
}
input::placeholder {
  color: var(--fontColor);
}
</style>
