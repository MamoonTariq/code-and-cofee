import MessageResponce from "./res.messages.mjs";

const Message = (...props) => {
  const res = MessageResponce(props);
  return res;
};

export default Message;
