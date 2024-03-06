import { ItemDisplay } from '../../ItemDisplay.jsx'
import { clamp } from '../../../Utils.js'
import { useEffect, useState } from 'preact/hooks'
import type { SlottedItem } from '../LootTable.js'
import { generateItemsForShapedRecipe } from './CraftingShapedRecipe.js'
import { BtnMenu } from '../../BtnMenu.jsx'
import { Btn } from '../../Btn.jsx'
import { useLocale } from '../../../contexts/Locale.jsx'

export default function CraftingShapedRecipePreview({ data }: { data: any }) {

	const [items, setItems] = useState<SlottedItem[]>([])
	const [advancedTooltips,setAdvancedTooltips] = useState<boolean>(false);
	const {locale} = useLocale()

	useEffect(() => {

		const items = generateItemsForShapedRecipe(data)

		setItems(items)

	}, [data,advancedTooltips])

	return <>
		<div class='preview-overlay'>

			<img src='/images/crafting.png' class='pixelated' draggable={false} />

			{items.map(item =>

				<div key={item.slot} style={slotStyle(item.slot)}>
					<ItemDisplay item={item.item} slotDecoration={true} advancedTooltip={advancedTooltips}/>
				</div>

			)}
		</div>

		<div className="controls preview-controls">

			<BtnMenu tooltip={locale('settings')} icon='gear'>
				<Btn icon={advancedTooltips?'square_fill':'square'} label='Advanced tooltips' onClick={()=>setAdvancedTooltips(!advancedTooltips)} />
			</BtnMenu>

		</div>
	</>
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
