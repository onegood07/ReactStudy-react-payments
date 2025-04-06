export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface ExpirationDate {
  month: string;
  year: string;
}

export interface CardNumbers {
  firstBlock: string;
  secondBlock: string;
  thirdBlock: string;
  fourthBlock: string;
}
