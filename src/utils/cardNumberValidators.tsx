import {
  ERROR_MESSAGE,
  CARD_LOGO_NUMBER,
  MASK_SYMBOL,
  CARD_PREFIX_LENGTH,
  CARD_NUMBER_MAX_LENGTH,
  EMPTY_STRING,
  CARD_INFORMATION,
} from "../constants";
import { isOnlyNumber } from "./validationUtils";
import visa from "../assets/Visa.svg";
import master from "../assets/Mastercard.svg";
import { CardFormError, CardData, CardNumberErrorType } from "../types";

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
  return EMPTY_STRING;
};

// 숫자를 '●' 처리
export const hideNumber = (value: string): string =>
  value.replace(/[0-9]/g, MASK_SYMBOL);

// 카드 번호 검증
export const validCardNumbers = (block: string): CardNumberErrorType => {
  if (!isOnlyNumber(block))
    return {
      hasError: true,
      errorMessage: ERROR_MESSAGE.ONLY_NUMBER,
      isDisable: false,
    };

  return {
    hasError: false,
    errorMessage: EMPTY_STRING,
    isDisable: false,
  };
};

// 해당 블록이 숫자로 전부 채워졌는지 확인
const isBlockFilledWithNumbers = (numbers: string, length: number): boolean => {
  return numbers.length === length;
};

// 이전 블록의 값이 숫자로 전부 채워졌는지 확인
const validBlockIsFull = (
  prevBlock: string,
  currentBlock: string
): CardNumberErrorType => {
  const isPrevFilled = isBlockFilledWithNumbers(
    prevBlock,
    CARD_NUMBER_MAX_LENGTH
  );
  const isCurrentFilled = isBlockFilledWithNumbers(
    currentBlock,
    CARD_NUMBER_MAX_LENGTH
  );

  return {
    hasError: !isPrevFilled || !isCurrentFilled,
    errorMessage:
      !isPrevFilled || !isCurrentFilled
        ? ERROR_MESSAGE.REQUIRE_FOUR_DIGIT_NUMBER
        : EMPTY_STRING,
    isDisable: !isPrevFilled,
  };
};

// 카드 번호 블록 검증
export const validCardNumbersBlock = (
  cardNumbers: CardData["numbers"]
): CardFormError["numbers"] => {
  const result: CardFormError["numbers"] = {
    firstBlock: {
      hasError: false,
      errorMessage: EMPTY_STRING,
      isDisable: false,
    },
    secondBlock: {
      hasError: false,
      errorMessage: EMPTY_STRING,
      isDisable: false,
    },
    thirdBlock: {
      hasError: false,
      errorMessage: EMPTY_STRING,
      isDisable: false,
    },
    fourthBlock: {
      hasError: false,
      errorMessage: EMPTY_STRING,
      isDisable: false,
    },
  };

  const cardNumberKeys = CARD_INFORMATION.CARD_NUMBER_BLOCK;

  cardNumberKeys.forEach((key, index) => {
    if (index === 0) return;

    result[key] = validBlockIsFull(
      cardNumbers[cardNumberKeys[index - 1]],
      cardNumbers[cardNumberKeys[index]]
    );
  });

  return result;
};
