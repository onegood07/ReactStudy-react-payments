{
  /* 소유자 이름 검증 함수
  1. formatStringToUpper -> 대문자로 변경
  2. isEnglishOnly -> 영문만 있는지 검증
  3. isMinLength -> 최소 두글자 이상인지 검증

  validOwnerName -> 소유자 이름 검증 후 에러 반환
  */
}

import { ERROR_MESSAGE } from "../constants/ErrorMessage";

// 대문자로 변경
export const formatStringToUpper = (text: string): string => text.toUpperCase();

// 영문만 입력했는지 검증
const isEnglishOnly = (text: string): boolean => /^[A-Za-z\s]+$/.test(text);

// 최소 두글자 이상인지 검증
const isMinLength = (text: string): boolean => text.length >= 2;

// 소유자 이름 검증 후 에러 반환
export const validOwnerName = (text: string): string => {
  if (!isEnglishOnly(text)) return ERROR_MESSAGE.ONLY_ENGLISH;
  if (!isMinLength(text)) return ERROR_MESSAGE.MIN_LENGTH_REQUIRED;

  return "";
};
