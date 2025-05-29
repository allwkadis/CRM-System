import { API_ROUTES } from '../constants/routes';
import { ERROR } from '../constants/error';

export async function baseApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_ROUTES.BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`${ERROR.NETWORK}`);
    }

    if (response.status === 204) {
      return '' as T;
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      return response.json();
    }

    return response.text() as T;
  } catch (error) {
    console.error(ERROR.NETWORK);
    throw error;
  }
}
