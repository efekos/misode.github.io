import { useEffect, useState } from 'preact/hooks'
import { useLocale } from '../../../contexts/Locale.jsx'
import { useVersion } from '../../../contexts/Version.jsx'
import { Btn } from '../../Btn.jsx'
import { BtnMenu } from '../../BtnMenu.jsx'
import { ItemDisplay } from '../../ItemDisplay.jsx'
import type { SlottedItem } from '../LootTable.js'
import { generateSmeltingRecipeItems } from './SmeltingRecipe.js'

export default function SmeltingRecipePreview({ data }: { data: any }) {

	const [items, setItems] = useState<SlottedItem[]>([])
	const { version } = useVersion()
	const [advancedTooltips, setAdvancedTooltips] = useState<boolean>(false)
	const { locale } = useLocale()

	useEffect(() => {

		generateSmeltingRecipeItems(data,version).then(newItems=>{
			setItems(newItems)
		})

	}, [data, advancedTooltips])

	return <>
		<div class='preview-overlay'>

			<img src='/images/smelting.png' class='pixelated' draggable={false} />

			{items.map(item =>

				<div key={item.slot} style={slotStyle(item.slot)}>
					<ItemDisplay item={item.item} slotDecoration={true} advancedTooltip={advancedTooltips} />
				</div>

			)}

			{typeof data.cookingtime === 'number' && <div style={textStyle()}>{data.cookingtime/20} seconds</div>} {/*TODO locale*/}
			{typeof data.experience === 'number' && <div style={text2Style()}>Will give {data.experience} experience</div>} {/*TODO locale*/}
		</div>

		<div className="controls preview-controls">

			<BtnMenu tooltip={locale('settings')} icon='gear'>
				<Btn icon={advancedTooltips ? 'square_fill' : 'square'} label='Advanced tooltips' onClick={() => setAdvancedTooltips(!advancedTooltips)} />
			</BtnMenu>

		</div>
	</>
}



const GUI_WIDTH = 94
const GUI_HEIGHT = 49
const SLOT_SIZE = 18

function slotStyle(slot: number) {
	const x =  slot==1? /*output slot*/66 : /*input slot*/6
	const y = slot==1? /*output slot*/10 : /*input slot*/9
	return {
		left: `${x * 100 / GUI_WIDTH}%`,
		top: `${y * 100 / GUI_HEIGHT}%`,
		width: `${SLOT_SIZE * 100 / GUI_WIDTH}%`,
		height: `${SLOT_SIZE * 100 / GUI_HEIGHT}%`,
	}
}

function textStyle(){
	const x =  25
	const y = 28
	return {
		left: `${x * 100 / GUI_WIDTH}%`,
		top: `${y * 100 / GUI_HEIGHT}%`,
		width: `${SLOT_SIZE * 100 / GUI_WIDTH}%`,
		height: `${SLOT_SIZE * 100 / GUI_HEIGHT}%`,
		fontFamily:'MinecraftSeven,Arial',
		fontSize:'1.5rem',
		fontWeight:'500',
	}
}



function text2Style(){
	const x =  25
	const y = 37
	return {
		left: `${x * 100 / GUI_WIDTH}%`,
		top: `${y * 100 / GUI_HEIGHT}%`,
		width: `${SLOT_SIZE * 100 / GUI_WIDTH}%`,
		height: `${SLOT_SIZE * 100 / GUI_HEIGHT}%`,
		fontFamily:'MinecraftSeven,Arial',
		fontSize:'1.5rem',
		fontWeight:'500',
	}
}
