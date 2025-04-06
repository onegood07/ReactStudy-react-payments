import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { isOnlyNumber } from "./NumberUtils";

// 오늘 날짜, 연도, 월
const today: Date = new Date();
const currentYear: number = today.getFullYear();
const currentMonth: number = today.getMonth() + 1;

// 입력한 2자리 연도를 4자리 연도로 변경
const convertYear = (year: number): number =>
  Math.floor(currentYear / 100) * 100 + year;

// 두자리로 월을 반환 (ex. 3월 입력 시 03월로 변환)
export const convertMonth = (month: string): string => {
  const monthNumber = Number(month);
  if (isNaN(monthNumber)) return "";
  return monthNumber < 10 ? `0${monthNumber}` : `${monthNumber}`;
};

// 2글자를 입력했는지 검증
const isLengthTwo = (value: string): boolean => value.length === 2;

// 입력한 달이 1월부터 12월 사이인지 검증
const isInValidMonthRange = (month: number): boolean =>
  month >= 1 && month <= 12;

// 유효기간이 지났는지 확인
const isNotPastDate = (month: number, year: number): boolean => {
  const inputDate: Date = new Date(year, month - 1, 1);
  return inputDate >= today;
};

// 유효기간이 10년 이내인지 확인
const isOverMaxValidYear = (month: number, year: number): boolean => {
  const tenYearsLaterDate = new Date(currentYear + 10, currentMonth - 1, 1);
  const inputDate = new Date(year, month - 1, 1);

  return inputDate <= tenYearsLaterDate;
};

// 유효기간 검증 후 에러 메시지 반환
export const validExpirationDate = (
  inputMonth: string,
  inputYear: string
): string => {
  if (!isOnlyNumber(inputMonth) || !isOnlyNumber(inputYear))
    return ERROR_MESSAGE.ONLY_NUMBER;

  const month: number = Number(inputMonth);
  const year: number = convertYear(Number(inputYear));

  if (!isLengthTwo(convertMonth(inputMonth)) || !isLengthTwo(inputYear))
    return ERROR_MESSAGE.MIN_LENGTH_TWO;
  if (!isInValidMonthRange(month)) return ERROR_MESSAGE.VALID_MONTH_RANGE;
  if (!isNotPastDate(month, year)) return ERROR_MESSAGE.PAST_DATE;
  if (!isOverMaxValidYear(month, year))
    return ERROR_MESSAGE.OVER_MAX_VALID_YEAR;

  return "";
};
