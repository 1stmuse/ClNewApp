import Toast from "react-native-toast-message";

export const getById = (id, list = []) => {
  const exist = list.findIndex((el) => el.id === id);
  if (exist === -1) return {};

  return list[exist];
};

export const getExistingIndex = (id, list = []) => {
  const exist = list.findIndex((el) => el.id === id);
  return exist;
};

export const showToast = (type, msg) =>
  Toast.show({
    type,
    text1: msg,
  });
