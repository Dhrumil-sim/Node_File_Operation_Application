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
  const stream = fs.createReadStream(filePath);

  // Set appropriate headers for streaming
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

  // Handle stream errors
  stream.on('error', (err) => {
    console.error('Error reading the file:', err);
    res.status(500).send('Server Error');
  });

  // Pipe the file stream to the response
  stream.pipe(res);
};
module.exports = {
  ensureUploadDirectory,
  deleteFile,
  appendToFile,
  streamFile,
};
