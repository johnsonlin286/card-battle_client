import { API_URL } from '@/utils/constant'
import Cookies from 'js-cookie'

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
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

export const loginUser = async (payload: loginUserPayload): Promise<loginUserResponse | ErrorResponse> => {
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
    return {
      success: data.success,
      message: data.error,
    }
  }
  return data.data;
}

export const logoutUser = async () => {
  const token = Cookies.get('cardBattleToken');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await fetch(`${API_URL}/user/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      'Authorization': `${Cookies.get('cardBattleToken')}`
    },
  })
  const data = await response.json()
  if (!response.ok) {
    return {
      success: data.success,
      message: data.error,
    }
  }
  return data;
}

export const fetchAccountData = async () => {
  const response = await fetch(`${API_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      'Authorization': `${Cookies.get('cardBattleToken')}`
    },
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.data;
}