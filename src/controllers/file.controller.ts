import { Request, Response } from 'express';
import fs from 'fs';

import {
  ensureUploadDirectory,
  deleteFile,
  appendToFile,
  streamFile,
  createOrUpdateFile,
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

// Function to edit file content (Load file content into the UI for editing)
export const editFileContent = (req: Request, res: Response): void => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDirPath, filename);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Unable to read the file!');
      return;
    }
    res.render('edit-file', { filename, content: data });
  });
};

// Function to create or update file content
export const createOrUpdateFileContent = (
  req: Request,
  res: Response,
): void => {
  const { filename, content } = req.body;
  console.log(filename, content);
  createOrUpdateFile(filename, content);
  res.json({ success: true });
  res.redirect('/');
};
