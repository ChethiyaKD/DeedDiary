const imagesUrl = "https://api.unsplash.com/search/photos?page=1&query=wallpaper&orientation=landscape"
import axios from "axios";

export const getImages = async () => {
    return new Promise(resolve => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.unsplash.com/search/photos?page=1&query=wallpaper nature&orientation=landscape',
            headers: {
                'Authorization': 'Client-ID VcM2I5FM4FhtpvwaCwNsQrKMvXCANgd1ORDAExfRLk8'
            }
        };

        axios.request(config)
            .then((response) => {
                resolve(response.data)
            })
    })


}