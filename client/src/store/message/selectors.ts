import { RootState } from "../index";

export const selectMessages = (state: RootState) => state.messages.messages;
