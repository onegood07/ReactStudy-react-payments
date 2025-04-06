import { useState } from "react";
import CardForm from "../components/CardForm";
import CardFormInput from "../components/CardFormInput";
import Card from "../components/Card";
import {
  CARD_FORM_LABELS,
  CARD_LABELS,
  CARD_PLACEHOLDERS,
} from "../constants/textConstants";
import type {
  ChangeEvent,
  ExpirationDate,
  CardNumbers,
  CardError,
  ExpirationDateError,
  CardNumbersError,
} from "../types";
import {
  formatStringToUpper,
  validOwnerName,
  convertMonth,
  validExpirationDate,
  filterNumber,
  filterString,
  getFirstExpirationErrorMessage,
  getFirstErrorMessage,
  validCardNumbersBlock,
} from "../utils";
import styles from "../styles/CardForm.module.css";

function Home() {
  const [expirationDate, setExpirationDate] = useState<ExpirationDate>({
    month: "",
    year: "",
  });

  const [cardNumbers, setCardNumbers] = useState<CardNumbers>({
    firstBlock: "",
    secondBlock: "",
    thirdBlock: "",
    fourthBlock: "",
  });

  const [owner, setOwner] = useState("");

  const [cardError, setCardError] = useState<CardError>({
    cardNumbersError: {
      firstBlock: { hasError: false, errorMessage: "", isDisable: false },
      secondBlock: { hasError: false, errorMessage: "", isDisable: true },
      thirdBlock: { hasError: false, errorMessage: "", isDisable: true },
      fourthBlock: { hasError: false, errorMessage: "", isDisable: true },
    },
    expirationDateError: {
      month: { hasError: false, errorMessage: "" },
      year: { hasError: false, errorMessage: "" },
    },
    ownerError: { hasError: false, errorMessage: "" },
  });

  const handleExpirationDateChange = (event: ChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    const filterValue = filterNumber(
      name === "month" ? convertMonth(value) : value,
      2
    );

    const newDate = {
      ...expirationDate,
      [name]: filterValue,
    };

    const validResult = validExpirationDate(newDate.month, newDate.year);

    setCardError((pre) => ({
      ...pre,
      expirationDateError: validResult,
    }));

    setExpirationDate({
      month: newDate.month,
      year: newDate.year,
    });
  };

  const handleOwnerChange = (event: ChangeEvent) => {
    const value = filterString(event.target.value, 20);

    const validResult = validOwnerName(event.target.value);

    setCardError((pre) => ({
      ...pre,
      ownerError: validResult,
    }));
    const ownerName = formatStringToUpper(value);
    setOwner(ownerName);
  };

  const handleCardNumbersChange = (event: ChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    const numberBlock = {
      ...cardNumbers,
      [name]: filterNumber(value, 4),
    };

    const result: CardNumbersError = validCardNumbersBlock(numberBlock);

    setCardError((pre) => ({
      ...pre,
      cardNumbersError: result,
    }));

    setCardNumbers({
      firstBlock: numberBlock.firstBlock,
      secondBlock: numberBlock.secondBlock,
      thirdBlock: numberBlock.thirdBlock,
      fourthBlock: numberBlock.fourthBlock,
    });
  };

  return (
    <>
      <Card
        expirationDate={expirationDate}
        owner={owner}
        cardNumbers={cardNumbers}
      />
      <CardForm
        cardFormLabelText={CARD_FORM_LABELS.CARD_NUMBER}
        cardFormLabelCaption={CARD_FORM_LABELS.CARD_NUMBER_CAPTION}
        cardLabelText={CARD_LABELS.CARD_NUMBER}
      />

      {Object.entries(cardNumbers).map(([key, value]) => (
        <CardFormInput
          key={key}
          name={key}
          cardInput={value}
          cardPlaceHolder={CARD_PLACEHOLDERS.CARD_NUMBER}
          handleChange={handleCardNumbersChange}
          width="50px"
          hasError={
            cardError.cardNumbersError[key as keyof CardNumbersError].hasError
          }
          isDisable={
            cardError.cardNumbersError[key as keyof CardNumbersError].isDisable
          }
        />
      ))}
      {cardError.cardNumbersError && (
        <p className={styles.error}>
          {getFirstErrorMessage(cardError.cardNumbersError)}
        </p>
      )}

      <CardForm
        cardFormLabelText={CARD_FORM_LABELS.EXPIRATION_DATE}
        cardFormLabelCaption={CARD_FORM_LABELS.EXPIRATION_DATE_CAPTION}
        cardLabelText={CARD_LABELS.EXPIRATION_DATE}
      />
      {Object.entries(expirationDate).map(([key, value]) => (
        <CardFormInput
          key={key}
          name={key}
          cardInput={value}
          cardPlaceHolder={
            key === "month"
              ? CARD_PLACEHOLDERS.EXPIRATION_MONTH
              : CARD_PLACEHOLDERS.EXPIRATION_YEAR
          }
          handleChange={handleExpirationDateChange}
          width="125px"
          hasError={
            cardError.expirationDateError[key as keyof ExpirationDateError]
              .hasError
          }
        />
      ))}
      {cardError.expirationDateError && (
        <p className={styles.error}>
          {getFirstExpirationErrorMessage(cardError.expirationDateError)}
        </p>
      )}

      <CardForm
        cardFormLabelText={CARD_FORM_LABELS.CARD_OWNER}
        cardLabelText={CARD_LABELS.CARD_OWNER}
      />
      <CardFormInput
        key="owner"
        name="owner"
        cardInput={owner}
        cardPlaceHolder={CARD_PLACEHOLDERS.CARD_OWNER}
        handleChange={handleOwnerChange}
        width="280px"
        hasError={cardError.ownerError.hasError}
      />
      {cardError.ownerError && (
        <p className={styles.error}>{cardError.ownerError.errorMessage}</p>
      )}
    </>
  );
}

export default Home;
