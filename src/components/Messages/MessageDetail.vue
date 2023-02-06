<template>
    <div class="message">
        {{ message.text }}
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs} from "vue";
import IMessage from '@/interfaces/Message';

export default defineComponent({
    name: "MessageDetail",
    props: {
        message: {
            required: true,
            default: Object as PropType<IMessage>,
        }
    },
    setup(props){
        return {
            ...toRefs(props),
        };
    },
});

</script>

<style lang="css" scoped>
</style>