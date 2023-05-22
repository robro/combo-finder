import './App.css'
import TitleBar from './TitleBar'
import ComboFinder from './ComboFinder'
import Footer from './Footer'

const COMBO_DATA = [...require('./combos.json')]
const FILTER_INFO = require('./props.json')
const COMBO_PROPS = Object.keys(FILTER_INFO)
const MODERN_NOTATION = require('./ModernNotation.json')
const MODERN_FILTER = require('./ModernFilter.json')

export default function App() {
  return (
    <div className='app'>
      <TitleBar />
      <ComboFinder
        comboData={COMBO_DATA}
        comboProps={COMBO_PROPS}
        filterInfo={FILTER_INFO}
        modernNotation={MODERN_NOTATION}
        modernFilter={MODERN_FILTER}>
        <Footer />
      </ComboFinder>
    </div>
  )
}
