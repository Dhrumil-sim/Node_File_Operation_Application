"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateFileContent = exports.editFileContent = exports.appendDataToFile = exports.deleteUploadedFile = exports.serveFile = exports.uploadFile = exports.getHomePage = void 0;
const fs_1 = __importDefault(require("fs"));
const file_util_1 = require("../utils/file.util");
const path_1 = __importDefault(require("path"));
// Ensure uploads directory exists
(0, file_util_1.ensureUploadDirectory)();
const uploadDirPath = path_1.default.join(__dirname, '../../public/uploads');
// Render the home page with a list of files
const getHomePage = (req, res) => {
    fs_1.default.readdir(`${uploadDirPath}/`, (err, files) => {
        if (err) {
            res.status(500).send('Unable to scan files!');
            return;
        }
        res.render('index', { files });
    });
};
exports.getHomePage = getHomePage;
// Handle file upload
const uploadFile = (req, res) => {
    res.redirect('/');
};
exports.uploadFile = uploadFile;
// Serve a file
const serveFile = (req, res) => {
    const filename = req.params.filename;
    (0, file_util_1.streamFile)(filename, res);
};
exports.serveFile = serveFile;
// Delete a file
const deleteUploadedFile = (req, res) => {
    const filename = req.params.filename;
    (0, file_util_1.deleteFile)(filename);
    res.redirect('/');
};
exports.deleteUploadedFile = deleteUploadedFile;
// Append data to a file
const appendDataToFile = (req, res) => {
    const { filename, data } = req.body;
    (0, file_util_1.appendToFile)(filename, data);
    res.redirect('/');
};
exports.appendDataToFile = appendDataToFile;
// Function to edit file content (Load file content into the UI for editing)
const editFileContent = (req, res) => {
    const filename = req.params.filename;
    const filePath = path_1.default.join(uploadDirPath, filename);
    fs_1.default.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Unable to read the file!');
            return;
        }
        res.render('edit-file', { filename, content: data });
    });
};
exports.editFileContent = editFileContent;
// Function to create or update file content
const createOrUpdateFileContent = (req, res) => {
    const { filename, content } = req.body;
    console.log(filename, content);
    (0, file_util_1.createOrUpdateFile)(filename, content);
    res.json({ success: true });
    res.redirect('/');
};
exports.createOrUpdateFileContent = createOrUpdateFileContent;
