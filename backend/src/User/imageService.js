const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

// Function to upload image to ImgBB
const uploadImageToImgBB = async (imagePath) => {
  try {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(imagePath)); 
    
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGDB_API_KEY}`,
      formData,
      { headers: formData.getHeaders() }
    );
    
    return response.data.data.url; // Return the image URL
  } catch (error) {
    throw new Error('Error uploading image to ImgBB');
  }
};

module.exports = {
  uploadImageToImgBB,
};
