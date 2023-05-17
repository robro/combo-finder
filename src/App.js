import './App.css'
import compare from './compare'
import evaluate from './evaluate'
import { useState } from 'react'
import PageSelector from './PageSelector'
import ComboRows from './ComboRows'
import ComboHeader from './ComboHeader'

const combo_filters = require('./props.json')
const combo_props = Object.keys(combo_filters)
const combo_data = [...require('./combos.json')]

export default function App() {
  const [sort_prop, setSortProp] = useState('character')
  const [reverse_sort, setReverseSort] = useState(false)
  const [filters, setFilters] = useState({})
  const [cur_page, setCurPage] = useState(1)

  const page_size = 10

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
  function getInfoString() {
    let filter_info = ''
    let combo_nums = ''
    const plural = (filtered_data.length === 1)? '': 's'
    if (page_size < filtered_data.length) {
      combo_nums = `${start_index+1} - ${end_index} of`
    }
    if (Object.keys(filters).length > 0) {
      filter_info = ` where ${Object.keys(filters).map(f =>
        `${f} ${(filters[f].condition === 'Equal To') ? 'is' : filters[f].condition.toLowerCase()}
        "${filters[f].value}"`).join(' and ')}`
    }
    return `Showing ${combo_nums} ${filtered_data.length} combo${plural}${filter_info}.`
  }

  const filtered_data = combo_data.filter(filterCombo).sort((a, b) => (
    compare(a[sort_prop], b[sort_prop], reverse_sort)
  ))
  const total_pages = Math.max(1, Math.ceil(filtered_data.length / page_size))
  if (cur_page > total_pages) {
    setCurPage(total_pages)
  }

  const start_index = (cur_page * page_size) - page_size
  const end_index = Math.min(start_index + page_size, filtered_data.length)

  const reset_filters_btn = (Object.keys(filters).length > 0) ?
    <span className='reset' onClick={resetFilters}>Reset filters</span> : ''

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
        <div className='combo-display'>
          <div className='info'>{getInfoString()}{reset_filters_btn}</div>
          <table className='combo-table'>
            <ComboHeader
              comboProps={combo_props}
              sortProp={sort_prop}
              sortReversed={reverse_sort}
              onSortPropChange={setSortProp}
              onSortReversedChange={setReverseSort} />
            <ComboRows 
              comboData={filtered_data.slice(start_index, end_index)}
              comboProps={combo_props} />
          </table>
        </div>
        <PageSelector
          currentPage={cur_page}
          totalPages={total_pages}
          onCurrentPageChange={setCurPage} />
        <hr className='solid'/>
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

function ComboTable() {
// Props: user_filters
// State: combo_data, sort_prop, reverse_sort
}
