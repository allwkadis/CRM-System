import { ERROR } from '../constants/error';

export const validate = (value: string) => {
  const text = value.trim();

  if (!text.length) {
    return ERROR.REQUIREMENT;
  }

  if (text.length < 2) {
    return ERROR.MIN_LENGTH_2;
  }

  if (text.length > 64) {
    return ERROR.MAX_LENGTH_56;
  }

  return;
};
