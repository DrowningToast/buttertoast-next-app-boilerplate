import { atom } from "jotai";
import { User } from "@firebase/auth/dist/auth-public";
import { Profile } from "./type";

export const firebaseReady = atom<boolean>(false);
export const firebaseUserAtom = atom<User | null>(null);
export const firebaseToken = atom<string | null>(null);

export const profileInfoAtom = atom<Profile | null>(null);
