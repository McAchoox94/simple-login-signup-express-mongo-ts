import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

// Route protégée (par exemple, pour accéder aux utilisateurs)
router.get('/users', authenticateJWT, async (req: Request, res: Response) => {
    try {
      const users = await User.find({}, 'username email');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
  });

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

// Secret pour signer les tokens (vous pouvez le déplacer dans une variable d'environnement)
const JWT_SECRET = 'votre_secret_tres_long_et_securise';

// Route pour Login
router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Utilisateur non trouvé.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Mot de passe incorrect.' });
      }
  
      // Générer un token JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' } // Le token expirera dans 1 heure
      );
  
      res.status(200).json({ message: 'Connexion réussie !', token });
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
