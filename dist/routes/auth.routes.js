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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
// Route pour Signup
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'L\'email est déjà utilisé.' });
        }
        // Hacher le mot de passe
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Créer un nouvel utilisateur
        const newUser = new user_model_1.default({ username, email, password: hashedPassword });
        yield newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
}));
// Route pour Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Vérifier si l'utilisateur existe
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Utilisateur non trouvé.' });
        }
        // Comparer le mot de passe avec celui de la base de données
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }
        res.status(200).json({ message: 'Connexion réussie !' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur du serveur', error });
    }
}));
// Route pour obtenir tous les utilisateurs
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({}, 'username email'); // Ne renvoie que le nom d'utilisateur et l'email
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
}));
exports.default = router;
