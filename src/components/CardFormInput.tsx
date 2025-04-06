import React from "react";
import type { ChangeEvent } from "../types/card";
import styles from "./CardFormInput.module.css";

type CardFormProps = {
  name: string;
  cardPlaceHolder: string;
  cardInput: number | string;
  handleChange: (e: ChangeEvent) => void;
  width?: string;
  disabled?: boolean;
  isError?: boolean;
};

function CardFormInput({
  name,
  cardPlaceHolder,
  cardInput,
  handleChange,
  width,
  disabled,
  isError,
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
          borderColor: isError ? "red" : "#d5d5d5",
        }}
        disabled={disabled}
      ></input>
    </>
  );
}

export default CardFormInput;
