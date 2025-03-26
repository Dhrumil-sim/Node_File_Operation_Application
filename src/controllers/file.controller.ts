import { Request, Response } from 'express';
import fs from 'fs';

import {
  ensureUploadDirectory,
  deleteFile,
  appendToFile,
  streamFile,
} from '../utils/fileUtils';

// Ensure uploads directory exists
ensureUploadDirectory();

// Render the home page with a list of files
export const getHomePage = (req: Request, res: Response): void => {
  fs.readdir('uploads/', (err, files) => {
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
export const serveFile = (req: Request, res: unknown): void => {
  const filename = req.params.filename;
  if (res instanceof fs.WriteStream) {
    streamFile(filename, res);
  }
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
