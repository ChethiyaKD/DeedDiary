import React from "react";
import { default as ClockLive } from "react-live-clock";
import styles from "../styles/components/clock.module.scss";

export default function Clock() {
  return (
    <div className={styles.clock}>
      <ClockLive format={"Mo MMMM YYYY"} ticking={true} className={styles.date}/>
      <ClockLive format={"HH:mm A"} ticking={true} />
    </div>
  );
}
