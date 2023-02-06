<template>
    <div class="sendMessage">
       <input type="text" v-model="text" @keypress.enter="sendMessage" width="100%" placeholder="Escribe tu mensaje...">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";
import { db, firebase } from '@/firebase';
import { useStore } from 'vuex';

export default defineComponent({
    name: "InputMessage",
    setup(){
        const text = ref<string>('');
        const cMessage = db.collection('messages');
        const sendMessage = async (): Promise<void> => {
            cMessage.add({
                type:'text',
                text: text.value,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                userUid: '',
            });
        };

        return {
            text,
            sendMessage,
        };
    },
});

</script>