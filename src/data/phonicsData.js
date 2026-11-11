import level1 from "./phonicsLevel1.json";
import level2 from "./phonicsLevel2.json";
import level3 from "./phonicsLevel3.json";
import level4 from "./phonicsLevel4.json";
import level5 from "./phonicsLevel5.json";
import level6 from "./phonicsLevel6.json";
import level7 from "./phonicsLevel7.json";

export const phonicsLevels = {
  1: level1,
  2: level2,
  3: level3,
  4: level4,
  5: level5,
  6: level6,
  7: level7,
};

export function getPhonicsLevel(levelId) {
  return phonicsLevels[Number(levelId)] ?? null;
}
