export const CARD_LOGO_NUMBER = {
  VISA_NUMBER: "4",
  MASTER_MIN_NUMBER: 51,
  MASTER_MAX_NUMBER: 55,
};

export const CARD_PREFIX_LENGTH = {
  VISA: 1,
  MASTER: 2,
};

export const CARD_NUMBER_MAX_LENGTH = 4;

export const CARD_INFORMATION = {
  EXPIRATION_DATE: ["month", "year"] as const,
  CARD_NUMBER_BLOCK: [
    "firstBlock",
    "secondBlock",
    "thirdBlock",
    "fourthBlock",
  ] as const,
};
