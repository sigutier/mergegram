import { createStore } from "vuex";
import { db } from "@/firebase";
import IMessage from "@/interfaces/Message";
import { firebase } from "@/firebase";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    messages: [] as IMessage[],
    user: {} as firebase.User,
  },
  plugins: [createPersistedState()],
  getters: {},

  mutations: {
    setRecipientUid(state: any, payload: any) {
      state.recipientUid = payload;
    },
    setLogged(state: any, payload: firebase.User) {
      state.user = payload;
    },
    setMessages(state: any, payload: any) {
      state.messages = payload;
    },
  },

  actions: {
    async getMessages({ commit, state }) {
      try {
        const messages: IMessage[] = [];
        const sentMessages = await db
          .collection("messages")
          .where("senderId", "==", state.user.uid)
          .where("receiverId", "==", state.recipientUid)
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
          .where("senderId", "==", state.recipientUid)
          .where("receiverId", "==", state.user.uid)
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

        const sortedMessages = messages
          .filter((message) => message.date !== null)
          .sort((a, b) => a.date.seconds - b.date.seconds);
        const lastMessage = messages.find((message) => message.date === null);
        if (lastMessage) {
          sortedMessages.push(lastMessage);
        }
        commit("setMessages", sortedMessages);
      } catch (error) {
        console.log(error);
      }
    },
  },

  modules: {},
});
