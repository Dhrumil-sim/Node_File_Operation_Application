import fs from 'fs';
import path from 'path';

const ensureUploadDirectory = (): void => {
  const dir = path.join(__dirname, '../public/uploads');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const deleteFile = (fileName: string): void => {
  const filePath = path.join(__dirname, '../public/uploads', fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(fileName);
  }
};

const appendToFile = (fileName: string, data: string): void => {
  const filePath = path.join(__dirname, '../public/uploads', fileName);
  fs.appendFileSync(filePath, data);
};

const streamFile = (fileName: string, res: fs.WriteStream): void => {
  const filePath = path.join(__dirname, '../public/uploads', fileName);
  const stream = fs.createReadStream(filePath);
  stream.pipe(res);
};

export default { ensureUploadDirectory, deleteFile, appendToFile, streamFile };
