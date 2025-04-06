import styles from "./Card.module.css";
import type { CardNumbers, ExpirationDate } from "../types/card";
import { hideNumber, setCardLogo } from "../utils/ValidCardNumbers";

type CardProps = {
  cardNumbers: CardNumbers;
  expirationDate: ExpirationDate;
  owner: string;
};

function Card({ owner, expirationDate, cardNumbers }: CardProps) {
  const expirationMonth = expirationDate.month;
  const expirationYear = expirationDate.year;
  const cardLogo = setCardLogo(cardNumbers.firstBlock);
  const date =
    expirationMonth.length > 0 || expirationYear.length > 0
      ? `${expirationMonth}/${expirationYear}`
      : "";
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
