import { Identifier, ItemStack, Items } from 'deepslate'
import type { SlottedItem } from '../LootTable.js'
import { fetchItemTag, VersionId } from '../../../services/index.js'

function pad(s: string): string {
	let i = s
	while (i.length < 3) i += ' '
	return i
}

export async function generateItemsForShapedRecipe(___d: any, versionId: VersionId): Promise<SlottedItem[]> {
	const data = ___d as ShapedRecipeDataModel
	const result: SlottedItem[] = []


	for (let i = 0; i < data.pattern.length; i++) {
		const r = pad(data.pattern[i] as string)
		const row = (typeof r === 'object' ? pad(r['node']) : pad(r))

		for (let j = 0; j < 3; j++) {
			const char = row[j]
			console.log(i, j, row, char)
			const ingredient: RecipeIngredientDataModel = char in data.key ? data.key[char] : { item: 'minecraft:air' }

			if ('item' in ingredient) {
				await result.push({ slot: (i * 3) + j, item: new ItemStack(Identifier.parse(ingredient.item ?? 'stone'), 1) })
			} else if ('tag' in ingredient) {

				const tag = await fetchItemTag(ingredient.tag ?? 'minecraft:planks', versionId)

				await result.push({ slot: (i * 3) + j, item: new ItemStack(Identifier.parse(tag[0]), 1) })
			}

		}

	}


	try {
		result.push({ slot: 9, item: new ItemStack(Identifier.parse(versionId === '1.20.5' ? data.result.id : data.result.item), data.result.count ?? 1, undefined) })
	} catch (e) {

	}

	return Promise.resolve(result.filter(r => !r.item.is(Items.AIR.id)))
}


export type RecipeType = 'blocks' | 'building' | 'equipment' | 'food' | 'misc' | 'redstone'

export interface ShapedRecipeDataModel {
	type: 'minecraft:crafting_shaped',
	category?: string,
	key: Record<string, RecipeIngredientDataModel>
	pattern: string[] | { node: string }[]
	result: RecipeResultDataModel
}

export interface RecipeResultDataModel {
	item: string,
	id: string
	count?: number
}

export interface RecipeIngredientDataModel {
	item?: string,
	tag?: string
}
