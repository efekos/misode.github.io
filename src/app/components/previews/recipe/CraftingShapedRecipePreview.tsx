import { ItemDisplay } from '../../ItemDisplay.jsx'
import { clamp } from '../../../Utils.js'
import { useEffect, useState } from 'preact/hooks'
import type { SlottedItem } from '../LootTable.js'
import { generateItemsForShapedRecipe } from './CraftingShapedRecipe.js'

export default function CraftingShapedRecipePreview({ data }: { data: any }) {

	const [items, setItems] = useState<SlottedItem[]>([])

	useEffect(() => {

		const items = generateItemsForShapedRecipe(data)

		setItems(items)

	}, [data])

	return <div class='preview-overlay'>

		<img src='/images/crafting.png' class='pixelated' draggable={false} />

		{items.map(item =>

			<div key={item.slot} style={slotStyle(item.slot)}>
				<ItemDisplay item={item.item} slotDecoration={true} />
			</div>

		)}


	</div>
}



const GUI_WIDTH = 129
const GUI_HEIGHT = 67
const SLOT_SIZE = 18

function slotStyle(slot: number) {
	slot = clamp(slot, 0, 9)
	const x = (slot % 3) * SLOT_SIZE + (slot == 9 ? 101 : 6)
	const y = (Math.floor(slot / 3)) * SLOT_SIZE + (slot == 9 ? -29 : 7)
	return {
		left: `${x * 100 / GUI_WIDTH}%`,
		top: `${y * 100 / GUI_HEIGHT}%`,
		width: `${SLOT_SIZE * 100 / GUI_WIDTH}%`,
		height: `${SLOT_SIZE * 100 / GUI_HEIGHT}%`,
	}
}
