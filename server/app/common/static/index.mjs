import { respMessage } from "./messages.mjs";
import { Status } from "./status.mjs";

const MessageContent = {
  ...respMessage,
  ...Status,
};

export { MessageContent };
