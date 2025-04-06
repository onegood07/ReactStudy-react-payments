import CardForm from "./components/CardForm";
import styles from "./components/CardForm.module.css";
import Card from "./components/Card";
import {
  CARD_FORM_LABELS,
  CARD_LABELS,
  CARD_PLACEHOLDERS,
} from "./constants/CardConstants";
import CardFormInput from "./components/CardFormInput";
import type { ChangeEvent, ExpirationDate, CardNumbers } from "./types/card";
import type { CardError } from "./types/error";
import { useState } from "react";
import { formatStringToUpper, validOwnerName } from "./utils/ValidOwnerName";
import { convertMonth, validExpirationDate } from "./utils/ValidExpirationDate";
import { filterNumber } from "./utils/NumberUtils";
import { validCardNumbersBlock } from "./utils/ValidCardNumbers";

function App() {
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
    cardNumbersError: "",
    expirationDateError: "",
    ownerError: "",
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
    const validResult = validOwnerName(event.target.value);
    setCardError((pre) => ({
      ...pre,
      ownerError: validResult,
    }));
    const ownerName = formatStringToUpper(event.target.value);
    setOwner(ownerName);
  };

  const handleCardNumbersChange = (event: ChangeEvent) => {
    let validResult = "";
    const name = event.target.name;
    const value = event.target.value;
    const filterValue = filterNumber(value, 4);

    const numberBlock = {
      ...cardNumbers,
      [name]: filterValue,
    };

    Object.entries(numberBlock).forEach(([key, value]) => {
      validResult = validCardNumbersBlock(value);
    });

    setCardError((pre) => ({
      ...pre,
      cardNumbersError: validResult,
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
        />
      ))}

      {cardError.cardNumbersError && (
        <p className={styles.error}>{cardError.cardNumbersError}</p>
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
        />
      ))}

      {cardError.expirationDateError && (
        <p className={styles.error}>{cardError.expirationDateError}</p>
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
      />
      {cardError.ownerError && (
        <p className={styles.error}>{cardError.ownerError}</p>
      )}
    </>
  );
}

export default App;
