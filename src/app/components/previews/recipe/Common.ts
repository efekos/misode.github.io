
export interface RecipeResultDataModel {
	item: string,
	id: string
	count?: number
}

export interface RecipeIngredientDataModel {
	item?: string,
	tag?: string,
	node?:RecipeIngredientDataModel // why does this even exist omfg im so done rn why would u wrap the thing under a node just give it bro
}

export type RecipeCategory = 'blocks' | 'building' | 'equipment' | 'food' | 'misc' | 'redstone'
