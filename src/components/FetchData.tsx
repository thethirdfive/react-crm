import { SERVER } from '../services/ApiUrls'

export const Header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('Token'),
  org: localStorage.getItem('org')
}

export const Header1 = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: localStorage.getItem('Token')
}

export async function fetchData(url: any, method: any, data = '', header: any) {
  const response = await fetch(`${SERVER}${url}`, {
    method,
    headers: header,
    body: data
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
}
