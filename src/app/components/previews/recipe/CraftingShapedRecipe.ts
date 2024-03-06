import { Identifier, ItemStack, NbtCompound } from 'deepslate'
import type { SlottedItem } from '../LootTable.js'
import type { VersionId } from '../../../services/index.js'

function pad(s: string): string {
	let i = s
	while (i.length < 3) i += ' '
	return i
}

export function generateItemsForShapedRecipe(___d: any,versionId:VersionId): SlottedItem[] {
	const data = ___d as ShapedRecipeDataModel
	const result: SlottedItem[] = []

	let i = 0
	data.pattern.forEach(row => {
		let j = 0;

		(typeof row === 'object' ? pad(row['node']) : pad(row)).split('').forEach(async char => {
			if (j >= 3) return

			const ingredient = char in data.key ? data.key[char] : { item: 'minecraft:air' }

			if ('item' in ingredient) {
				result.push({ slot: i, item: new ItemStack(Identifier.parse(ingredient.item ?? 'minecraft:air'), 1, undefined) })
			} else if ('tag' in ingredient) {

				// TODO: fetch the tag & put first element to display

				result.push({
					slot: i, item: new ItemStack(new Identifier('minecraft', 'barrier'), 1),
				})

			}


			j++
			i++
		})


	})

	try {
		result.push({ slot: 9, item: new ItemStack(Identifier.parse(versionId==='1.20.5'?data.result.id:data.result.item), data.result.count ?? 1, undefined) })
	} catch(e){
		
	}

	return result
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
	id:string
	count?: number
}

export interface RecipeIngredientDataModel {
	item?: string,
	tag?: string
}
