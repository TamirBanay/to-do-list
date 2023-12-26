import { atom } from "recoil";
export const _userIsLoggedIn = atom({
  key: "_userIsLoggedIn",
  default: localStorage.getItem("isLoggedIn") || false,
});

export const _currentUserId = atom({
  key: "_currentUserId",
  default: null,
});
export const _user = atom({
  key: "_user",
  default: [],
});
