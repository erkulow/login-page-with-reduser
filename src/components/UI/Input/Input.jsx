import React, { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
	return (
		<>
			<input
				style={{
					borderColor: props.valid
						? '#2ecc71'
						: props.valid === null
						? '#3498db'
						: 'red',
				}}
				onChange={props.onChange}
				onBlur={props.onBlur}
				type={props.type}
				name={props.name}
				id={props.id}
				placeholder={props.placeholder}
				value={props.value}
				href={props.href}
				ref={ref}
			/>
		</>
	)
})

export default Input
