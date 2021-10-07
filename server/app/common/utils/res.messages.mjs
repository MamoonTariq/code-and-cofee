import { MessageContent } from "../static/index.mjs";

const MessageResponce = ({ key = "KeyNotFound", data = [], status = 2 }) => {
  const message = MessageContent[key]
    ? MessageContent[key]
    : MessageContent["KeyNotFound"];

  const Status = MessageContent[status];
  const responce = {
    message,
    data,
    status: Status,
  };
  return responce;
};

export default MessageResponce;
