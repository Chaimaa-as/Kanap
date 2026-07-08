# Kanap - E-Commerce en JavaScript (Projet 5)

Développement Front-End dynamique d'un site e-commerce pour la marque de canapés "Kanap", en utilisant du **JavaScript pur (Vanilla JS)** et une **API REST**.

<img src="./front/images/apercu-kanap.png" alt="Aperçu du site Kanap" width="800">

## 📖 Contexte du projet

Kanap est une marque de canapés qui vendait exclusivement en boutique physique et qui a décidé de lancer sa plateforme e-commerce. La structure HTML/CSS et le Back-End (API) étaient déjà fournis. Ma mission a été d'unifier ces travaux en intégrant dynamiquement les données de l'API avec JavaScript.

## 🎯 Compétences validées

- **Interaction avec une API REST** : Utilisation de `fetch()` pour récupérer (GET) les produits et envoyer (POST) la commande.
- **Manipulation du DOM** : Création et injection dynamique d'éléments HTML (cartes produits, panier) via JavaScript.
- **Gestion du LocalStorage** : Sauvegarde des articles ajoutés au panier (id, couleur, quantité) pour les conserver après fermeture du navigateur.
- **Validation des données** : Utilisation des Expressions Régulières (RegEx) pour contrôler les saisies de l'utilisateur dans le formulaire de commande.
- **Plan de test** : Élaboration d'un plan de test d'acceptation pour vérifier le bon fonctionnement des scénarios utilisateurs.

## 🛠️ Technologies

- HTML5 / CSS3
- JavaScript (Vanilla)
- Node.js (pour le serveur Back-End)

## 📊 Plan de test

Dans le cadre de cette mission, un plan de test d'acceptation a été rédigé pour valider le parcours utilisateur et le bon fonctionnement du code.

[📄 Voir le Plan de Test (PDF)](./plan-de-test-kanap.pdf)

## 💻 Installation locale

Pour faire fonctionner le projet localement, le Front-End et le Back-End doivent être lancés.

### 1. Cloner le dépôt
`git clone https://github.com/Chaimaa-as/Kanap.git`

### 2. Démarrer le Back-End (API)
Ouvrez un terminal dans le dossier `back` et lancez :
1. `npm install`
2. `node server`
Le serveur fonctionnera sur `http://localhost:3000`.

### 3. Lancer le Front-End
Ouvrez le fichier `./front/html/index.html` dans votre navigateur (ou via l'extension Live Server sur VS Code).