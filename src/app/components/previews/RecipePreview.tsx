import type { PreviewProps } from './index.js'
import CraftingShapedRecipePreview from './recipe/CraftingShapedRecipePreview.jsx'

const hasRecipePreview = ['minecraft:crafting_shaped']

export default function RecipePreview({data}: PreviewProps){

	if(!('type' in data)) return <span>No preview available.</span> // TODO locale
	if(!hasRecipePreview.includes(data['type'])) return <span>No preview available for {data['type']}.</span>

	const recipeType = data['type']

	if(recipeType==='minecraft:crafting_shaped') return <CraftingShapedRecipePreview data={data}/>

	else return <span>Couldn't find preview</span>

}
