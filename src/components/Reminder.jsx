import React from "react";
import styles from "../styles/components/reminder.module.scss";

const Reminder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.yellowCircle}></div>
        On this day
      </div>
      <div className={styles.goodDeed}>
        There were no transportation services working today. My father and I
        gave a lift to a couple of guys while we’re on our way home There were no transportation services working today. My father and I
      </div>
    </div>
  );
};

export default Reminder;
