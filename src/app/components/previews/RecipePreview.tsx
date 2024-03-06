import { ErrorPanel } from '../ErrorPanel.jsx'
import type { PreviewProps } from './index.js'
import CraftingShapedRecipePreview from './recipe/CraftingShapedRecipePreview.jsx'

const hasRecipePreview = ['minecraft:crafting_shaped']

export default function RecipePreview({data}: PreviewProps){

	// TODO locale
	if(!('type' in data)) return <ErrorPanel error={'No preview available.'}></ErrorPanel>
	if(!hasRecipePreview.includes(data['type'])) return <ErrorPanel error={`No preview available for ${data['type']}.`}></ErrorPanel>

	const recipeType = data['type']

	if(recipeType==='minecraft:crafting_shaped') return <CraftingShapedRecipePreview data={data}/>

	else return <span>Couldn't find preview</span>

}
