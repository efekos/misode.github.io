import { ItemStack ,Identifier } from 'deepslate'
import type { VersionId} from '../../../services/index.js'
import { fetchItemTag } from '../../../services/index.js'
import type { SlottedItem } from '../LootTable.js'
import type { RecipeCategory, RecipeIngredientDataModel } from './Common.js'

export async function generateSmeltingRecipeItems(___d: any, versionId: VersionId): Promise<SlottedItem[]> {
	const data = ___d as SmeltingRecipeDataModel
	const result: SlottedItem[] = []

	if (typeof data.ingredient === 'object') {
		const ingredient = data.ingredient

		if ('item' in ingredient) {
			await result.push({ slot: 0, item: new ItemStack(Identifier.parse(ingredient.item ?? 'stone'), 1) })
		} else if ('tag' in ingredient) {

			const tag = await fetchItemTag(ingredient.tag ?? 'minecraft:planks', versionId)

			await result.push({ slot: 0, item: new ItemStack(Identifier.parse(tag[0]), 1) })
		}
	}

	result.push({slot:1,item:new ItemStack(Identifier.parse(data.result),1)})

	return result
}


export interface SmeltingRecipeDataModel {
	type: 'minecraft:smelting'
	group?: string
	category?: RecipeCategory
	ingredient: RecipeIngredientDataModel | RecipeIngredientDataModel[]
	result: string
}
