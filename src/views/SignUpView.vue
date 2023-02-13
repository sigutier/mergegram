<template>
    <!--     <h1>Registrar usuario</h1> -->
    <SignUp />

</template>

<script lang="ts">
import { defineComponent } from "vue";
import SignUp from "@/components/SignUp.vue";


export default defineComponent({
    components: {
        SignUp
},
});
</script>