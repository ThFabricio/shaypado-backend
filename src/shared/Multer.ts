import multer from 'multer';
import path from 'path';

const storegeImage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads/images'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const storegeDocument = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads/documents'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

export const uploadImage = multer({ storage: storegeImage });
export const uploadDocument = multer({ storage: storegeDocument });