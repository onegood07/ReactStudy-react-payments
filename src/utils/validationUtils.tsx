// 숫자만 입력했는지 검증
export const isOnlyNumber = (inputValue: string): boolean => {
  return /^[0-9]+$/.test(inputValue);
};
