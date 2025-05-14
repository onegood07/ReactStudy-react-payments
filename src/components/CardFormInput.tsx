import React, { forwardRef } from "react";
import type { ChangeEvent } from "../types/cardTypes";
import styles from "../styles/CardFormInput.module.css";

interface CardFormProps {
  name: string;
  cardPlaceHolder: string;
  cardInput: number | string;
  handleChange: (e: ChangeEvent) => void;
  width: string;
  isDisable?: boolean;
  hasError: boolean;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleOnFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength: number;
  pattern?: string;
  handleOnInput?: (e: React.FormEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

const CardFormInput = forwardRef<HTMLInputElement, CardFormProps>(
  (
    {
      name,
      cardPlaceHolder,
      cardInput,
      handleChange,
      width,
      isDisable,
      hasError,
      handleBlur,
      handleOnFocus,
      maxLength,
      pattern,
      handleOnInput,
      autoFocus,
    }: CardFormProps,
    ref
  ) => {
    return (
      <>
        <input
          className={styles.inputBox}
          name={name}
          value={cardInput}
          placeholder={cardPlaceHolder}
          type="text"
          onChange={handleChange}
          ref={ref}
          style={{
            width: width,
            borderColor: hasError ? "red" : "#d5d5d5",
          }}
          disabled={isDisable}
          onBlur={handleBlur}
          maxLength={maxLength}
          pattern={pattern}
          onInput={handleOnInput}
          onFocus={handleOnFocus}
          autoFocus={autoFocus}
        />
      </>
    );
  }
);

export default CardFormInput;
