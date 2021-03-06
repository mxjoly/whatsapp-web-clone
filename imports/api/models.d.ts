interface Profile {
  phone?: string;
  picture?: string;
  status?: string;
}

interface User {
  _id: string;
  username: string;
  password: string;
  profile: Profile;
}

interface Chat {
  _id: string;
  title: string;
  picture?: string;
  participants: string[];
}

interface Message {
  _id: string;
  chatId: string;
  content: string;
  createdAt: Date;
  type: 'TEXT' | 'IMAGE';
  senderId: string;
  read: string[]; // id of user that read the message
}
