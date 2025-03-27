"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateFile = exports.streamFile = exports.appendToFile = exports.deleteFile = exports.ensureUploadDirectory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ensureUploadDirectory = () => {
    const dir = path_1.default.join(__dirname, '../../public/uploads.js');
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir);
    }
};
exports.ensureUploadDirectory = ensureUploadDirectory;
const deleteFile = (fileName) => {
    const filePath = path_1.default.join(__dirname, '../../public/uploads', fileName);
    console.log(filePath);
    if (fs_1.default.existsSync(filePath)) {
        fs_1.default.unlinkSync(filePath);
    }
    else {
        console.log('file is not exist');
    }
};
exports.deleteFile = deleteFile;
const appendToFile = (fileName, data) => {
    const filePath = path_1.default.join(__dirname, '../../public/uploads', fileName);
    fs_1.default.appendFileSync(filePath, data);
};
exports.appendToFile = appendToFile;
const streamFile = (fileName, res) => {
    const filePath = path_1.default.join(__dirname, '../../public/uploads', fileName);
    // Check if the file exists
    fs_1.default.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.status(404).send('File not found');
            return;
        }
        // Set appropriate headers for displaying text content
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Disposition', 'inline; filename="' + fileName + '"');
        // Create a readable stream from the file
        const stream = fs_1.default.createReadStream(filePath);
        // Handle stream errors
        stream.on('error', (err) => {
            console.error('Error reading the file:', err);
            res.status(500).send('Server Error');
        });
        // Pipe the file stream to the response
        stream.pipe(res);
    });
};
exports.streamFile = streamFile;
const createOrUpdateFile = (fileName, content) => {
    const filePath = path_1.default.join(__dirname, '../../public/uploads', fileName);
    // Create or update the file with the given content
    fs_1.default.writeFileSync(filePath, content, 'utf-8');
};
exports.createOrUpdateFile = createOrUpdateFile;
