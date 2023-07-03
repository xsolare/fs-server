/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req: any, res: any, cb: any) => {
    const uploadPath = req.query.path || 'uploads/'; // Используем значение из req.query.path или по умолчанию 'uploads/'
    cb(null, uploadPath);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  }
});

export const upload = multer({ storage });
