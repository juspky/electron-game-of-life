# electron-game-of-life

This is a modern themed game of life implimentation made with [Electron], [React] and [styled components]

Made for this [Code Competition] by IT-Talents

Check [Example patterns] for some inspirations

## Running

Assuming you already have node.js and yarn/npm installed.

```bash
git clone https://github.com/spkyghost/electron-game-of-life.git
cd electron-game-of-life
yarn
yarn start
```
or
```bash
npm install
npm start
```

## Packaging

To package the app as a standalone executable run

```bash
yarn package
```
or
```bash
npm package
```

## Notes

- Saves are stored at %appdata%/electron-game-of-life
- The cell color setting takes a hex code converted to a number
- Don't set the the field size enormously high or you might have a bad time

[Code Competition]: https://www.it-talents.de/foerderung/code-competition/code-competition-05-2018
[React]: https://facebook.github.io/react/ 
[Electron]: http://electron.atom.io/ 
[styled components]: https://github.com/styled-components/styled-components
[Example patterns]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns 
