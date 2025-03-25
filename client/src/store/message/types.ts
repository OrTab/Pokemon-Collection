export type MessageType = "success" | "error";

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  duration?: number;
}

export interface MessagesState {
  messages: Message[];
}
