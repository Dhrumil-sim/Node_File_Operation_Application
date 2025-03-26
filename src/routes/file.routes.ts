import { Router } from 'express';
import {
  getHomePage,
  uploadFile,
  serveFile,
  deleteUploadedFile,
  appendDataToFile,
} from '../controllers/file.controller';
import upload from '../configurations/multer.configuration.';

const router: Router = Router();

// Home route
router.get('/', getHomePage);

// Upload route
router.post('/upload', upload, uploadFile);

// Serve file route
router.get('/files/:filename', serveFile);

// Delete file route
router.get('/delete/:filename', deleteUploadedFile);

// Append data to file route
router.post('/append', appendDataToFile);

export default router;
