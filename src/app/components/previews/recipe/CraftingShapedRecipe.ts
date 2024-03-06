import { Identifier, ItemStack } from 'deepslate'
import type { SlottedItem } from '../LootTable.js'

function pad(s:string):string{
	let i = s
	while(i.length<3) i+=' '
	return i
}

export function generateItemsForShapedRecipe(___d:any):SlottedItem[]{
	const data = ___d as ShapedRecipeDataModel
	const result:SlottedItem[] = []

	let i = 0
	data.pattern.forEach(row=>{
		let j = 0;
		
		(typeof row==='object' ? pad(row['node']):pad(row)).split('').forEach(char=>{
			if(j>=3)return
			
			const ingredient = char in data.key?data.key[char]:{item:'minecraft:air'}
			
			if('item' in ingredient) {
				result.push({slot:i,item:new ItemStack(Identifier.parse(ingredient.item??'minecraft:air'),1,undefined)})
			}
			j++
			i++
		})

		
	})

	result.push({slot:9,item:new ItemStack(Identifier.parse(data.result.item),data.result.count??1,undefined)})
	
	return result
}


export type RecipeType = 'blocks'|'building'|'equipment'|'food'|'misc'|'redstone'

export interface ShapedRecipeDataModel {
	type:'minecraft:crafting_shaped',
	category?:string,
	key:Record<string,RecipeIngredientDataModel>
	pattern:string[] | {node:string}[]
	result:RecipeResultDataModel
}

interface RecipeResultDataModel {
	item:string,
	count?:number
}

interface RecipeIngredientDataModel {
	item?:string,
	tag?:string
}
