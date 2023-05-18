import './App.css'
import evaluate from './evaluate'
import { useState } from 'react'
import ComboDisplay from './ComboDisplay'
import ComboFilters from './ComboFilters'

const FILTER_INFO = require('./props.json')
const COMBO_PROPS = Object.keys(FILTER_INFO)
const COMBO_DATA = [...require('./combos.json')]

export default function App() {
  const [filters, setFilters] = useState({})

  console.log('App()')

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
    <div className='app'>
      <div className='title-bar'>
        <div className='title'><h1>🔎 Combo Finder</h1></div>
      </div>
      <div className='combo-finder'>
        <ComboFilters 
          filterInfo={FILTER_INFO}
          comboProps={COMBO_PROPS}
          onFiltersSubmit={setFilters} />
        <ComboDisplay
          comboData={COMBO_DATA.filter(filterCombo)}
          comboProps={COMBO_PROPS}
          filters={filters}
          onFiltersReset={resetFilters} />
      </div>
    </div>
  )
}

function ComboFinder() {
  // State: user_filters
}
