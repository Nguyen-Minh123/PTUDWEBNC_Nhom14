export interface UserProfileDto {
  id: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string | null;
  bio?: string | null;
  roles?: string[];
  createdAt?: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserProfileDto;
}

export interface LoginRequestDto {
  email: string;
  password?: string;
}

export interface RegisterRequestDto {
  email: string;
  password?: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
}

export interface GoogleLoginRequestDto {
  idToken: string;
}

export interface UpdateUserProfileRequestDto {
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface ForgotPasswordResponseDto {
  message: string;
  resetToken?: string | null;
}

export interface ResetPasswordRequestDto {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequestDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AuthMessageResponseDto {
  message: string;
}

// Aliases for flexibility across frontend services & components
export type LoginRequest = LoginRequestDto;
export type RegisterRequest = RegisterRequestDto;
export type GoogleLoginRequest = GoogleLoginRequestDto;
export type UpdateProfileRequest = UpdateUserProfileRequestDto;
export type ForgotPasswordRequest = ForgotPasswordRequestDto;
export type ForgotPasswordResponse = ForgotPasswordResponseDto;
export type ResetPasswordRequest = ResetPasswordRequestDto;
export type ChangePasswordRequest = ChangePasswordRequestDto;
export type AuthResponse = AuthResponseDto;
export type UserProfile = UserProfileDto;
