import express from 'express';
import multer from 'multer';
import { uploadImage } from './service/storage.service.js';
import PostModel from './models/post.model.js'; 

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());
 
const upload = multer({ storage: multer.memoryStorage() });


app.post("/upload-post", upload.single('imageUrl'), async (req, res) => {
    try {
        console.log("Received post data:", req.body);
        console.log("Received file:", req.file);
        
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const response = await uploadImage(req.file.buffer);
        console.log("Image upload response:", response);

        const post = await PostModel.create({
            title: req.body.title,
            content: req.body.content,
            imageUrl: response.url,
            imageId: response.fileId
        });

        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});



export default app;
