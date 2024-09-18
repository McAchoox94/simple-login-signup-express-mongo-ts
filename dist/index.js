"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// Routes d'authentification
app.use('/auth', auth_routes_1.default);
mongoose_1.default.connect('mongodb://localhost:27017/login-signup-db')
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});
