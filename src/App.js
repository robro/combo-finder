import './App.css'
import compare from './compare'
import { Component } from 'react'

const combos = require('./combos.json')
const chars = new Set(combos.data.map(combo => combo['character']))
const total_combos = combos.data.length

class App extends Component {
  state = {
    'combo_data': combos.data,
    'sort_prop': 'character',
    'reverse_sort': false,
    'filters': {}
  }
  set_sort = (event) => {
    const sort_prop = event.target.textContent
    const reverse_sort = (sort_prop === this.state.sort_prop)? !this.state.reverse_sort: false
    this.setState({'sort_prop': sort_prop, 'reverse_sort': reverse_sort})
  }
  sort_status = (prop) => {
    if (prop !== this.state.sort_prop) return ''
    if (this.state.reverse_sort) return 'descend'
    return 'ascend'
  }
  update_filters = (event) => {
    const key = event.target.name
    const value = event.target.value
    const new_filters = {...this.state.filters, [key]: value}
    this.setState({'filters': new_filters})
  }
  filter_combo = (combo) => {
    for (let prop in this.state.filters) {
      if (this.state.filters[prop]) {
        if (combo[prop] !== this.state.filters[prop]) return false
      }
    }
    return true
  }
  render() {
    let page_num = 1
    let combo_data = this.state.combo_data.filter(this.filter_combo)
    combo_data.sort((a, b) => (
      compare(a[this.state.sort_prop], b[this.state.sort_prop], this.state.reverse_sort)
    ))
    const char_options = [...chars].map(char => (
      <option value={char}>{char}</option>
    ))
    const combo_props = combos.props.map(prop => (
      <th className={`prop-header noselect ${this.sort_status(prop)}`} onClick={this.set_sort}>
        {prop}
      </th>
    ))
    const combo_rows = combo_data.map(combo => (
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
            <select className='drop' name='character' onChange={this.update_filters}>
              <option value=''>Any Character</option>{char_options}
            </select>
            <button className='btn btn-main' type='button'>All Filters</button>
            <span className='info'>Showing all {total_combos} combos</span>
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
            <input className='page-input' type='number' min={1} max={10} defaultValue={page_num}/>
            <button className='btn btn-right shift' type='button'>Go</button>
          </div>
          <hr className='solid'/>
        </div>
      </div> 
    )
  }
}

export default App
