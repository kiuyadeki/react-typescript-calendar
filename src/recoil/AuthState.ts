import { User } from 'firebase/auth';
import { atom } from 'recoil';

export const userState = atom<User | null | undefined>({
  key: "userState",
  default: undefined,
})

export const loadingState = atom({
  key: "loadingState",
  default: true,
})

export const errorState = atom<Error | null | undefined>({
  key: "errorState",
  default: null,
})