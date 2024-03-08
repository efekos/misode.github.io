import { Identifier, ItemStack, Items } from 'deepslate'
import type { SlottedItem } from '../LootTable.js'
import type { VersionId } from '../../../services/index.js'
import { fetchItemTag } from '../../../services/index.js'
import type { RecipeCategory, RecipeIngredientDataModel, RecipeResultDataModel } from './Common.js'

export async function generateItemsForShapelessRecipe(___d: any, versionId: VersionId): Promise<SlottedItem[]> {
	const data = ___d as ShapelessRecipeDataModel
	const result: SlottedItem[] = []


	console.log(data.ingredients)
	for (let i = 0; i < data.ingredients.length; i++) {
		const ingredient = ('node' in data.ingredients[i] ? data.ingredients[i]['node'] : data.ingredients[i])??{item:'stone'}
		
		if ('item' in ingredient) {
			await result.push({ slot: i, item: new ItemStack(Identifier.parse(ingredient.item ?? 'stone'), 1) })
		} else if ('tag' in ingredient) {

			const tag = await fetchItemTag(ingredient.tag ?? 'minecraft:planks', versionId)

			await result.push({ slot: i, item: new ItemStack(Identifier.parse(tag[0]), 1) })
		}

	}


	try {
		result.push({ slot: 9, item: new ItemStack(Identifier.parse(versionId === '1.20.5' ? data.result.id : data.result.item), data.result.count ?? 1, undefined) })
	} catch (e) {

	}

	return Promise.resolve(result.filter(r => !r.item.is(Items.AIR.id)))
}


export interface ShapelessRecipeDataModel {
	type: 'minecraft:crafting_shapeless',
	category?: RecipeCategory,
	ingredients: RecipeIngredientDataModel[]
	result: RecipeResultDataModel
}
