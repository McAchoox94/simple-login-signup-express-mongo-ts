import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const router = Router();

// Route pour Signup
router.post('/signup', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'L\'email est déjà utilisé.' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});

// Route pour Login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé.' });
    }

    // Comparer le mot de passe avec celui de la base de données
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    res.status(200).json({ message: 'Connexion réussie !' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur du serveur', error });
  }
});

// Route pour obtenir tous les utilisateurs
router.get('/users', async (req: Request, res: Response) => {
    try {
      const users = await User.find({}, 'username email'); // Ne renvoie que le nom d'utilisateur et l'email
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
  });
  

export default router;
