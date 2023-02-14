<template>
  <div class="container-messages">
    <MessageDetail
      v-for="message in aMessages"
      :message="message"
      :key="message.recipientUid"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import MessageDetail from "@/components/Messages/MessageDetail.vue";

export default defineComponent({
  name: "MessageList",
  components: {
    MessageDetail,
  },
  setup() {
    const store = useStore();
    const aMessages = computed(() => store.state.messages);
    return {
      //chat,
      aMessages,
    };
  },
});
</script>

<style lang="css" scoped>
@import url("../../assets/styles/variables.css");

.container-messages {
  height: calc(100vh - 104px);
  /* height: 90vh; */
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

.container-messages::-webkit-scrollbar {
  display: none;
}
</style>
