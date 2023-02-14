interface Message {
  senderId: string;
  receiverId: string;
  type: string;
  text: string;
  date: {
    nanoseconds: number;
    seconds: number;
  };
  isReceiver: boolean;
}

export default Message;
