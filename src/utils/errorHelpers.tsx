import type { CardFormError } from "../types";
import { EMPTY_STRING, CARD_INFORMATION } from "../constants";

// 유효기간 검증에서 가장 첫번째 에러 메시지 반환
export const getFirstExpirationErrorMessage = (
  error: CardFormError["expirationDate"]
): string => {
  for (const field of CARD_INFORMATION.EXPIRATION_DATE) {
    if (error[field].hasError) {
      return error[field].errorMessage;
    }
  }
  return EMPTY_STRING;
};

// 카드번호 검증에서 가장 첫번째 에러 메시지 반환
export const getFirstErrorMessage = (
  error: CardFormError["numbers"]
): string => {
  for (const field of CARD_INFORMATION.CARD_NUMBER_BLOCK) {
    if (error[field].hasError) {
      return error[field].errorMessage;
    }
  }

  return EMPTY_STRING;
};
