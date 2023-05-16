import './App.css'
import compare from './compare'
import evaluate from './evaluate'
import { useState } from 'react'

const combo_props = [...require('./props.json')]
const combo_data = [...require('./combos.json')]
const chars = [...new Set(combo_data.map(combo => combo['character']))].sort(compare)

function App() {
  const [sort_prop, setSortProp] = useState('character')
  const [reverse_sort, setReverseSort] = useState(false)
  const [filters, setFilters] = useState({
    // 'startup': {'op': 'is', 'value': 7}
  })
  const [page_size, setPageSize] = useState(20)
  const [cur_page, setCurPage] = useState(1)

  const pageUp = () => {
    if (cur_page >= total_pages) return
    let page_input = document.getElementById('page-input')
    page_input.value = cur_page+1
    setCurPage(cur_page+1)
  }
  const pageDown = () => {
    if (cur_page <= 1) return
    let page_input = document.getElementById('page-input')
    page_input.value = cur_page-1
    setCurPage(cur_page-1)
  }
  const goToPage = () => {
    let page_input = document.getElementById('page-input')
    if (page_input.value === '') {
      page_input.value = cur_page
      return
    }
    let page_input_num = Number(page_input.value)
    if (page_input_num === cur_page) return
    if (page_input_num < 1) page_input_num = 1
    if (page_input_num > total_pages) page_input_num = total_pages
    page_input.value = page_input_num
    setCurPage(page_input_num)
  }
  const getDownStatus = () => {
    if (cur_page === 1) return 'disabled'
    return ''
  }
  const getUpStatus = () => {
    if (cur_page === total_pages) return 'disabled'
    return ''
  }
  const getGoStatus = () => {
    if (total_pages === 1) return 'disabled'
    return ''
  }
  const setSorting = (e) => {
    const new_prop = e.target.textContent
    const new_sort = (new_prop === sort_prop)? !reverse_sort: false
    setSortProp(new_prop)
    setReverseSort(new_sort)
  }
  const sortStatus = (prop) => {
    if (prop !== sort_prop) return ''
    if (reverse_sort) return 'descend'
    return 'ascend'
  }
  const updateFilters = (e) => {
    const key = e.target.name
    const op = e.target.id
    const value = e.target.value
    const new_filters = {...filters, [key]: {'op': op, 'value': value}}
    if (!value) delete new_filters[key]
    setFilters(new_filters)
  }
  const resetFilters = () => {
    let dropdown = document.getElementById('is')
    dropdown.value = ''
    setFilters({})
  }
  const filterCombo = (combo) => {
    for (let prop in filters) {
      if (filters[prop].value) {
        if (!evaluate[filters[prop].op](combo[prop], filters[prop].value)) {
          return false
        }}}
    return true
  }
  const filtered_data = combo_data.filter(filterCombo).sort((a, b) => (
    compare(a[sort_prop], b[sort_prop], reverse_sort)
  ))
  const total_pages = Math.max(1, Math.ceil(filtered_data.length / page_size))
  if (cur_page > total_pages) {
    let page_input = document.getElementById('page-input')
    page_input.value = total_pages
    setCurPage(total_pages)
  }

  const getInfoString = () => {
    let filter_info = ''
    let combo_nums = ''
    const plural = (filtered_data.length === 1)? '': 's'
    if (page_size < filtered_data.length) {
      combo_nums = `${start_index+1} - ${end_index} of`
    }
    if (Object.keys(filters).length > 0) {
      filter_info = ` where ${Object.keys(filters).map(f =>
        `${f} ${filters[f].op} "${filters[f].value}"`).join(' and ')}`
    }
    return `Showing ${combo_nums} ${filtered_data.length} combo${plural}${filter_info}.`
  }
  const char_options = chars.map(char => (
    <option value={char}>{char}</option>
  ))
  const combo_headers = combo_props.map(prop => (
    <th className={`prop-header noselect ${sortStatus(prop)}`} onClick={setSorting}>
      {prop}
    </th>
  ))
  const start_index = (cur_page * page_size) - page_size
  const end_index = Math.min(start_index + page_size, filtered_data.length)
  const combo_rows = filtered_data.slice(start_index, end_index).map(combo => (
    <tr className='combo-row'>
      {combo_props.map(prop => (
        <td className={`prop-value ${prop} ${(combo[prop] >= 0)?'plus':''}`}>
          {combo[prop]}
        </td>
      ))}
    </tr>
  ))
  const reset_filters = (Object.keys(filters).length > 0)?
    <span className='reset' onClick={resetFilters}>Reset filters</span>: ''

  return (
    <div className='app'>
      <div className='title-bar'>
        <div className='title'><h1>🔎 Combo Finder</h1></div>
      </div>
      <div className='body'>
        <div className='filter-bar'>
          <select className='drop' name='character' id='is' onChange={updateFilters}>
            <option value=''>Any Character</option>
            {char_options}
          </select>
          <button className='btn btn-main' type='button'>All Filters</button>
        </div>
        <div className='info'>{getInfoString()}{reset_filters}</div>
        <div className='combo-div'>
          <table className='combo-table'>
            <thead><tr>{combo_headers}</tr></thead>
            <tbody>{combo_rows}</tbody>
          </table>
        </div>
        <div className='page-select'>
          <button className={'btn btn-left'} type='button' onClick={pageDown} disabled={getDownStatus()}>🞀</button>
          <button className={'btn btn-right shift'} type='button' onClick={pageUp} disabled={getUpStatus()} >🞂</button>
          <input className='page-input' id='page-input' type='number' required
            min='1' max={total_pages} defaultValue={cur_page} disabled={getGoStatus()}/>
          <button className='btn btn-right shift' type='button' onClick={goToPage} disabled={getGoStatus()}>Go</button>
        </div>
        <hr className='solid'/>
      </div>
    </div>
  )
}

export default App
