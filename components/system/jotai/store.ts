import { atom } from "jotai";

export const userReady = atom<boolean>(false);
export const userAtom = atom<any | null | undefined>({});
export const userToken = atom<any | null | undefined>({});
