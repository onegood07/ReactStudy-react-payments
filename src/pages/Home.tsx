import { useState, useRef, useEffect } from "react";
import CardForm from "../components/CardForm";
import CardFormInput from "../components/CardFormInput";
import Card from "../components/Card";
import {
  CARD_FORM_LABELS,
  CARD_LABELS,
  CARD_PLACEHOLDERS,
  EMPTY_STRING,
  INPUTS,
} from "../constants";
import type { ChangeEvent, CardData, CardFormError } from "../types";
import {
  formatStringToUpper,
  validOwnerName,
  validExpirationDate,
  getFirstExpirationErrorMessage,
  getFirstErrorMessage,
  validCardNumbersBlock,
  hideNumber,
  onInputOnlyNumber,
  onInputOnlyString,
} from "../utils";
import styles from "../styles/CardForm.module.css";

function Home() {
  const [expirationDate, setExpirationDate] = useState<
    CardData["expirationDate"]
  >({
    month: EMPTY_STRING,
    year: EMPTY_STRING,
  });

  const [cardNumbers, setCardNumbers] = useState<CardData["numbers"]>({
    firstBlock: EMPTY_STRING,
    secondBlock: EMPTY_STRING,
    thirdBlock: EMPTY_STRING,
    fourthBlock: EMPTY_STRING,
  });

  const [owner, setOwner] = useState(EMPTY_STRING);

  const [cardError, setCardError] = useState<CardFormError>({
    numbers: {
      firstBlock: {
        hasError: false,
        errorMessage: EMPTY_STRING,
        isDisable: false,
      },
      secondBlock: {
        hasError: false,
        errorMessage: EMPTY_STRING,
        isDisable: true,
      },
      thirdBlock: {
        hasError: false,
        errorMessage: EMPTY_STRING,
        isDisable: true,
      },
      fourthBlock: {
        hasError: false,
        errorMessage: EMPTY_STRING,
        isDisable: true,
      },
    },
    expirationDate: {
      month: { hasError: false, errorMessage: EMPTY_STRING },
      year: { hasError: false, errorMessage: EMPTY_STRING },
    },
    owner: { hasError: false, errorMessage: EMPTY_STRING },
  });

  const [isAllFocusDone, setIsAllFocusDone] = useState(false);
  const [isOnFocus, setIsOnFocus] = useState(false);

  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);
  const fourthRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const ownerRef = useRef<HTMLInputElement>(null);

  const handleExpirationDateChange = (event: ChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    const newDate = {
      ...expirationDate,
      [name]: value,
    };

    setExpirationDate((prev) => ({
      ...prev,
      [name]: value,
    }));

    const validResult = validExpirationDate(newDate.month, newDate.year);

    setCardError((pre) => ({
      ...pre,
      expirationDate: validResult,
    }));
  };

  const handleExpirationDateBlur = (
    date: keyof CardData["expirationDate"],
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (value.length === 1) {
      setExpirationDate((prev) => ({
        ...prev,
        [date]: `0${value}`,
      }));
    }
  };

  const handleOwnerChange = (event: ChangeEvent) => {
    const value = event.target.value;

    const validResult = validOwnerName(event.target.value);

    setCardError((pre) => ({
      ...pre,
      owner: validResult,
    }));
    const ownerName = formatStringToUpper(value);
    setOwner(ownerName);
  };

  const handleCardNumbersChange = (event: ChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    const numberBlock = {
      ...cardNumbers,
      [name]: value,
    };

    const result: CardFormError["numbers"] = validCardNumbersBlock(numberBlock);

    setCardError((pre) => ({
      ...pre,
      numbers: result,
    }));

    setCardNumbers({
      firstBlock: numberBlock.firstBlock,
      secondBlock: numberBlock.secondBlock,
      thirdBlock: numberBlock.thirdBlock,
      fourthBlock: numberBlock.fourthBlock,
    });
  };

  const currentInputRef = (
    key: string
  ): React.RefObject<HTMLInputElement> | null => {
    switch (key) {
      case INPUTS.FIRST_BLOCK:
        return firstRef;
      case INPUTS.SECOND_BLOCK:
        return secondRef;
      case INPUTS.THIRD_BLOCK:
        return thirdRef;
      case INPUTS.FOURTH_BLOCK:
        return fourthRef;
      case INPUTS.MONTH:
        return monthRef;
      case INPUTS.YEAR:
        return yearRef;
      case INPUTS.OWNER:
        return ownerRef;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (isAllFocusDone) return;
    if (cardNumbers.firstBlock.length === 4) secondRef.current?.focus();
    if (cardNumbers.secondBlock.length === 4) thirdRef.current?.focus();
    if (cardNumbers.thirdBlock.length === 4) fourthRef.current?.focus();
    if (cardNumbers.fourthBlock.length === 4) monthRef.current?.focus();
  }, [cardNumbers, isAllFocusDone]);

  useEffect(() => {
    if (isAllFocusDone) return;
    if (expirationDate.month.length === 2) yearRef.current?.focus();
    if (expirationDate.year.length === 2) {
      ownerRef.current?.focus();
      setIsAllFocusDone(true);
    }
  }, [expirationDate, isAllFocusDone]);

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

      {Object.entries(cardNumbers).map(([key, value], index) => {
        const isNeedHiding =
          key === INPUTS.THIRD_BLOCK || key === INPUTS.FOURTH_BLOCK;

        return (
          <CardFormInput
            key={key}
            ref={currentInputRef(key)}
            name={key}
            cardInput={isNeedHiding && !isOnFocus ? hideNumber(value) : value}
            maxLength={4}
            width="50px"
            cardPlaceHolder={CARD_PLACEHOLDERS.CARD_NUMBER}
            hasError={
              cardError.numbers[key as keyof CardFormError["numbers"]].hasError
            }
            isDisable={
              cardError.numbers[key as keyof CardFormError["numbers"]].isDisable
            }
            handleChange={handleCardNumbersChange}
            handleOnInput={onInputOnlyNumber}
            handleOnFocus={() => setIsOnFocus(true)}
            handleBlur={() => setIsOnFocus(false)}
            autoFocus={index === 0}
          />
        );
      })}

      {
        <p className={cardError.owner ? styles.error : styles.none}>
          {cardError.numbers
            ? getFirstErrorMessage(cardError.numbers)
            : EMPTY_STRING}
        </p>
      }

      <CardForm
        cardFormLabelText={CARD_FORM_LABELS.EXPIRATION_DATE}
        cardFormLabelCaption={CARD_FORM_LABELS.EXPIRATION_DATE_CAPTION}
        cardLabelText={CARD_LABELS.EXPIRATION_DATE}
      />

      {Object.entries(expirationDate).map(([key, value]) => (
        <CardFormInput
          key={key}
          ref={currentInputRef(key)}
          name={key}
          cardInput={value}
          maxLength={2}
          width="125px"
          cardPlaceHolder={
            key === INPUTS.MONTH
              ? CARD_PLACEHOLDERS.EXPIRATION_MONTH
              : CARD_PLACEHOLDERS.EXPIRATION_YEAR
          }
          hasError={
            cardError.expirationDate[
              key as keyof CardFormError["expirationDate"]
            ].hasError
          }
          handleChange={handleExpirationDateChange}
          handleOnInput={onInputOnlyNumber}
          handleBlur={(e) =>
            handleExpirationDateBlur(
              key as keyof CardFormError["expirationDate"],
              e
            )
          }
        />
      ))}

      {
        <p className={cardError.owner ? styles.error : styles.none}>
          {cardError.expirationDate
            ? getFirstExpirationErrorMessage(cardError.expirationDate)
            : EMPTY_STRING}
        </p>
      }

      <CardForm
        cardFormLabelText={CARD_FORM_LABELS.CARD_OWNER}
        cardLabelText={CARD_LABELS.CARD_OWNER}
      />
      <CardFormInput
        key={INPUTS.OWNER}
        ref={currentInputRef(INPUTS.OWNER)}
        name={INPUTS.OWNER}
        cardInput={owner}
        maxLength={20}
        width="280px"
        cardPlaceHolder={CARD_PLACEHOLDERS.CARD_OWNER}
        hasError={cardError.owner.hasError}
        handleChange={handleOwnerChange}
        handleOnInput={onInputOnlyString}
      />

      {
        <p className={cardError.owner ? styles.error : styles.none}>
          {cardError.owner ? cardError.owner.errorMessage : EMPTY_STRING}
        </p>
      }
    </>
  );
}

export default Home;
