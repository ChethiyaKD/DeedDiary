import React, { useState, useEffect } from "react";
import {
  saveToStorage,
  getFromStorage,
} from "./controllers/storageController.js";
import { render } from "react-dom";
import "./styles/main.css";
import styles from "./styles/newTab.module.scss";
import { getImages } from "./api/images.js";

function Popup() {
  const [bgImage, setBgImage] = useState(null);

  const getImage = async () => {
    const imagesResult = await getImages();
    console.log(imagesResult)
    const results = imagesResult?.results;
    const imageCount = results.length;
    const randomNumber = Math.floor(Math.random() * (imageCount - 1));
    const imageUrl = results[randomNumber]?.urls?.full;
    setBgImage(imageUrl);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: bgImage ? `url('${bgImage}')` : `url('${chrome.runtime.getUrl}/assets/image/wallpaper.jpg')` }}
    ></div>
  );
}

render(<Popup />, document.getElementById("react-target"));
