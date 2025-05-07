export type InputName =
  | "firstBlock"
  | "secondBlock"
  | "thirdBlock"
  | "fourthBlock"
  | "month"
  | "year"
  | "owner";

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
  expiration: {
    month: string;
    year: string;
  };
  owner: string;
};
