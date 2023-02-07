<template>
    <div class="message">
        {{ message.text }}
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
</style>
