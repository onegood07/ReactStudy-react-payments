export interface ErrorType {
  hasError: boolean;
  errorMessage: string;
}
export interface CardNumberErrorType extends ErrorType {
  isDisable: boolean;
}
export type CardFormError = {
  numbers: {
    firstBlock: CardNumberErrorType;
    secondBlock: CardNumberErrorType;
    thirdBlock: CardNumberErrorType;
    fourthBlock: CardNumberErrorType;
  };
  expirationDate: {
    month: ErrorType;
    year: ErrorType;
  };
  owner: ErrorType;
};
