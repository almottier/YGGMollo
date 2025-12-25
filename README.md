<p align="center">
  <img src="icons/icon.png" alt="YGGMollo" width="128">
</p>


# YGGMollo

Extension Chrome qui ajoute un bouton Télécharger via [Ygg-API](https://yggapi.eu) sur les pages YGGTorrent.

Il n'y a donc plus de limite de temps ni sur le nombre de torrents téléchargés.

![Screenshot](assets/screenshot.png)

## Fonctionnalités

- Sauvegardez votre passkey dans les paramètres de l'extension
- Ajoute un bouton `Télécharger YGG-API` sur la page à côté du bouton de téléchargement normal
- En cliquant sur ce bouton, le torrent sera téléchargé via ygg-api

## Installation

### Chrome Web Store

*(Prochainement)*

### Installation manuelle

1. Téléchargez le projet
2. Ouvrez `chrome://extensions/`
3. Activez le "Mode développeur"
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier du projet

## Développement

### Build
```bash
make build    # Crée build/yggmollo-v1.0.0.zip
make clean    # Nettoie le dossier build
```

## Licence

MIT
