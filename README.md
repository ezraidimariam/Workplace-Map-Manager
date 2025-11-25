🔷WorkSphere – Virtual workplace
WorkSphere – Virtual workplace est une application web interactive permettant de gérer et organiser les employés sur un plan d’étage.
Elle offre une interface fluide, claire et responsive, avec des règles d'accès strictes pour garantir une organisation professionnelle et cohérente.

___ Fonctionnalités principales

➕ Ajout d’employés via une modale

Informations collectées :

-Nom

-Rôle

-Email

-Téléphone

Photo de profil

Expériences professionnelles

📋 Gestion dynamique des employés

-Liste des employés non assignés

-Déplacement des employés vers l'une des 6 zones du bâtiment

-Mise à jour automatique de la liste

🔒 Règles d’accès automatiques

-Zone	Rôle autorisé
-Réception	Réceptionnistes
-Salle des serveurs	Techniciens IT
-Sécurité	Agents de sécurité
-Manager	Accès total
-Nettoyage	Toutes zones sauf Archives

❌ Suppression & retrait

-Bouton X pour retirer un employé du plan

👤 Profil de l’employé

-Informations détaillées affichées via une modale dédiée

🔍 Recherche

-Filtrage par nom ou rôle

📱 Responsive Design

-Desktop : ≥ 1280 px

-Laptop : 1024–1279 px

-Tablette : 768–1023 px

-Mobile : < 767 px

💾 Fonctionnalités optionnelles

-Sauvegarde via LocalStorage

-Logs internes

🖼️ Aperçu du projet

-Mockup : plan d’étage avec zones + employés non assignés

📁 Structure du projet
```
Work-Map-Manager
├── index.html
├── styles/
│    ├── style.css
│    └── responsive.css
├── scripts/
│    ├── app.js
│    ├── zones.js
│    └── employees.js
├── assets/
│    ├── images/
│    └── icons/
└── README.md
```

🧰 Technologies utilisées

-HTML5 — Structure sémantique

-CSS3 — Flexbox, Grid, Media Queries

-JavaScript Vanilla — DOM + logique interne

-LocalStorage (optionnel)

-Git / GitHub — Versionnement & déploiement

🧪 Tests & Validation

✅ Validation HTML (W3C Validator)
✅ Vérification CSS
✅ Tests des règles d’accès
✅ Tests manuels (ajout, suppression, modales, déplacements, responsive)

🌐 Navigateurs testés : Chrome, Firefox, Edge

🔧 Installation

git clone https://github.com/ezraidimariam/Work-Map-Manager.git


➡️ Ouvrir index.html dans le navigateur.

-Aucune installation ou dépendance requise.

🌐 Déploiement

-Compatible avec :

-GitHub Pages

-Netlify

📊 Améliorations futures

-Mode Admin

-Drag & Drop des employés

-Exportation des configurations (JSON)

-Authentification

-Gestion multi-étages

-Connexion à une API externe