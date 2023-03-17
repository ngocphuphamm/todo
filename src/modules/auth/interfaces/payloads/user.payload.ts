export interface UserPayload {
  id: string;
  email: string;
}
export interface LoggedInUser {
  id: string;
  accessToken: string;
  refreshToken: string;
}
