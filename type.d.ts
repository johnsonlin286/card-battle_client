type SelectOption = {
  value: string;
  label: string;
}

type fetchStatePayload = {
  name?: string;
  page?: number;
  limit?: number;
}

type registerUserPayload = {
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  country: string;
}

type loginUserPayload = {
  email: string;
  password: string;
}

type loginUserResponse = {
  token: string;
  expires_at: string;
}