import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, MessagesState } from "./types";

const initialState: MessagesState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, "id">>) => {
      state.messages.push({
        ...action.payload,
        id: crypto.randomUUID(),
      });
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
