import { EMPTY_STRING } from "../constants";

// 대문자로 변경
export const formatStringToUpper = (text: string): string => text.toUpperCase();

// 숫자만 입력 가능
export const onInputOnlyNumber = (event: React.FormEvent<HTMLInputElement>) => {
  const input = event.currentTarget;
  input.value = input.value.replace(/[^0-9]/g, EMPTY_STRING);
};

// 문자만 입력 가능
export const onInputOnlyString = (event: React.FormEvent<HTMLInputElement>) => {
  const input = event.currentTarget;
  input.value = input.value.replace(/[^a-zA-Z]/g, EMPTY_STRING);
};
