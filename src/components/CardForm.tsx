import styles from "./CardForm.module.css";

type CardFormProps = {
  cardFormLabelText: string;
  cardFormLabelCaption?: string;
  cardLabelText: string;
};

function CardForm({
  cardFormLabelText,
  cardFormLabelCaption,
  cardLabelText,
}: CardFormProps) {
  return (
    <>
      <h3 className={styles.label}>{cardFormLabelText}</h3>
      {cardFormLabelCaption && (
        <p className={styles.caption}>{cardFormLabelCaption}</p>
      )}
      <p className={styles["form-label"]}>{cardLabelText}</p>
    </>
  );
}

export default CardForm;
