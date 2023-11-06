export interface GetCodeRequest {
  email: string;
  msv: string;
  teacherId: string;
}

export interface VerifyCodeRequest {
  msv: string;
  teacherId: string;
  otp: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
}
