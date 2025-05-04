import type { ExpirationDateError, CardNumbersError } from "../types";

// 유효기간 검증에서 가장 첫번째 에러 메시지 반환
export const getFirstExpirationErrorMessage = (
  error: ExpirationDateError
): string => {
  if (error.month.hasError) return error.month.errorMessage;
  if (error.year.hasError) return error.year.errorMessage;

  return "";
};

// 카드번호 검증에서 가장 첫번째 에러 메시지 반환
export const getFirstErrorMessage = (error: CardNumbersError): string => {
  const errorBlock = Object.values(error).find((block) => block.hasError);
  return errorBlock ? errorBlock.errorMessage : "";
};
