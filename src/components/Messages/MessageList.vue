
<template>
    <div class="messages">
        Esta es la lista de mensajes de ese usuario.
        <MessageDetail v-for="message in aMessages" :message="message" :key="message.userUid"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed} from "vue";
import { useStore } from "vuex";
import MessageDetail from '@/components/Messages/MessageDetail.vue';

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
</style>