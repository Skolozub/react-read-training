import { alphabet, texts } from "./constants";

export const shulte = {
  symbols: [...alphabet, "к"],
  solution: ["а", "б", "в", "г", "д"],
  rows: 7,
  cols: 5,
  withDot: true
};

export const speedread = {
  texts
};

export const stroop = {
  colors: [
    ["красный", "#fc2c03"],
    ["синий", "#fc2c03"],
    ["зелёный", "#fc2c03"],
    ["жёлтый", "#fc2c03"],
    ["чёрный", "#000"],
    ["оранжевый", "#ff8c00"],
    ["розовый", "#ff0095"],
    ["голубой", "#00e1ff"],
    ["фиолетовый", "#7b32a8"]
  ]
};
