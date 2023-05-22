import { useState } from 'react'
import evaluate from './evaluate'
import ComboFilters from './ComboFilters'
import ComboDisplay from './ComboDisplay'

export default function ComboFinder({
  comboData,
  comboProps,
  filterInfo,
  modernNotation,
  modernFilter,
  children
}) {
  const [filters, setFilters] = useState({})
  const [controlType, setControlType] = useState('classic')

  function filterCombo(combo) {
    let combo_value
    let filter_value
    let condition
    
    for (const prop in filters) {
      if (filters[prop].value) {
        combo_value = combo[prop]
        filter_value = filters[prop].value
        condition = filters[prop].condition.toLowerCase()
        try {combo_value = combo_value.toLowerCase()} catch {}
        try {filter_value = filter_value.toLowerCase()} catch {}

        if (!evaluate[condition](combo_value, filter_value))
          return false
      }}
    return true
  }

  function filterModern(combo) {
    if (controlType !== 'modern')
      return true

    try {
      for (const move of modernFilter[combo.character]) {
        const regex = new RegExp(move, 'g')
        if (regex.test(combo.notation)) {
          return false
        }
      }
    }
    catch {
      return false
    }
    return true
  }

  function translateModern(combo) {
    if (controlType !== 'modern')
      return combo

    const modern_combo = {...combo}

    for (const move of modernNotation[combo.character]) {
      modern_combo.notation = modern_combo.notation.replaceAll(move.classic, move.modern)
    }
    return modern_combo
  }

  return (
    <div className='combo-finder'>
      <ComboFilters
        filterInfo={filterInfo}
        comboProps={comboProps}
        filters={filters}
        onFiltersSubmit={setFilters}
        onControlTypeChange={setControlType} />
      <ComboDisplay
        comboData={comboData.filter(filterModern).map(translateModern).filter(filterCombo)}
        comboProps={comboProps}
        filters={filters}
        onFiltersReset={setFilters} />
      {children}
    </div>
  )
}
