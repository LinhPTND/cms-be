import { Rule } from "ant-design-vue/lib/form";

export const validatePhone = async (_rule: Rule, value: string) => {
  const regexNumber = /^\d+$/;
  if (value === "") {
    return Promise.reject("Vui lòng nhập số điện thoại");
  } else if (!regexNumber.test(value)) {
    return Promise.reject("Sai định dạng");
  } else if (value.toString().length !== 10) {
    return Promise.reject("Bạn chưa nhập đúng 10 số");
  }
  return Promise.resolve();
};

export const validateCitizenId = async (_rule: Rule, value: string) => {
  const regexNumber = /^\d+$/;
  if (value === "") {
    return Promise.reject("Vui lòng nhập số CMND");
  } else if (!regexNumber.test(value)) {
    return Promise.reject("Sai định dạng");
  }
  return Promise.resolve();
};
