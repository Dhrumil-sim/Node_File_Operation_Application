import fs from 'fs';
import path from 'path';

export const ensureUploadDirectory = (): void => {
  const dir = path.join(__dirname, '../public/uploads');
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

export const streamFile = (fileName: string, res: fs.WriteStream): void => {
  const filePath = path.join(__dirname, '../public/uploads', fileName);
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
};

module.exports = {
  ensureUploadDirectory,
  deleteFile,
  appendToFile,
  streamFile,
};
