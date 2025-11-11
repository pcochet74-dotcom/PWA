const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname)); // Sert les fichiers HTML/CSS/JS
app.use(bodyParser.json());

// Route pour créer un compte
app.post('/creer-compte', (req, res) => {
  const nouveauCompte = req.body;

  let comptes = [];
  if (fs.existsSync('comptes.json')) {
    comptes = JSON.parse(fs.readFileSync('comptes.json'));
  }

  comptes.push(nouveauCompte);
  fs.writeFileSync('comptes.json', JSON.stringify(comptes, null, 2));

  res.json({ message: 'Compte enregistré avec succès' });
});

// ✅ Nouvelle route pour la connexion
app.post('/connexion', (req, res) => {
  const { username, password } = req.body;

  // Vérifie si le fichier existe
  if (!fs.existsSync('comptes.json')) {
    return res.json({ success: false, message: "Aucun compte enregistré." });
  }

  // Lit les comptes
  const comptes = JSON.parse(fs.readFileSync('comptes.json'));

  // Cherche un compte correspondant
  const compteTrouve = comptes.find(
    c => c.username === username && c.password === password
  );

  if (compteTrouve) {
    res.json({ success: true, message: "Connexion réussie !" });
  } else {
    res.json({ success: false, message: "Nom d'utilisateur ou mot de passe incorrect." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
