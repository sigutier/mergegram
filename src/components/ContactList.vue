<template>
  <div class="contacts">
    <ul class="contactList">
      <li :class="{
        active: loggedPhone === user.userUid
      }" v-for="user in orderedUsers" :key="user.userUid" @click="setRecipientUid(user)">
        <img :src="user.photo" :alt="`Avatar de ${user.name}`" :title="`Avatar de ${user.name}`" width="65"
          height="65" />
        <section class="info">
          <div class="name">{{ user.name }}</div>
          <div class="lastMessage">
            <span>
              {{ user.lastMessageText + ' ' }}
            </span>
            <span class="message-time">
              {{ getDateString(user.lastMessageDate?.seconds) }}
            </span>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import IUser from '@/interfaces/Users';
import { db, firebase } from '@/firebase';
import IMessage from "@/interfaces/Message";

export default defineComponent({
  setup() {
    const aUsers = ref<IUser[]>([]);
    const cUsers = db.collection('users');
    const store = useStore();
    const loggedPhone = computed(() => store.state.recipientUid);

    const setRecipientUid = (user: IUser) => {
      store.commit('setRecipientUid', user.userUid);
      store.dispatch('getMessages');
    };

    const getDateString = (seconds?: number) => {
      return new Date((seconds ?? new Date().getTime() / 1000) * 1000).toLocaleString('es-ES', {
        timeZone:
          'Europe/Madrid', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', weekday: 'short'
      });
    }

    // trae los segundos de timestamp de firebase y convierte de string a int
    const getSecondsDb = (timestamp: any) => {
      if (timestamp != undefined)
        return parseInt(timestamp.seconds);
      else
        return 1;
    };
    // trae el timestamp de firebase y lo convierte a formato fecha de España.
    const getTimeStamp = (timestamp: any) => {
      let date: Date | undefined;
      if (timestamp != undefined)
        date = new Date(timestamp.seconds * 1000);
      else
        date = undefined;
      if (date != undefined)
        return date.toLocaleString('es-ES', {
          timeZone:
            'Europe/Madrid', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short', weekday: 'short'
        });
      else
        return "";
    };


    onMounted(async () => {
      const querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await cUsers.where("userUid", "!=", store.state.user.uid).get();
      querySnapshot.forEach(async (data: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {

        const {
          photo, name, userUid, date, phoneNumber
        } = data.data();

        const aMessages: IMessage[] = [];

        // trae los mensajes de la base de datos
        const cMessages = await db
          .collection("messages")
          .orderBy("date", "desc")
          .where("receiverId", "==", userUid)
          .where("senderId", "==", store.state.user.uid)
          .limit(1)
          .get();

        // por cada mensaje, se guarda la información en un array de mensajes
        cMessages.forEach((data) => {
          const { date, type, text, receiverId, senderId, isReceiver } = data.data();
          aMessages.push({
            date,
            type,
            text,
            receiverId,
            senderId,
            isReceiver
          });
        });

        // crea dos variables y se trae la fecha y el texto del último mensaje.
        let lastMessageDate: any;
        let lastMessageText = "";

        if (aMessages.length > 0) {
          lastMessageDate = aMessages[0].date;
          lastMessageText = aMessages[0].text;
        }

        aUsers.value.push({
          photo,
          name,
          userUid,
          date,
          lastMessageDate,
          lastMessageText
        });
      });
    });

    return {
      aUsers,
      loggedPhone,
      setRecipientUid,
      getDateString,
      getTimeStamp,
      getSecondsDb
    };
  },
  // crea una variable orderedUsers donde se guardan en orden los mensajes traidos de fb.
  computed: {
    orderedUsers: function (): IUser[] {
      return this.aUsers.slice().sort((a: IUser, b: IUser) => {
        return this.getSecondsDb(b.lastMessageDate) -
          this.getSecondsDb(a.lastMessageDate);
      });
    }
  }
});
</script>

<style lang="css" scoped>
@import url("../assets/variables.css");

.contacts {
  width: 100%;
}

.contactList {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

li {
  width: 95%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  margin-bottom: 10px;
  border-radius: 2px;
  cursor: pointer;
}

img {
  border-radius: 50%;
}

.info {
  padding: 10px;
  display: flex;
  width: calc(100% - 65px);
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.name {
  font-size: 16px;
}

.lastMessage {
  font-size: 14px;
}

.active {
  background: var(--fontColorActive);
}
</style>
