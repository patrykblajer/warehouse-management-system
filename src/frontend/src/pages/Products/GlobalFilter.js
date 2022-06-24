import { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
	const count = preGlobalFilteredRows.length
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce(value => {
		setGlobalFilter(value || undefined)
	}, 300)

	return (
		<div className='form-outline'>
			<input
				value={value || ''}
				onChange={e => {
					setValue(e.target.value)
					onChange(e.target.value)
				}}
				placeholder={`Przeszukaj wśród ${count} pozycji...`}
				id='form1'
				className='form-control'
			/>
		</div>
	)
}
