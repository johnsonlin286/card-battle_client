import { API_URL } from '@/utils/constant'

export const getAllUser = async () => {
  const response = await fetch(`${API_URL}/user/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
  })
  const data = await response.json()
  return data
}

export const registerUser = async (payload: registerUserPayload) => {
  const response = await fetch(`${API_URL}/user/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  return data
}

export const loginUser = async (payload: loginUserPayload): Promise<loginUserResponse> => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.data;
}