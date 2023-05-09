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
const dataGenerationService_1 = __importDefault(require("../src/services/dataGenerationService"));
const bookMetadataRepo_1 = __importDefault(require("../src/repository/bookMetadataRepo"));
//cron job: get new metadata and update static metadata
function getAndUpdateBookMetadata(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newMetadata = JSON.stringify(yield dataGenerationService_1.default.getBookStatistics());
            const newStaticMetadata = yield bookMetadataRepo_1.default.updateStaticMetadata(newMetadata);
            res.status(200).json({ newStaticMetadata });
        }
        catch (error) {
            console.error("get and update metadata failed - " + error);
            res
                .status(500)
                .send({ error: "failed to get and update metadata - server error" });
        }
    });
}
exports.default = getAndUpdateBookMetadata;
;
//# sourceMappingURL=cron.js.map