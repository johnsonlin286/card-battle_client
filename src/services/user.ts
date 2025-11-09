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