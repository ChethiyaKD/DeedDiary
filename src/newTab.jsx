import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import {
  saveToStorage,
  getFromStorage,
} from "./controllers/storageController.js";
import "./styles/main.css";
import styles from "./styles/newTab.module.scss";
import { getBgImage } from "./controllers/imageController.js";

import Reminder from "./components/Reminder.jsx";
import Clock from "./components/Clock.jsx";
import AddDeed from "./components/AddDeed.jsx";

function Popup() {
  const [bgImage, setBgImage] = useState(null);

  const getImage = async () => {
    const imagesResult = await getBgImage();

    setBgImage(imagesResult);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: bgImage
          ? `url('${bgImage}')`
          : `url('${chrome.runtime.getURL("/assets/images/wallpaper.jpg")}')`,
      }}
    >
      <div className={styles.overlay}>
        <Reminder />
        <Clock />
        <AddDeed />
      </div>
    </div>
  );
}

render(<Popup />, document.getElementById("react-target"));
