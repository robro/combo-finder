import './App.css'
import evaluate from './evaluate'
import { useState } from 'react'
import ComboDisplay from './ComboDisplay'

const combo_filters = require('./props.json')
const combo_props = Object.keys(combo_filters)
const combo_data = [...require('./combos.json')]

export default function App() {
  const [filters, setFilters] = useState({})

  // console.log('App()')

  function submitFilters() {
    let new_filters = {}
    for (const prop of combo_props) {
      let condition = document.getElementById(prop+'-condition')
      condition = (condition) ? condition.value : 'Equal To'
      let value = document.getElementById(prop+'-value').value
      if (!value) continue
      new_filters[prop] = {'condition': condition, 'value': value}
    }
    setFilters(new_filters)
  }
  function resetFilters() {
    let condition_elems = [...document.getElementsByClassName('condition')]
    let value_elems = [...document.getElementsByClassName('value')]
    condition_elems.map(elem => elem.value = elem.options[0].value)
    value_elems.map(elem => elem.value = '')
    setFilters({})
  }
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
  function createFilter(prop, label=true, on_change=null) { return (
    <tr className='filter-row'>
      {(label) ? <td><label className='capitalize'>{prop}</label></td> : null}
      {(combo_filters[prop].compare.length > 1) ? <>
      <td><select className='drop condition' id={prop+'-condition'}>
        {combo_filters[prop].compare.map(option => (
          <option value={option}>{option}</option>
        ))}
      </select></td><td>
      <input className='filter-input value' id={prop+'-value'} maxLength={100}/></td></> :
      <td colSpan={2}><select className='drop value' id={prop+'-value'} onChange={on_change}>
        <option value=''>{combo_filters[prop].options[0]}</option>
        {combo_filters[prop].options.slice(1).map(option => (
          <option value={option}>{option}</option>
        ))}
      </select></td>}
    </tr>
  )}

  const filtered_data = combo_data.filter(filterCombo)

  return (
    <div className='app'>
      <div className='title-bar'>
        <div className='title'><h1>🔎 Combo Finder</h1></div>
      </div>
      <div className='body'>
        <div className='filter-bar'>
          {createFilter('character', false, submitFilters)}
          <button className='btn btn-main' type='button' onClick={submitFilters}>All Filters</button>
        </div>
        <table className='filter-table'>
          <tbody>{combo_props.slice(1).map(prop => createFilter(prop))}</tbody>
        </table>
        <ComboDisplay
          comboData={filtered_data}
          comboProps={combo_props}
          filters={filters}
          onFiltersChange={setFilters} />
      </div>
    </div>
  )
}

function ComboFinder() {
  // State: user_filters
}

function ComboFilters() {
  // Props: user_filters
}
