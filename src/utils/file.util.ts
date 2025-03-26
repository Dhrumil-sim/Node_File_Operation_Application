import fs from 'fs';
import path from 'path';
import { Response } from 'express';
export const ensureUploadDirectory = (): void => {
  const dir = path.join(__dirname, '../../public/uploads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export const deleteFile = (fileName: string): void => {
  const filePath = path.join(__dirname, '../public/uploads', fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(fileName);
  }
};

export const appendToFile = (fileName: string, data: string): void => {
  const filePath = path.join(__dirname, '../public/uploads', fileName);
  fs.appendFileSync(filePath, data);
};

export const streamFile = (fileName: string, res: Response): void => {
  const filePath = path.join(__dirname, '../../public/uploads', fileName);

  // Check if the file exists
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.status(404).send('File not found');
      return;
    }

    // Set appropriate headers for displaying text content
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'inline; filename="' + fileName + '"');

    // Create a readable stream from the file

    // Pipe the file stream to the response
    stream.pipe(res);
  });
};
module.exports = {
  ensureUploadDirectory,
  deleteFile,
  appendToFile,
  streamFile,
};
