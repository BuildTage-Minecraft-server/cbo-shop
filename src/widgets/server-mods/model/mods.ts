export type ModGroup = {
  title: string;
  note?: string;
  items: readonly string[];
};

export const modGroups: readonly ModGroup[] = [
  {
    title: "Оружие",
    note: "Ядро TACZ и его аддоны. Дополнительно: Gunsmith Lib, звуки, анимации, реалистичный дроп и эффекты выстрела.",
    items: [
      "TACZ",
      "Elite X Quality Guns",
      "Fibers Gunspack",
      "Expanded Arsenal",
      "Gunfire Overhaul",
      "MineOps Ultimate Weaponry",
      "Daffa’s Arsenal",
      "Fallout Pack",
      "Delta Force Melee Pack",
      "Superb Warfare",
    ],
  },
  {
    title: "Броня и экипировка",
    items: [
      "Recon Omega Military Armor",
      "LR Armor",
      "LR Tactical (ножи, гранаты, молотов)",
      "Tactical Suit",
      "Heavy Bunker",
    ],
  },
  {
    title: "Бой и анимации",
    items: [
      "Dox Hitbox",
      "Dox Lean (наклоны)",
      "Not Enough Animations",
      "Player Animation Lib",
      "Shoulder Surfing",
      "Манекены для тренировки",
    ],
  },
  {
    title: "Графика и производительность",
    note: "И другие.",
    items: [
      "Embeddium",
      "ImmediatelyFast",
      "Distant Horizons",
      "ModernFix",
      "FerriteCore",
      "Entity Culling",
      "BadOptimizations",
      "Dynamic FPS",
    ],
  },
  {
    title: "Строительство",
    items: ["Create", "Copycats+", "Framed Blocks", "Construction Wand", "WorldEdit", "Forgematica"],
  },
  {
    title: "Интерфейс",
    items: ["FancyMenu", "Spiffy HUD", "HUD Creator", "JEI", "Searchables"],
  },
  {
    title: "Скрипты и конфиги",
    items: ["KubeJS", "InControl", "Curios (слоты перков)"],
  },
];
