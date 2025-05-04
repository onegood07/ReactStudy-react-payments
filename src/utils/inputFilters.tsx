// 숫자만 입력했는지 검증
export const isOnlyNumber = (inputValue: string): boolean => {
  return /^[0-9]+$/.test(inputValue);
};

// 글자수 제한
const limitToDigits = (value: string, max: number) => {
  return value.length <= 2 ? value : value.slice(0, max);
};

// 숫자만 입력 가능
const inputOnlyNumber = (value: string): string => value.replace(/[^0-9]/g, "");

// 영어만 입력 가능
const inputOnlyEnglish = (value: string): string =>
  value.replace(/[^a-zA-Z\s]/g, "");

// 입력한 max 수만큼 숫자만 입력 가능
export const filterNumber = (value: string, max: number) => {
  const result = limitToDigits(value, max);
  return inputOnlyNumber(result);
};

// 입력한 max 수만큼 영어만 입력 가능
export const filterString = (value: string, max: number) => {
  const result = limitToDigits(value, max);
  return inputOnlyEnglish(result);
};
