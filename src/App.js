import './App.css'
import ComboFinder from './ComboFinder'

const COMBO_DATA = [...require('./combos.json')]
const FILTER_INFO = require('./props.json')
const COMBO_PROPS = Object.keys(FILTER_INFO)

export default function App() {
  console.log('App()')
  return (
    <div className='app'>
      <div className='title-bar'>
        <div className='title'><h1>🔎 Combo Finder</h1></div>
      </div>
      <ComboFinder
        comboData={COMBO_DATA} 
        comboProps={COMBO_PROPS}
        filterInfo={FILTER_INFO} />
    </div>
  )
}
