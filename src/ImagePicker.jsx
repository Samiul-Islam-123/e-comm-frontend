import React, { useState } from 'react';
import { Button } from '@mui/material';

const ImagePicker = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };

    const handleImageReset = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <input
                accept="image/*"
                id="image-picker"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            <label htmlFor="image-picker">
                <Button variant="contained" component="span">
                    Select Image
                </Button>
            </label>
            {selectedImage && (
                <div>
                    <img src={selectedImage} alt="Selected" />
                    <Button onClick={handleImageReset}>Reset</Button>
                </div>
            )}
        </div>
    );
};

export default ImagePicker;
