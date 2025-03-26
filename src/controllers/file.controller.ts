import { Request, Response } from 'express';
import fs from 'fs';

import {
  ensureUploadDirectory,
  deleteFile,
  appendToFile,
  streamFile,
} from '../utils/file.util';
import path from 'path';

// Ensure uploads directory exists
ensureUploadDirectory();

const uploadDirPath = path.join(__dirname, '../../public/uploads');
// Render the home page with a list of files
export const getHomePage = (req: Request, res: Response): void => {
  fs.readdir(`${uploadDirPath}/`, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan files!');
      return;
    }
    res.render('index', { files });
  });
};

// Handle file upload
export const uploadFile = (req: Request, res: Response): void => {
  res.redirect('/');
};

// Serve a file
export const serveFile = (req: Request, res: Response): void => {
  const filename = req.params.filename;
  streamFile(filename, res as Response<unknown, Record<string, unknown>>);
};

// Delete a file
export const deleteUploadedFile = (req: Request, res: Response): void => {
  const filename = req.params.filename;
  deleteFile(filename);
  res.redirect('/');
};

// Append data to a file
export const appendDataToFile = (req: Request, res: Response): void => {
  const { filename, data } = req.body;
  appendToFile(filename, data);
  res.redirect('/');
};
