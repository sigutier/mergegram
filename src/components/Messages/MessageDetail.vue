<template>
  <div class="message" v-bind:class="alignment">
    <span>
      {{ message.text }}
    </span>
    <span class="message-time">
      {{
  new Date((message.date?.seconds ?? new Date().getTime() / 1000) * 1000).toLocaleString('es-ES', {
    timeZone:
      'Europe/Madrid', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', weekday: 'short'
  })
      }}
      <!-- {{ new Date((message.date?.seconds ?? Date.now)).toISOString().slice(11, 16) }} -->
    </span>
  </div>

</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import IMessage from '@/interfaces/Message';

export default defineComponent({
  name: "MessageDetail",
  props: {
    message: {
      required: true,
      type: Object as PropType<IMessage>,
    }
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
  computed: {
    alignment: function() {
        return this.message.isReceiver ? 'message--receiver' : 'message--sender';
    }
}
  
});

</script>

<style lang="css" scoped>
@import "~/src/assets/variables.css";

.message {
  color: var(--fontColor);
  background: var(--fontColorActive);
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 7px;
  width: fit-content;
  margin-right: 10px;
}

.message--sender {
  align-self: flex-end;
}

.message--receiver {
  align-self: flex-start;
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
