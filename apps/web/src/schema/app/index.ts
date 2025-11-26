import type { AddAppData } from "@meta-1/authub-types";
import { AddAppSchema } from "@meta-1/authub-types";

// 直接使用 lib-types 中定义的 schema
export const useSchema = () => AddAppSchema;

// 导出类型
export type AddAppFormData = AddAppData;
