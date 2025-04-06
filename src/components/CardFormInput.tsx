import React from "react";
import type { ChangeEvent } from "../types/cardTypes";
import styles from "../styles/CardFormInput.module.css";

interface CardFormProps {
  name: string;
  cardPlaceHolder: string;
  cardInput: number | string;
  handleChange: (e: ChangeEvent) => void;
  width?: string;
  isDisable?: boolean;
  hasError?: boolean;
}

function CardFormInput({
  name,
  cardPlaceHolder,
  cardInput,
  handleChange,
  width,
  isDisable,
  hasError,
}: CardFormProps) {
  return (
    <>
      <input
        className={styles.inputBox}
        name={name}
        value={cardInput}
        placeholder={cardPlaceHolder}
        type="text"
        onChange={handleChange}
        style={{
          width: width,
          borderColor: hasError ? "red" : "#d5d5d5",
        }}
        disabled={isDisable}
      ></input>
    </>
  );
}

export default CardFormInput;
