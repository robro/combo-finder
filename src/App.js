import './App.css'
import compare from './compare'
import { Component } from 'react'

const combos = require('./combos.json')

class App extends Component {
  state = {
    'combo_data': combos.data,
    'sort_prop': 'character',
    'reverse_sort': false
  }
  sort_by(sort_prop) {
    let reverse_sort = (sort_prop === this.state.sort_prop)? !this.state.reverse_sort: false
    this.setState({'sort_prop': sort_prop, 'reverse_sort': reverse_sort})
  }
  sort_status(prop) {
    if (prop !== this.state.sort_prop) return ''
    if (this.state.reverse_sort) return 'descend'
    return 'ascend'
  }
  render() {
    this.state.combo_data.sort((a, b) => (
      compare(a[this.state.sort_prop], b[this.state.sort_prop], this.state.reverse_sort)
    ))
    const combo_props = combos.props.map(prop => (
      <th className={`prop-header noselect ${this.sort_status(prop)}`}
          data-sort={this.sort_status(prop)} onClick={(e) => this.sort_by(e.target.textContent)}>
        {prop}
      </th>
    ))
    const combo_data = this.state.combo_data.map(combo => (
      <tr className='combo-row'>{
        combos.props.map(prop => (
          <td className={`prop-value ${prop}`}
              data-status={(combo[prop] >= 0)?'plus':''}>
            {combo[prop]}
          </td>
        ))
      }</tr>
    ))
    return (
      <div className='app'>
        <h1>Combo Finder 🔎</h1>
        <button className='btn btn-main'>Filters</button>
        <table className='combo-table'>
          <thead><tr>{combo_props}</tr></thead>
          <tbody>{combo_data}</tbody>
        </table>
        <div className='page-select'>
          <button className='btn btn-left' type='button'>&lt;</button>
          <button className='btn btn-right shift'>&gt;</button>
          <input class='page-input' type='number' min={1} max={10}/>
          <button className='btn btn-right'>Go</button>
        </div>
        <hr className='solid'/>
        <div className='footer'>
          Displaying 20 of 4,579 total combos
        </div>
      </div> 
    )
  }
}

export default App
