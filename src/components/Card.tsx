import styles from "../styles/Card.module.css";
import type { CardData } from "../types/cardTypes";
import { hideNumber, setCardLogo } from "../utils/cardNumberValidators";
import { EMPTY_STRING } from "../constants";

interface CardProps {
  cardNumbers: CardData["numbers"];
  expirationDate: CardData["expirationDate"];
  owner: CardData["owner"];
}

function Card({ owner, expirationDate, cardNumbers }: CardProps) {
  const expirationMonth = expirationDate.month;
  const expirationYear = expirationDate.year;
  const cardLogo = setCardLogo(cardNumbers.firstBlock);
  const date =
    expirationMonth.length > 0 || expirationYear.length > 0
      ? `${expirationMonth}/${expirationYear}`
      : EMPTY_STRING;
  const numbers: string = `${cardNumbers.firstBlock} ${cardNumbers.secondBlock} ${hideNumber(cardNumbers.thirdBlock)} ${hideNumber(cardNumbers.fourthBlock)}`;

  return (
    <>
      <div className={styles.card}>
        <div className={styles["card-header"]}>
          <div className={styles["card-ic"]}></div>
          {cardLogo ? (
            <img className={styles.logo} src={cardLogo} />
          ) : (
            <div className={styles.logo}></div>
          )}
        </div>
        <p className={styles["card-detail"]}>{numbers}</p>
        <p className={styles["card-detail"]}>{date}</p>
        <p className={styles["card-detail"]}>{owner}</p>
      </div>
    </>
  );
}

export default Card;
