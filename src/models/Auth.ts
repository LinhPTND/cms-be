export interface Account {
  maSV: string;
  name: string;
  birthday: string;
  phone: number;
  gender: "Nam" | "Nữ";
  citizenId: number;
  major:
    | "An toàn thông tin"
    | "Công nghệ thông tin"
    | "Kỹ thuật điện tử viễn thông";
}

export type Major = Pick<Account, "major">;

export type Gender = Pick<Account, "gender">;

export interface LoginRequest {
  username: string;
  password: string;
  type: "user" | "teacher" | "admin";
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    type: "user" | "teacher" | "admin";
  };
  message?: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
