import { getFromLocalStorage, saveToLocalStorage } from "./storageController"
import { getImages } from "../api/images"

const getImageBase64 = url => {
    return new Promise(resolve => {
        console.log(url)
        const img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous";

        //wait for image to load
        let timer = setInterval(() => {
            if (img.complete) {
                clearInterval(timer);
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                const dataURL = canvas.toDataURL("image/png");
                console.log({ dataURL })
                return resolve(dataURL);
            }
        }, 1000);
    })


}

const getRandomImage = (results) => {
    return new Promise(async resolve => {
        const imageCount = results.length;
        const randomNumber = Math.floor(Math.random() * (imageCount - 1));
        const imageUrl = results[randomNumber]?.urls?.raw + "&w=1500&dpr=1";
        const imageData = await getImageBase64(imageUrl);

        return resolve({ imageData, imageUrl })
    })
}

const fetchImages = () => {
    return new Promise(async resolve => {
        const imagesResult = await getImages();
        const results = imagesResult?.results;
        return resolve(results)
    })
}

export const getBgImage = () => {
    return new Promise(async resolve => {
        const date = new Date();
        const todayWithoutTime = date.toISOString().split('T')[0];
        const tomorrowWithoutTime = new Date(date.setDate(date.getDate() + 1)).toISOString().split('T')[0];
        console.log({ todayWithoutTime, tomorrowWithoutTime })

        const storageRes = await getFromLocalStorage([todayWithoutTime, tomorrowWithoutTime]);
        let todayImage = storageRes[todayWithoutTime];
        let tomorrowImage = storageRes[tomorrowWithoutTime];

        if (todayImage && tomorrowImage) return resolve(todayImage);

        const images = await fetchImages();

        const getUniqueImage = async () => {
            let selectedImage = await getRandomImage(images);
            const storageResult = await getFromLocalStorage("shownImages");
            const shownImages = storageResult?.shownImages || [];
            const hasShown = shownImages.includes(selectedImage?.url);
            if (hasShown) return getUniqueImage();
            saveToLocalStorage({ shownImages: [...shownImages, selectedImage?.url] });

            return selectedImage?.imageData;
        }

        if (!todayImage) {
            const selectedImage = await getUniqueImage();
            todayImage = selectedImage;
            resolve(selectedImage);
        }

        if (!tomorrowImage) {
            const selectedImage = await getUniqueImage();
            tomorrowImage = selectedImage;
        }

        saveToLocalStorage({ [todayWithoutTime]: todayImage, [tomorrowWithoutTime]: tomorrowImage });
    })
}