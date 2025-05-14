export const INPUTS = {
  FIRST_BLOCK: "firstBlock",
  SECOND_BLOCK: "secondBlock",
  THIRD_BLOCK: "thirdBlock",
  FOURTH_BLOCK: "fourthBlock",
  MONTH: "month",
  YEAR: "year",
  OWNER: "owner",
} as const;

const CARD_FORM_LABELS = {
  CARD_NUMBER: "결제할 카드 번호를 입력해 주세요",
  CARD_NUMBER_CAPTION: "본인 명의의 카드만 결제 가능합니다.",
  EXPIRATION_DATE: "카드 유효기간을 입력해 주세요",
  EXPIRATION_DATE_CAPTION: "월/년도(MMYY)를 순서대로 입력해 주세요.",
  CARD_OWNER: "카드 소유자 이름을 입력해주세요",
};

const CARD_LABELS = {
  CARD_NUMBER: "카드 번호",
  EXPIRATION_DATE: "유효기간",
  CARD_OWNER: "소유자 이름",
};

const CARD_PLACEHOLDERS = {
  CARD_NUMBER: "1234",
  EXPIRATION_MONTH: "MM",
  EXPIRATION_YEAR: "YY",
  CARD_OWNER: "JOHN DOE",
};

const MASK_SYMBOL = "●";

const EMPTY_STRING = "";

export {
  MASK_SYMBOL,
  CARD_FORM_LABELS,
  CARD_LABELS,
  CARD_PLACEHOLDERS,
  EMPTY_STRING,
};
