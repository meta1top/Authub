import { OTPSecret, OTPStatus } from "@meta-1/lib-types";
import { get, post } from "@/utils/rest";

export const otpSecret = () => get<OTPSecret>("@api/account/otp/secret");

export const otpStatus = () => get<OTPStatus>("@api/account/otp/status");

export type OTPBindData = {
  code: string;
  otpCode: string;
};

export const otpBind = (data: OTPBindData) => post<unknown, OTPBindData>("@api/account/otp/bind", data);

export type OTPDisableData = {
  code: string;
};
export const otpDisable = (data: OTPDisableData) => post<unknown, OTPDisableData>("@api/account/otp/disable", data);
