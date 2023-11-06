import { message } from "ant-design-vue";
import { MessageArgsProps } from "ant-design-vue/lib/message";

export default function useMessage() {
  const $messageKey = Symbol("messageKey");

  function loading(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.loading({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  function success(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.success({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  function info(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.info({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  function warning(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.warning({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  function error(
    content: string,
    option?: Omit<MessageArgsProps, "key" | "content">
  ) {
    return message.error({
      key: $messageKey.description,
      content,
      ...option,
    });
  }

  return {
    loading,
    success,
    info,
    warning,
    error,
  };
}
