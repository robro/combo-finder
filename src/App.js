import './App.css'
import compare from './compare'
import evaluate from './evaluate'
import { useState } from 'react'

const combos = require('./combos.json')
const chars = [...new Set(combos.data.map(combo => combo['character']))].sort(compare)

function App() {
  const [combo_data, setComboData] = useState([...combos.data])
  const [sort_prop, setSortProp] = useState('character')
  const [reverse_sort, setReverseSort] = useState(false)
  const [filters, setFilters] = useState({})

  const setSorting = (event) => {
    const new_prop = event.target.textContent
    const new_sort = (new_prop === sort_prop)? !reverse_sort: false
    setSortProp(new_prop)
    setReverseSort(new_sort)
  }
  const sortStatus = (prop) => {
    if (prop !== sort_prop) return ''
    if (reverse_sort) return 'descend'
    return 'ascend'
  }
  const updateFilters = (event) => {
    const key = event.target.name
    const op = event.target.id
    const value = event.target.value
    const new_filters = {...filters, [key]: {'op': op, 'value': value}}
    setFilters(new_filters)
  }
  const filterCombo = (combo) => {
    for (let prop in filters) {
      if (filters[prop].value) {
        if (!evaluate[filters[prop].op](combo[prop], filters[prop].value)) {
          return false
        }
      }
    }
    return true
  }
  const filtered_data = combo_data.filter(filterCombo).sort((a, b) => (
    compare(a[sort_prop], b[sort_prop], reverse_sort)
  ))
  const char_options = chars.map(char => (
    <option value={char}>{char}</option>
  ))
  const combo_props = combos.props.map(prop => (
    <th className={`prop-header noselect ${sortStatus(prop)}`} onClick={setSorting}>
      {prop}
    </th>
  ))
  const combo_rows = filtered_data.map(combo => (
    <tr className='combo-row'>{
      combos.props.map(prop => (
        <td className={`prop-value ${prop} ${(combo[prop] >= 0)?'plus':''}`}>
          {combo[prop]}
        </td>
      ))
    }</tr>
  ))
  return (
    <div className='app'>
      <div className='title-bar'>
        <div className='title'><h1>🔎 Combo Finder</h1></div>
      </div>
      <div className='body'>
        <div className='filter-bar'>
          <select className='drop' name='character' id='eq' onChange={updateFilters}>
            <option value=''>Any Character</option>{char_options}
          </select>
          <button className='btn btn-main' type='button'>All Filters</button>
          <span className='info'>Showing all {filtered_data.length} combos</span>
        </div>
        <div className='combo-div'>
          <table className='combo-table'>
            <thead><tr>{combo_props}</tr></thead>
            <tbody>{combo_rows}</tbody>
          </table>
        </div>
        <div className='page-select'>
          <button className='btn btn-left' type='button'>🞀</button>
          <button className='btn btn-right shift' type='button'>🞂</button>
          <input className='page-input' type='number' min={1} max={10} defaultValue={1}/>
          <button className='btn btn-right shift' type='button'>Go</button>
        </div>
        <hr className='solid'/>
      </div>
    </div>
  )
}

export default App
