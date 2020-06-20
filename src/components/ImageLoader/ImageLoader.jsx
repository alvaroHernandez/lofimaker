import React, {useState} from "react";
import UrlForm from "../UrlForm/UrlForm";

const ImageLoader = () => {

    const [imageUrl,setImageUrl] = useState();

    function loadImage({url}){
        console.log(url)
        setImageUrl(url);
    }


    return (
        <div>
            <img src={imageUrl} alt={'user loaded'}/>
            <UrlForm onSubmit={loadImage} buttonText={'Load Image'}/>
        </div>)
};

export default ImageLoader;
