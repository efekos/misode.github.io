export interface CustomizedOreModel {
	size: number,
	tries: number,
	minHeight?: number,
	minAboveBottom?: number,
	minBelowTop?: number,
	maxHeight?: number,
	maxBelowTop?: number,
	maxAboveBottom?: number,
	trapezoid?: boolean,
}

export interface CustomizedModel {
	// Basic
	minHeight: number,
	maxHeight: number,
	seaLevel: number,
	oceans: string,
	caves: boolean,
	noiseCaves: boolean,
	carverCaves: boolean,
	ravines: boolean,
	biomeSize: number,
	// Structures
	strongholds: boolean,
	villages: boolean,
	mineshafts: boolean,
	desertPyramids: boolean,
	jungleTemples: boolean,
	witchHuts: boolean,
	igloos: boolean,
	oceanMonuments: boolean,
	dungeons: boolean,
	dungeonTries: number,
	waterLakes: boolean,
	waterLakeRarity: number,
	lavaLakes: boolean,
	lavaLakeRarity: number,
	// Ores
	dirt: CustomizedOreModel | undefined,
	gravel: CustomizedOreModel | undefined,
	graniteLower: CustomizedOreModel | undefined,
	graniteUpper: CustomizedOreModel | undefined,
	dioriteLower: CustomizedOreModel | undefined,
	dioriteUpper: CustomizedOreModel | undefined,
	andesiteLower: CustomizedOreModel | undefined,
	andesiteUpper: CustomizedOreModel | undefined,
	coalLower: CustomizedOreModel | undefined,
	coalUpper: CustomizedOreModel | undefined,
	ironSmall: CustomizedOreModel | undefined,
	ironMiddle: CustomizedOreModel | undefined,
	ironUpper: CustomizedOreModel | undefined,
	copper: CustomizedOreModel | undefined,
	copperLarge: CustomizedOreModel | undefined,
	goldLower: CustomizedOreModel | undefined,
	gold: CustomizedOreModel | undefined,
	redstoneLower: CustomizedOreModel | undefined,
	redstone: CustomizedOreModel | undefined,
	lapis: CustomizedOreModel | undefined,
	lapisBuried: CustomizedOreModel | undefined,
	diamond: CustomizedOreModel | undefined,
	diamondBuried: CustomizedOreModel | undefined,
	diamondLarge: CustomizedOreModel | undefined,
}

export const DefaultModel: CustomizedModel = {
	minHeight: -64,
	maxHeight: 320,
	seaLevel: 63,
	oceans: 'water',
	caves: true,
	noiseCaves: true,
	carverCaves: true,
	ravines: true,
	biomeSize: 4,

	strongholds: true,
	villages: true,
	mineshafts: true,
	desertPyramids: true,
	jungleTemples: true,
	witchHuts: true,
	igloos: true,
	oceanMonuments: true,
	dungeons: true,
	dungeonTries: 7,
	waterLakes: false,
	waterLakeRarity: 4,
	lavaLakes: true,
	lavaLakeRarity: 80,

	dirt: { size: 33, tries: 7, minHeight: 0, maxHeight: 160 },
	gravel: { size: 33, tries: 14, minAboveBottom: 0, maxBelowTop: 0 },
	graniteLower: { size: 64, tries: 2, minHeight: 0, maxHeight: 60 },
	graniteUpper: { size: 64, tries: 1/6, minHeight: 64, maxHeight: 128 },
	dioriteLower: { size: 64, tries: 2, minHeight: 0, maxHeight: 60 },
	dioriteUpper: { size: 64, tries: 1/6, minHeight: 64, maxHeight: 128 },
	andesiteLower: { size: 64, tries: 2, minHeight: 0, maxHeight: 60 },
	andesiteUpper: { size: 64, tries: 1/6, minHeight: 64, maxHeight: 128 },
	coalLower: { size: 17, tries: 20, minHeight: 0, maxHeight: 192, trapezoid: true },
	coalUpper: { size: 17, tries: 30, minHeight: 136, maxBelowTop: 0 },
	ironSmall: { size: 4, tries: 10, minAboveBottom: 0, maxHeight: 72 },
	ironMiddle: { size: 9, tries: 10, minHeight: -24, maxHeight: 56, trapezoid: true },
	ironUpper: { size: 9, tries: 90, minHeight: 80, maxHeight: 384, trapezoid: true },
	copper: { size: 10, tries: 16, minHeight: -16, maxHeight: 112, trapezoid: true },
	copperLarge: { size: 20, tries: 16, minHeight: -16, maxHeight: 112, trapezoid: true },
	goldLower: { size: 9, tries: 1/2, minHeight: -64, maxBelowTop: -48 },
	gold: { size: 9, tries: 4, minHeight: -64, maxBelowTop: 32, trapezoid: true },
	redstoneLower: { size: 8, tries: 8, minAboveBottom: -32, maxAboveBottom: 32, trapezoid: true },
	redstone: { size: 8, tries: 4, minAboveBottom: 0, maxHeight: 15 },
	lapis: { size: 7, tries: 2, minAboveBottom: -32, maxAboveBottom: 32, trapezoid: true },
	lapisBuried: { size: 7, tries: 4, minAboveBottom: 0, maxHeight: 32 },
	diamond: { size: 4, tries: 7, minAboveBottom: -80, maxAboveBottom: 80, trapezoid: true },
	diamondBuried: { size: 8, tries: 4, minAboveBottom: -80, maxAboveBottom: 80, trapezoid: true },
	diamondLarge: { size: 12, tries: 1/9, minAboveBottom: -80, maxAboveBottom: 80, trapezoid: true },
}
