import { atom } from "recoil";

export const profileImageState = atom<string | undefined>({
  key: "profileImage",
  default: undefined,
});
