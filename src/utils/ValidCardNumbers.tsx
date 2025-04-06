import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { isOnlyNumber } from "./NumberUtils";
import visa from "../assets/Visa.svg";
import master from "../assets/Mastercard.svg";

// Visa 또는 Master 로고 설정
export const setCardLogo = (value: string): string => {
  if (value.slice(0, 1) === "4") return visa;
  const first = Number(value.slice(0, 2));
  if (51 <= first && first <= 55) return master;
  return "";
};

// 숫자를 '*' 처리
export const hideNumber = (value: string): string =>
  value.replace(/[0-9]/g, "*");

// 카드 번호 검증
export const validCardNumbersBlock = (block: string) => {
  if (!isOnlyNumber(block)) return ERROR_MESSAGE.ONLY_NUMBER;

  return "";
};
