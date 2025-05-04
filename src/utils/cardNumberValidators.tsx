import { ERROR_MESSAGE } from "../constants";
import { isOnlyNumber } from "./inputFilters";
import visa from "../assets/Visa.svg";
import master from "../assets/Mastercard.svg";
import { CardNumberBlockError, CardNumbers, CardNumbersError } from "../types";
import {
  CARD_LOGO_NUMBER,
  MASK_SYMBOL,
  CARD_PREFIX_LENGTH,
  CARD_NUMBER_MAX_LENGTH,
} from "../constants";

// Visa 또는 Master 로고 설정
export const setCardLogo = (value: string): string => {
  if (value.slice(0, CARD_PREFIX_LENGTH.VISA) === CARD_LOGO_NUMBER.VISA_NUMBER)
    return visa;
  const first = Number(value.slice(0, CARD_PREFIX_LENGTH.MASTER));
  if (
    CARD_LOGO_NUMBER.MASTER_MIN_NUMBER <= first &&
    first <= CARD_LOGO_NUMBER.MASTER_MAX_NUMBER
  )
    return master;
  return "";
};

// 숫자를 '*' 처리
export const hideNumber = (value: string): string =>
  value.replace(/[0-9]/g, MASK_SYMBOL);

// 카드 번호 검증
export const validCardNumbers = (block: string): CardNumberBlockError => {
  if (!isOnlyNumber(block))
    return {
      hasError: true,
      errorMessage: ERROR_MESSAGE.ONLY_NUMBER,
      isDisable: false,
    };

  return {
    hasError: false,
    errorMessage: "",
    isDisable: false,
  };
};

// 카드 번호 블록 검증
export const validCardNumbersBlock = (
  cardNumbers: CardNumbers
): CardNumbersError => {
  type CardNumbersKeys = keyof CardNumbers;
  const keys: CardNumbersKeys[] = [
    "firstBlock",
    "secondBlock",
    "thirdBlock",
    "fourthBlock",
  ];
  const result: CardNumbersError = {
    firstBlock: { hasError: false, errorMessage: "", isDisable: false },
    secondBlock: { hasError: false, errorMessage: "", isDisable: false },
    thirdBlock: { hasError: false, errorMessage: "", isDisable: false },
    fourthBlock: { hasError: false, errorMessage: "", isDisable: false },
  };

  keys.forEach((key, index) => {
    if (index === 0) return;

    const preValue = cardNumbers[keys[index - 1]];
    const currentValue = cardNumbers[keys[index]];
    const isPrevFilled = preValue.length === CARD_NUMBER_MAX_LENGTH;
    const isCurrentFilled = currentValue.length === CARD_NUMBER_MAX_LENGTH;

    result[key] = {
      hasError: !isPrevFilled || !isCurrentFilled,
      errorMessage:
        !isPrevFilled || !isCurrentFilled
          ? ERROR_MESSAGE.REQUIRE_FOUR_DIGIT_NUMBER
          : "",
      isDisable: !isPrevFilled,
    };
  });

  return result;
};
