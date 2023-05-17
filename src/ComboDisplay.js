import PageSelector from './PageSelector'
import ComboRows from './ComboRows'
import ComboHeader from './ComboHeader'
import compare from './compare'
import { useState } from "react"

export default function ComboDisplay({
  comboData,
  comboProps,
  filters,
  onFiltersChange,
  pageSize = 10,
  defaultSort = 'character',
  defaultReversed = false
}) {
  const [sortProp, setSortProp] = useState(defaultSort)
  const [sortReversed, setSortReversed] = useState(defaultReversed)
  const [currentPage, setCurrentPage] = useState(1)

  const sortedData = [...comboData].sort((a, b) => (compare(a[sortProp], b[sortProp], sortReversed)))
  const totalPages = Math.max(1, Math.ceil(comboData.length / pageSize))
  const startIndex = (currentPage * pageSize) - pageSize
  const endIndex = Math.min(startIndex + pageSize, comboData.length)
  const resetFilters = (Object.keys(filters).length > 0) &&
    <span className='reset' onClick={() => onFiltersChange({})}>Reset filters</span>

  if (currentPage > totalPages) setCurrentPage(totalPages)

  function getInfoString() {
    const combo_nums = (pageSize < comboData.length) ? `${startIndex + 1} - ${endIndex} of` : ''
    const filter_info = Object.keys(filters).length > 0 ? ` where ${Object.keys(filters).map(f =>
      `${f} ${(filters[f].condition === 'Equal To') ? 'is' : filters[f].condition.toLowerCase()}
      "${filters[f].value}"`).join(' and ')}` : ''
    const plural = comboData.length !== 1 && 's'
    return `Showing ${combo_nums} ${comboData.length} combo${plural}${filter_info}.`
  }

  return (
    <div className='combo-display'>
      <div className='info'>{getInfoString()}{resetFilters}</div>
      <div className='min-height'>
        <table className='combo-table'>
          <ComboHeader
            comboProps={comboProps}
            sortProp={sortProp}
            sortReversed={sortReversed}
            onSortPropChange={setSortProp}
            onSortReversedChange={setSortReversed} />
          <ComboRows 
            comboData={sortedData.slice(startIndex, endIndex)}
            comboProps={comboProps} />
        </table>
      </div>
      <PageSelector
        currentPage={currentPage}
        totalPages={totalPages}
        onCurrentPageChange={setCurrentPage} />
      <hr className='solid'/>
    </div>
  )
}