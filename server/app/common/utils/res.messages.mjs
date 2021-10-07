import { MessageContent } from "../static/index.mjs";

const MessageResponce = ({ key = "KeyNotFound", data = [], status = 200 }) => {
  const message = MessageContent[key]
    ? MessageContent[key]
    : MessageContent["KeyNotFound"];
  const responce = {
    message,
    data,
    status,
  };
  return responce;
};

export default MessageResponce;
