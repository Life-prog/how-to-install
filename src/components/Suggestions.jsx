import React, { useState, useEffect } from 'react'
import { navigate, Link } from 'gatsby'

import clamp from '../utils/clamp'
import classes from '../utils/classes'

const Suggestion = ({ item, isActive }) => {
	return (
		<Link
			to={item.slug}
			className={classes(['suggestion', isActive && 'active'])}
		>
			{item.title}
		</Link>
	)
}

const Suggestions = ({ items }) => {
	const [activeSuggestion, setActiveSuggestion] = useState(-1)

	useEffect(() => {
		setActiveSuggestion(-1)

		const handleKeyDown = e => {
			setActiveSuggestion(n => {
				if (e.key === 'ArrowUp') {
					return clamp(n - 1, 0, items.length - 1)
				}

				if (e.key === 'ArrowDown') {
					return clamp(n + 1, 0, items.length - 1)
				}

				if (e.key === 'Enter' && items && items[n]) {
					navigate(items[n].slug)
				}

				return n
			})
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [items])

	return (
		<div className="suggestions" id="suggestions">
			{items.map((item, index) => (
				<Suggestion
					key={item.slug}
					item={item}
					isActive={index === activeSuggestion}
				/>
			))}
		</div>
	)
}

export default Suggestions
