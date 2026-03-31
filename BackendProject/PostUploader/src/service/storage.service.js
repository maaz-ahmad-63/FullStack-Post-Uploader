import '../config/env.js';
import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadImage(buffer) {
    const response = await imagekit.files.upload({
      file: buffer.toString('base64'),
      fileName: `image-${Date.now()}.jpg`
    });
    return response;
}

export { uploadImage };
