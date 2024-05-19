# React Native Clean Architecture CLI

Herramienta CLI para ayudar en el desarrollo de aplicaciones, crea automaticamente el scaffold de codigo para nuevos modulos o nuevos crud de la aplicacion

Mas información en: [React Native Clean Architecture (Docs)](https://crisangera.github.io/react-native-clean-architecture-docs/)

## Steps for deploy
git switch -c production
rm -rf dist
bun run build
rm -rf node_modules src .gitignore bun.lockb index.ts readme.md tsconfig.json