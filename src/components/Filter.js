import React from 'react'

const Filter = (props) => {
    return (
            <option key={props.index + 1} name='filterCriteria' value={props.category}>{props.category.charAt(0).toUpperCase() + props.category.slice(1)}</option>
    )
}

export default Filter
