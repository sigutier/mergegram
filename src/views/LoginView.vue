<template>
  <!--     <h1>Iniciar sesión</h1> -->
  <LoginComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "@/components/LoginComponent.vue";

export default defineComponent({
  components: {
    LoginComponent,
  },
});
</script>