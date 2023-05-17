import PageSelector from './PageSelector'
import ComboRows from './ComboRows'
import ComboHeader from './ComboHeader'
import ComboDisplayInfo from './ComboDisplayInfo'
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

  if (currentPage > totalPages) setCurrentPage(totalPages)

  return (
    <div className='combo-display'>
      <ComboDisplayInfo 
        comboData={comboData}
        pageSize={pageSize}
        startIndex={startIndex}
        endIndex={endIndex}
        filters={filters}
        onFiltersChange={onFiltersChange} />
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