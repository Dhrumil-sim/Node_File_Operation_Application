"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controller_js_1 = require("../controllers/file.controller.js"); // Ensure the correct import path
const multer_configuration_js_1 = __importDefault(require("../configurations/multer.configuration.js"));
const router = (0, express_1.Router)();
// Home route
router.get('/', file_controller_js_1.getHomePage);
router.post('/create', file_controller_js_1.createOrUpdateFileContent);
// Upload route
router.post('/upload', multer_configuration_js_1.default, file_controller_js_1.uploadFile);
// Edit file route
router.get('/edit-file/:filename', file_controller_js_1.editFileContent); // Edit file content
// Save changes route
router.post('/update-file', file_controller_js_1.createOrUpdateFileContent); // Save updated content
// Serve file route
router.get('/files/:filename', file_controller_js_1.serveFile);
// Delete file route
router.get('/delete/:filename', file_controller_js_1.deleteUploadedFile);
// Append data to file route
router.post('/append', file_controller_js_1.appendDataToFile);
exports.default = router;
