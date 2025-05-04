import { ERROR_MESSAGE } from "../constants";
import { isOnlyNumber } from "./inputFilters";
import type { ErrorType, ExpirationDateError } from "../types";

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

// 유효기간에 입력한 '월(Month)' 검증
const validExpirationMonth = (inputMonth: string): ErrorType => {
  if (!isOnlyNumber(inputMonth))
    return { hasError: true, errorMessage: ERROR_MESSAGE.ONLY_NUMBER };

  if (!isLengthTwo(convertMonth(inputMonth)))
    return { hasError: true, errorMessage: ERROR_MESSAGE.MIN_LENGTH_TWO };

  if (!isInValidMonthRange(Number(inputMonth)))
    return { hasError: true, errorMessage: ERROR_MESSAGE.VALID_MONTH_RANGE };

  return { hasError: false, errorMessage: "" };
};

// 유효기간에 입력한 '연도(Year)' 검증
const validExpirationYear = (inputYear: string): ErrorType => {
  if (!isOnlyNumber(inputYear))
    return { hasError: true, errorMessage: ERROR_MESSAGE.ONLY_NUMBER };

  if (!isLengthTwo(convertMonth(inputYear)))
    return { hasError: true, errorMessage: ERROR_MESSAGE.MIN_LENGTH_TWO };

  return { hasError: false, errorMessage: "" };
};

// 유효기간 검증 후 에러타입 반환
export const validExpirationDate = (
  inputMonth: string,
  inputYear: string
): ExpirationDateError => {
  const monthError: ErrorType = validExpirationMonth(inputMonth);
  const yearError: ErrorType = validExpirationYear(inputYear);

  if (monthError.hasError || yearError.hasError)
    return {
      month: monthError,
      year: yearError,
    };

  const monthNumber: number = Number(inputMonth);
  const yearNumber: number = convertYear(Number(inputYear));

  if (!isNotPastDate(monthNumber, yearNumber))
    return {
      month: {
        hasError: true,
        errorMessage: ERROR_MESSAGE.PAST_DATE,
      },
      year: {
        hasError: true,
        errorMessage: ERROR_MESSAGE.PAST_DATE,
      },
    };

  if (!isOverMaxValidYear(monthNumber, yearNumber))
    return {
      month: {
        hasError: true,
        errorMessage: ERROR_MESSAGE.OVER_MAX_VALID_YEAR,
      },
      year: {
        hasError: true,
        errorMessage: ERROR_MESSAGE.OVER_MAX_VALID_YEAR,
      },
    };

  return {
    month: monthError,
    year: yearError,
  };
};
