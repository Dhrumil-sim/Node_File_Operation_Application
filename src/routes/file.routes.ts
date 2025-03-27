import { Router } from 'express';
import {
  getHomePage,
  uploadFile,
  serveFile,
  deleteUploadedFile,
  appendDataToFile,
  createOrUpdateFileContent,
  editFileContent,
} from '../controllers/file.controller'; // Ensure the correct import path
import upload from '../configurations/multer.configuration';

const router: Router = Router();

// Home route
router.get('/', getHomePage);

router.post('/create', createOrUpdateFileContent);
// Upload route
router.post('/upload', upload, uploadFile);

// Edit file route
router.get('/edit-file/:filename', editFileContent); // Edit file content

// Save changes route
router.post('/update-file', createOrUpdateFileContent); // Save updated content

// Serve file route
router.get('/files/:filename', serveFile);

// Delete file route
router.get('/delete/:filename', deleteUploadedFile);

// Append data to file route
router.post('/append', appendDataToFile);

export default router;
