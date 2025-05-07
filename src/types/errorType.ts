export interface ErrorType {
  hasError: boolean;
  errorMessage: string;
}
export interface CardNumberErrorType extends ErrorType {
  isDisable: boolean;
}
export type CardFormError = {
  cardNumbers: {
    firstBlock: CardNumberErrorType;
    secondBlock: CardNumberErrorType;
    thirdBlock: CardNumberErrorType;
    fourthBlock: CardNumberErrorType;
  };
  expiration: {
    month: ErrorType;
    year: ErrorType;
  };
  owner: ErrorType;
};
