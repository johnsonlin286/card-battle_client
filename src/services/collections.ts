import { API_URL } from "@/utils/constant";
import Cookies from 'js-cookie'

export const fetchCollections = async () => {
  const response = await fetch(`${API_URL}/collection`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      'Authorization': `${Cookies.get('cardBattleToken')}`,
      'x-refresh-token': `${Cookies.get('cardBattleRefreshToken')}`
    },
  })
  const data = await response.json()
  return data
}

export const fetchCharacters = async (): Promise<CharactersResponse | ErrorResponse> => {
  const response = await fetch(`${API_URL}/collection/characters`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
      'Authorization': `${Cookies.get('cardBattleToken')}`,
      'x-refresh-token': `${Cookies.get('cardBattleRefreshToken')}`
    },
  })
  const data = await response.json()
  return data
}