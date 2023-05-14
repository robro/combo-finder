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
  sort_by = (sort_prop) => {
    if (sort_prop === this.state.sort_prop) {
      this.setState({'reverse_sort': !this.state.reverse_sort})
      return
    }
    this.setState({'sort_prop': sort_prop, 'reverse_sort': false})
  }
  render() {
    this.state.combo_data.sort((a, b) => (
      compare(a[this.state.sort_prop], b[this.state.sort_prop], this.state.reverse_sort)
    ))
    const props_list = combos.props.map(prop => (
      <div className='prop-name' onClick={(e) => this.sort_by(e.target.textContent)}>
        {prop}
      </div>
    ))
    const combo_list = this.state.combo_data.map(combo => (
      combos.props.map(prop => (
        <div className='prop-value'>
          {combo[prop]}
        </div>
        )
      )
    ))
    return (
      <div className='app'>
        <div className='combo-data'>
          {props_list}
          {combo_list}
        </div>
      </div> 
    )
  }
}

export default App
