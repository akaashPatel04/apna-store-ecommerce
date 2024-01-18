import multer from "multer";


const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "./back-end/uploads")
    },
    filename(req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }

})

export const profileUpload = multer({ storage }).single('avatar')