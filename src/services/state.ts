import queryString from 'query-string'

import { API_URL } from '@/utils/constant'

export const fetchState = async ({ name, page, limit }: fetchStatePayload) => {
  const queryParams = queryString.stringify({ name, page, limit }, { skipEmptyString: true, skipNull: true })
  const response = await fetch(`${API_URL}/country/states?${queryParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
    },
  })
  const data = await response.json()
  return data
}