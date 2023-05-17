import './App.css'
import compare from './compare'
import evaluate from './evaluate'
import { useState } from 'react'

const combo_filters = require('./props.json')
const combo_props = Object.keys(combo_filters)
const combo_data = [...require('./combos.json')]

function App() {
  const [sort_prop, setSortProp] = useState('character')
  const [reverse_sort, setReverseSort] = useState(false)
  const [filters, setFilters] = useState({})
  const [page_size, setPageSize] = useState(10)
  const [cur_page, setCurPage] = useState(1)
  const [page_input, setPageInput] = useState(cur_page)

  function pageUp() {
    if (cur_page >= total_pages) return
    let new_page = cur_page + 1
    setCurPage(new_page)
    setPageInput(new_page)
  }
  function pageDown() {
    if (cur_page <= 1) return
    let new_page = cur_page - 1
    setCurPage(new_page)
    setPageInput(new_page)
  }
  function goToPage() {
    if (page_input === '') {
      setPageInput(cur_page)
      return
    }
    let new_page = parseInt(page_input)
    if (new_page < 1) new_page = 1
    if (new_page > total_pages) new_page = total_pages
    if (new_page === cur_page) {
      setPageInput(cur_page)
      return
    }
    setCurPage(new_page)
    setPageInput(new_page)
  }
  function getDownStatus() {
    return (cur_page === 1) ? 'disabled' : ''
  }
  function getUpStatus() {
    return (cur_page === total_pages) ? 'disabled' : ''
  }
  function getGoStatus() {
    return (total_pages === 1) ? 'disabled' : ''
  }
  function setSorting(e) {
    const new_prop = e.currentTarget.textContent
    const new_sort = (new_prop === sort_prop) ? !reverse_sort : false
    setSortProp(new_prop)
    setReverseSort(new_sort)
  }
  function sortStatus(prop) {
    if (prop !== sort_prop) return ''
    if (reverse_sort) return 'descend'
    return 'ascend'
  }
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
    setPageInput(total_pages)
  }
  const combo_headers = combo_props.map(prop => (
    <th className={`prop-header ${prop} ${sortStatus(prop)} noselect`} onClick={setSorting}>
      {prop}
      <span className='sorting'>
        <div className={`sorting up-arrow ${sortStatus(prop)}`}/>
        <div className={`sorting down-arrow ${sortStatus(prop)}`}/>
      </span>
    </th>
  ))
  const start_index = (cur_page * page_size) - page_size
  const end_index = Math.min(start_index + page_size, filtered_data.length)
  const combo_rows = filtered_data.slice(start_index, end_index).map(combo => (
    <tr className='combo-row'>
      {combo_props.map(prop => (
        <td className={`prop-value ${prop} ${(combo[prop] >= 0) ? 'plus' : ''}`}>
          {combo[prop]}
        </td>
      ))}
    </tr>
  ))
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
        <div className='info'>{getInfoString()}{reset_filters_btn}</div>
        <div className='combo-div'>
          <table className='combo-table'>
            <thead><tr>{combo_headers}</tr></thead>
            <tbody>{combo_rows}</tbody>
          </table>
        </div>
        <div className='page-select'>
          <button className={'btn btn-left'} type='button' onClick={pageDown}
            disabled={getDownStatus()}>❮</button>
          <button className={'btn btn-right shift'} type='button' onClick={pageUp}
            disabled={getUpStatus()} >❯</button>
          <input className='page-input' type='number' min='1' max={total_pages} maxLength={10}
            value={page_input} onChange={e => setPageInput(e.target.value)} disabled={getGoStatus()}
            onKeyDown={e => (e.key === 'Enter') ? goToPage() : null} />
          <button className='btn btn-right' type='button' onClick={goToPage}
            disabled={getGoStatus()}>Go</button>
        </div>
        <hr className='solid'/>
      </div>
    </div>
  )
}

export default App
