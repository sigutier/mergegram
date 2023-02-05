<template>
  <div class="home">
    <img class="logo" alt="logo" src="../assets/logo-mergenarias-round.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
});
</script>

<style scoped>
.home {
  background-color: antiquewhite;
}

.logo {
  width: 500px;
}
</style>
