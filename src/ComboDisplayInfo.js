export default function ComboDisplayInfo({
  totalCombos,
  pageSize,
  startIndex,
  endIndex,
  filters,
  onFiltersReset
}) {
  const filtered_props = Object.keys(filters).filter(f => filters[f].value)

  const resetFilters = filtered_props.length > 0 &&
    <span className='reset' onClick={onFiltersReset}>
      Reset filters
    </span>

  function getInfoString() {
    let combo_nums = ''
    let filter_info = ''
    let plural = (totalCombos !== 1) ? 's' : ''

    if (pageSize < totalCombos) {
      combo_nums = `${startIndex + 1} - ${endIndex} of`
    }
    filter_info = (filtered_props.length > 0) ? ` where ${filtered_props.map(f =>
      `${f} ${(filters[f].condition !== 'Equal To') ? filters[f].condition.toLowerCase() : 'is'}
      "${filters[f].value}"`).join(' and ')}` : ''

    return `Showing ${combo_nums} ${totalCombos} combo${plural}${filter_info}.`
  }

  return (
    <div className='info'>
      {getInfoString()}{resetFilters}
    </div>
  )
}