<template>
  <div class="message" v-bind:class="alignment">
    <span>
      {{ message.text }}
    </span>
    <span class="message-time">
      {{ getDateString(message.date?.seconds) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import IMessage from "@/interfaces/Message";

export default defineComponent({
  name: "MessageDetail",
  props: {
    message: {
      required: true,
      type: Object as PropType<IMessage>,
    },
  },
  setup(props) {
    const getDateString = (seconds?: number) => {
      return new Date(
        (seconds ?? new Date().getTime() / 1000) * 1000
      ).toLocaleString("es-ES", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
        day: "numeric",
        month: "short",
        weekday: "short",
      });
    };

    return {
      ...toRefs(props),
      getDateString,
    };
  },
  computed: {
    alignment: function () {
      return this.message.isReceiver ? "message--receiver" : "message--sender";
    },
  },
});
</script>

<style lang="css" scoped>
@import url("../../assets/styles/variables.css");

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 7px;
  width: fit-content;
  margin-right: 10px;
}

.message--sender {
  align-self: flex-end;
  color: var(--fontColor);
  background: var(--assetColorOne);
}

.message--receiver {
  align-self: flex-start;
  color: var(--fontColor);
  background: var(--assetColorThree);
}

.message-time {
  display: flex;
  font-weight: lighter;
  flex-direction: column;
  align-items: flex-end;
  font-size: 10px;
  margin-right: 0px;
}
</style>
