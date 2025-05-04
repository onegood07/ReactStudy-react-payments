export interface CardError {
  cardNumbersError: CardNumbersError;
  expirationDateError: ExpirationDateError;
  ownerError: ErrorType;
}

export interface ErrorType {
  hasError: boolean;
  errorMessage: string;
}

export interface CardNumberBlockError extends ErrorType {
  isDisable: boolean;
}

export interface ExpirationDateError {
  month: ErrorType;
  year: ErrorType;
}

export interface CardNumbersError {
  firstBlock: CardNumberBlockError;
  secondBlock: CardNumberBlockError;
  thirdBlock: CardNumberBlockError;
  fourthBlock: CardNumberBlockError;
}
