import { ErrorPanel } from '../ErrorPanel.jsx'
import type { PreviewProps } from './index.js'
import CraftingShapedRecipePreview from './recipe/CraftingShapedRecipePreview.jsx'
import CraftingShapelessRecipePreview from './recipe/CraftingShapelessRecipePreview.jsx'
import SmeltingRecipePreview from './recipe/SmeltingRecipePreview.jsx'

const hasRecipePreview = ['minecraft:crafting_shaped','minecraft:crafting_shapeless','minecraft:smelting','minecraft:blasting','minecraft:smoking','minecraft:campfire_cooking']

export default function RecipePreview({data}: PreviewProps){

	if(!('type' in data)) return <ErrorPanel error={'No preview available.'}></ErrorPanel>
	if(!hasRecipePreview.includes(data['type'])) return <ErrorPanel error={`No preview available for ${data['type']}.`}></ErrorPanel>

	const recipeType = data['type']

	if(recipeType==='minecraft:crafting_shaped') return <CraftingShapedRecipePreview data={data}/>
	if(recipeType==='minecraft:crafting_shapeless') return <CraftingShapelessRecipePreview data={data}/>
	if(recipeType==='minecraft:smelting') return <SmeltingRecipePreview data={data}/>
	if(recipeType==='minecraft:blasting') return <SmeltingRecipePreview data={data}/>
	if(recipeType==='minecraft:smoking') return <SmeltingRecipePreview data={data}/>
	if(recipeType==='minecraft:campfire_cooking') return <SmeltingRecipePreview data={data}/>
	//TODO smithing_transform
	//TODO smithing_trim
	//TODO stonecutting

	else return <span>Couldn't find preview</span>

}
