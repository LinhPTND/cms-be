"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
function uploadImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req);
            // @ts-ignore
            console.log(req.file);
            // await imageService.saveImage(originalName, buffer, mimetype);
            res.send('Upload thành công!');
        }
        catch (error) {
            // @ts-ignore
            res.status(500).send(error.message);
        }
    });
}
exports.uploadImage = uploadImage;
