import { INPUTS } from "../constants";

export type InputName = (typeof INPUTS)[keyof typeof INPUTS];

export type ChangeEvent = React.ChangeEvent<HTMLInputElement> & {
  target: {
    name: InputName;
    value: string;
  };
};

export type CardData = {
  numbers: {
    firstBlock: string;
    secondBlock: string;
    thirdBlock: string;
    fourthBlock: string;
  };
  expirationDate: {
    month: string;
    year: string;
  };
  owner: string;
};
