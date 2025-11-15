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