import { API_URL } from "@/utils/constant";
import Cookies from 'js-cookie'

export const fetchCollections = async () => {
  const response = await fetch(`${API_URL}/collection`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      'Authorization': `${Cookies.get('cardBattleToken')}`
    },
  })
  const data = await response.json()
  return data
}