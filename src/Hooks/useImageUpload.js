import React, { useState} from "react";
const useImageUpload = () => {
    const [url, setUrl] = useState("");
    const uploadImage = async ({image}) => {
        const data = new FormData();
        data.append("file", image);
        data.append(
            "upload_preset",
            import.meta.env.VITE_BACKEND_CLOUDINARY_UPLOAD_PRESET
          );
        data.append("cloud_name", import.meta.env.VITE_BACKEND_CLOUDINARY_CLOUD_NAME);
        data.append("folder", "MedGen-AI");

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_BACKEND_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );
            const res = await response.json();
            console.log("This is image url in useImageUpload",res.secure_url)
            return res.secure_url;
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
        }
    };

    return {uploadImage};
};

export default useImageUpload;
