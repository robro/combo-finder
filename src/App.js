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
      <th className={`prop-header ${this.sort_status(prop)}`}
          data-sort={this.sort_status(prop)} onClick={(e) => this.sort_by(e.target.textContent)}>
        {prop}
      </th>
    ))
    const combo_data = this.state.combo_data.map(combo => (
      <tr> {
        combos.props.map(prop => (
          <td className={`prop-value ${prop} ${this.sort_status(prop)}`}
              data-status={(combo[prop] >= 0)?'plus':''}>
            {combo[prop]}
          </td>
        ))
      } </tr>
    ))
    return (
      <div className='app'>
        <table className='combo-table'>
          <tr>{combo_props}</tr>
          {combo_data}
        </table>
      </div> 
    )
  }
}

export default App
