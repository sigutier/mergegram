<template>
  <div class="home">
    <section class="contactList">
      Contactos
      <BrowseInput />
      <ContactList />
    </section>
    <section class="messages">Mensajes</section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BrowseInput from "@/components/BrowseInput.vue";
import ContactList from "@/components/ContactList.vue";

export default defineComponent({
  name: "HomeView",
  components: { BrowseInput, ContactList },
});
</script>

<style lang="css" scoped>
@import url("../assets/variables.css");
.home {
  background: var(--backgroundColor);
  width: 100%;
  height: 100vh;
  color: var(--fontColor);
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}
.contactList {
  width: 35%;
  display: flex;
  flex-direction: column;
}
.messages {
  width: 65%;
  background: var(--backgroundColorMessages);
  height: 100vh;
}
</style>
