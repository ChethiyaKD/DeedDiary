import React from "react";
import styles from "../styles/components/addDeed.module.scss";

export default function AddDeed() {
  return <div className={styles.addDeed}>
    <img src={chrome.runtime.getURL('assets/images/add.svg')} alt="" className={styles.addButton}/>
  </div>;
}
