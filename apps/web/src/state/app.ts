import { atom } from "jotai";

import type { AppResponse } from "@meta-1/authub-types";

export const currentAppState = atom<AppResponse | undefined>(undefined);
