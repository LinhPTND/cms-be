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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCodeLetter = exports.getCodeLetter = exports.deleteContinueStudyingLetter = exports.updateContinueStudyingLetter = exports.detailContinueStudyingLetter = exports.getContinueStudyingLetterByUserId = exports.createContinueStudyingLetter = void 0;
const continueStudying_model_1 = __importDefault(require("../../model/Letters/continueStudying.model"));
const rsaKey_1 = __importDefault(require("../../model/Letters/rsaKey"));
const user_model_1 = __importDefault(require("../../model/user.model"));
const userLetter_model_1 = __importDefault(require("../../model/userLetter.model"));
const Rsa_1 = __importDefault(require("../../service/Rsa"));
const otp_1 = require("../../utils/otp");
const otp_2 = require("./../../utils/otp");
// Đơn hủy học phần
function createContinueStudyingLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const msv = req.body.msv;
            const user = yield user_model_1.default.findByMSV(msv);
            if (!user) {
                return res.send({
                    success: false,
                    message: "Not find user",
                });
            }
            const rsaData = yield rsaKey_1.default.findOne({
                user: user._id,
                teacher: req.body.approved,
            });
            let codeOtp;
            if (!rsaData) {
                const rsaKeyService = new Rsa_1.default({});
                const rsa = yield rsaKey_1.default.create({
                    user: user._id,
                    teacher: req.body.approved,
                    publicKey: rsaKeyService.getPublicKey(),
                    privateKey: rsaKeyService.getPrivateKey(),
                });
                codeOtp = (0, otp_2.getCodeOtp)(rsa.privateKey, rsa.publicKey);
            }
            else {
                codeOtp = (0, otp_2.getCodeOtp)(rsaData.privateKey, rsaData.publicKey);
            }
            const newLetter = yield continueStudying_model_1.default.create(Object.assign(Object.assign({}, req.body), { hashCode: codeOtp.hashedOtp }));
            if (newLetter) {
                yield userLetter_model_1.default.findOneAndUpdate({ user: user._id }, {
                    user: user,
                    $push: { continueStudying: newLetter._id },
                }, {
                    new: true,
                    upsert: true,
                });
                return res.send({
                    success: true,
                });
            }
            else {
                return res.status(500).send({
                    success: false,
                    message: "Can not create Letter",
                });
            }
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.createContinueStudyingLetter = createContinueStudyingLetter;
function getContinueStudyingLetterByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id: userId } = req.params;
            const letter = yield userLetter_model_1.default.findOne({ user: userId }).populate("continueStudying");
            if (!letter) {
                return res.send({
                    success: false,
                    message: "userId not match letter",
                });
            }
            return res.send({
                success: true,
                data: letter.continueStudying,
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.getContinueStudyingLetterByUserId = getContinueStudyingLetterByUserId;
function detailContinueStudyingLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield continueStudying_model_1.default.findById(id);
            return res.send({
                success: true,
                data: data,
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.detailContinueStudyingLetter = detailContinueStudyingLetter;
function updateContinueStudyingLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const letter = yield continueStudying_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
            upsert: true,
        });
        return res.send({
            success: true,
            data: letter,
        });
    });
}
exports.updateContinueStudyingLetter = updateContinueStudyingLetter;
function deleteContinueStudyingLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const letter = yield continueStudying_model_1.default.findById(id);
            if (!letter) {
                return res.send({
                    success: false,
                    message: "letter does not match",
                });
            }
            yield letter.delete();
            const userLetter = yield userLetter_model_1.default.findOneAndUpdate({
                continueStudying: letter,
            }, {
                $pull: { continueStudying: id },
            }, {
                new: true,
                upsert: true,
            });
            return res.send({
                success: true,
                data: "Delete letter success",
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.deleteContinueStudyingLetter = deleteContinueStudyingLetter;
function getCodeLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { msv, email, teacherId } = req.body;
            const letter = yield continueStudying_model_1.default.findById(id);
            if (!letter) {
                return res.send({
                    success: false,
                    message: "Id not match Letter",
                });
            }
            const user = yield user_model_1.default.findByMSV(msv);
            if (!user) {
                return res.send({
                    success: false,
                    message: "User not match",
                });
            }
            const rsaKey = yield rsaKey_1.default.findOne({
                user: user === null || user === void 0 ? void 0 : user._id,
                teacher: teacherId,
            });
            if (!rsaKey) {
                return res.send({
                    success: false,
                    message: "Rsa key not find, you must create new letter",
                });
            }
            const rsaService = new Rsa_1.default({
                privateKey: rsaKey.privateKey,
                publicKey: rsaKey.publicKey,
            });
            const hashCode = letter.hashCode;
            const otp = rsaService.decrypt(hashCode);
            yield (0, otp_1.sendOTPLetter)({
                email: email,
                otp: otp,
            });
            return res.send({
                success: true,
                message: "Check your gmail",
            });
        }
        catch (error) {
            return res.status(500).send({
                success: false,
                data: error,
            });
        }
    });
}
exports.getCodeLetter = getCodeLetter;
function verifyCodeLetter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { otp, msv, teacherId } = req.body;
        const { id } = req.params;
        const letter = yield continueStudying_model_1.default.findById(id);
        if (!letter) {
            return res.send({
                success: false,
                message: "Id not match Letter",
            });
        }
        const user = yield user_model_1.default.findByMSV(msv);
        if (!user) {
            return res.send({
                success: false,
                message: "User not match",
            });
        }
        const rsaKey = yield rsaKey_1.default.findOne({
            user: user === null || user === void 0 ? void 0 : user._id,
            teacher: teacherId,
        });
        if (!rsaKey) {
            return res.send({
                success: false,
                message: "Rsa key not find, you must create new letter",
            });
        }
        const rsaService = new Rsa_1.default({
            privateKey: rsaKey.privateKey,
            publicKey: rsaKey.publicKey,
        });
        const otpLetter = rsaService.decrypt(letter.hashCode);
        const validOTP = otpLetter === otp;
        if (!validOTP) {
            return res.send({
                success: false,
                message: "OTP invalid",
            });
        }
        return res.send({
            success: true,
            message: "OTP verify success",
        });
    });
}
exports.verifyCodeLetter = verifyCodeLetter;
