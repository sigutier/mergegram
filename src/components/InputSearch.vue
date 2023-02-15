<template>
  <div class="search">
    <input type="text" placeholder="Buscar..." v-model="searchText" class="input-search"
      @keyup.enter="searchMessages" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { db } from "@/firebase";
import IMessage from "@/interfaces/Message";

export default defineComponent({
  setup() {
    const store = useStore();
    const searchText = ref<string>("");

    const searchMessages = async (): Promise<void> => {

      console.log(searchText.value);

      const messages: IMessage[] = [];
      const sentMessages = await db
        .collection("messages")
        .where("senderId", "==", store.state.user.uid)
        .where("receiverId", "==", store.state.recipientUid)
        .get();
      sentMessages.forEach((data) => {
        const { date, type, text, senderId, receiverId } =
          data.data() as IMessage;
        messages.push({
          date,
          type,
          text,
          senderId,
          receiverId,
          isReceiver: false,
        });
      });

      const receivedMessages = await db
        .collection("messages")
        .where("senderId", "==", store.state.recipientUid)
        .where("receiverId", "==", store.state.user.uid)
        .get();
      receivedMessages.forEach((data) => {
        const { date, type, text, senderId, receiverId } =
          data.data() as IMessage;
        messages.push({
          date,
          type,
          text,
          senderId,
          receiverId,
          isReceiver: true,
        });
      });

      console.log(messages.filter(x => x.text.includes(searchText.value)));
      store.commit("setMessages", messages.filter(x => x.text.includes(searchText.value)));
    };
    return {
      searchMessages,
      searchText
    };
  }


});
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
