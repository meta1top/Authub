import { atom } from "jotai";

import type { Profile } from "@meta-1/authub-types";

export const isLoginState = atom<boolean>(false);

export const profileState = atom<Profile | null>(null);
