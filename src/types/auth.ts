export type User = {
  name: string;
  email: string;
};

export type AuthResponse = {
  name: string;
  email: string;
  token: string;
};

export type CurrentUserResponse = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LogoutResponse = {
  message: string;
};
