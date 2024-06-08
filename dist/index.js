"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const sumObj = zod_1.default.object({
    a: zod_1.default.number(),
    b: zod_1.default.number()
});
exports.app.get("/sum", (req, res) => {
    try {
        const isParse = sumObj.safeParse(req.body);
        if (!isParse.success) {
            res.status(411).json({
                result: "Invalid Inputs"
            });
            return;
        }
        const result = isParse.data.a + isParse.data.b;
        return res.status(200).json({
            result: result
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "error"
        });
    }
});
exports.app.post("/sum", (req, res) => {
    try {
        const isParse = sumObj.safeParse({
            a: Number(req.headers["a"]),
            b: Number(req.headers["b"])
        });
        if (!isParse.success) {
            res.status(411).json({
                result: "Invalid Inputs"
            });
            return;
        }
        const result = isParse.data.a + isParse.data.b;
        return res.status(200).json({
            result: result
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "error"
        });
    }
});
// we are not listening to the server
// app.listen(8080, ()=>{
//     console.log("Server is running on port 8080")
// })
