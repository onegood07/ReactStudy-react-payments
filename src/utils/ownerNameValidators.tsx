import { ERROR_MESSAGE } from "../constants";
import type { ErrorType } from "../types";

// 대문자로 변경
export const formatStringToUpper = (text: string): string => text.toUpperCase();

// 영문만 입력했는지 검증
const isEnglishOnly = (text: string): boolean => /^[A-Za-z\s]+$/.test(text);

// 최소 두글자 이상인지 검증
const isMinLength = (text: string): boolean => text.length >= 2;

// 소유자 이름 검증 후 에러 반환
export const validOwnerName = (text: string): ErrorType => {
  if (!isEnglishOnly(text))
    return {
      hasError: true,
      errorMessage: ERROR_MESSAGE.ONLY_ENGLISH,
    };
  if (!isMinLength(text))
    return {
      hasError: true,
      errorMessage: ERROR_MESSAGE.MIN_LENGTH_REQUIRED,
    };

  return {
    hasError: false,
    errorMessage: "",
  };
};
