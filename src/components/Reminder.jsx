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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat lacinia urna, a vestibulum nisl scelerisque eget. Sed volutpat sapien turpis, ut congue velit porta non. Etiam feugiat, orci eget tempus rutrum
      </div>
    </div>
  );
};

export default Reminder;
