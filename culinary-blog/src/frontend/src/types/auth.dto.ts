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
}

export interface GoogleLoginRequestDto {
  idToken: string;
}

export interface UpdateUserProfileRequestDto {
  displayName: string;
  bio?: string | null;
  avatarUrl?: string | null;
}

// Aliases for flexibility across frontend services & components
export type LoginRequest = LoginRequestDto;
export type RegisterRequest = RegisterRequestDto;
export type GoogleLoginRequest = GoogleLoginRequestDto;
export type UpdateProfileRequest = UpdateUserProfileRequestDto;
export type AuthResponse = AuthResponseDto;
export type UserProfile = UserProfileDto;
