# React Native Clean Architecture CLI

Herramienta CLI para ayudar en el desarrollo de aplicaciones, crea automaticamente el scaffold de codigo para nuevos modulos o nuevos crud de la aplicacion

## Post Install
Despues de instalar la libreria para poder utilizar el comando: **rnca** es necesario linkear el comando con el siguiente comando:

```bash
npm link
```

luego ya puedes utilizar:
```bash
rnca init
```

Si no puedes utilizar **rnca** entonces te recomiendo:
```bash
node_modules/react_native_clean_arch_cli/dist/index.js init
```

| Comando | Opciones                   | Description                           |
| ------- | -------------------------- | ------------------------------------- |
| init    |                            | Comando para inicializar recursos     |
| module  | -i \| --infra              | Comando para crear un nuevo modulo    |
| crud    | -i \| --infra, -n \| --nav | Comando para crear un nuevo crud      |

Esta herramienta hace parte de un kit de desarrollo con arquitectura limpia. 

Mas información en: [React Native Clean Architecture (Docs)](https://crisangera.github.io/react-native-clean-architecture-docs/)
