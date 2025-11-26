import type { AppListItem, AppResponse } from "@meta-1/authub-types";
import type { PageData, PageRequest } from "@meta-1/nest-types";
import type { AddAppFormData } from "@/schema/app";
import { del, get, post, put } from "@/utils/rest";

type AppListResponse = AppListItem;

export const add = (data: AddAppFormData) => post<void, AddAppFormData>("@api/app/add", data);

export type ListResult = PageData<AppListResponse>;

export const list = (data: PageRequest) => get<ListResult, PageRequest>("@api/app/list", data);

export const enable = (id: string) => put<void, void>(`@api/app/${id}/enable`);

export const disable = (id: string) => put<void, void>(`@api/app/${id}/disable`);

export const deleteApp = (id: string) => del<void, void>(`@api/app/${id}`);

export const detail = (id: string) => get<AppResponse, void>(`@api/app/${id}`);
