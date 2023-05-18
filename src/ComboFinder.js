import { useState } from 'react'
import evaluate from './evaluate'
import ComboFilters from './ComboFilters'
import ComboDisplay from './ComboDisplay'

export default function ComboFinder({
  comboData,
  comboProps,
  filterInfo
}) {
  const [filters, setFilters] = useState({})

  function filterCombo(combo) {
    let combo_value
    let filter_value
    let condition
    for (let prop in filters) {
      if (filters[prop].value) {
        combo_value = combo[prop]
        filter_value = filters[prop].value
        condition = filters[prop].condition.toLowerCase()
        try {combo_value = combo_value.toLowerCase()} catch {}
        try {filter_value = filter_value.toLowerCase()} catch {}
        if (!evaluate[condition](combo_value, filter_value)) return false
      }}
    return true
  }

  function resetFilters() {
    let condition_elems = [...document.getElementsByClassName('condition')]
    let value_elems = [...document.getElementsByClassName('value')]
    condition_elems.forEach(elem => elem.value = elem.options[0].value)
    value_elems.forEach(elem => elem.value = '')
    setFilters({})
  }

  return (
    <div className='combo-finder'>
      <ComboFilters
        filterInfo={filterInfo}
        comboProps={comboProps}
        onFiltersSubmit={setFilters} />
      <ComboDisplay
        comboData={comboData.filter(filterCombo)}
        comboProps={comboProps}
        filters={filters}
        onFiltersReset={resetFilters} />
    </div>
  )
}