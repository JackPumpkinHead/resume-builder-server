const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3002;


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, 'uploads');
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
});

// app.get('/api', (req, res) => {
//     res.json({
//         message: "Hello world!"
//     });
// });

app.post('/resume/create', upload.single('headshotImage'), async (req, res) => {
    const {
        fullName,
        currentPosition,
        currentLength,
        currentTechnologies,
        workHistory,
    } = req.body;

    console.log(req.body);

    res.json({
        message: "Request seccessful",
        data: {},
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});