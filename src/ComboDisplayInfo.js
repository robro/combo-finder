export default function ComboDisplayInfo({
  totalCombos,
  pageSize,
  startIndex,
  endIndex,
  filters,
  onFiltersReset
}) {
  const filtered_props = Object.keys(filters).filter(prop => filters[prop].value)

  const resetFilters = filtered_props.length > 0 &&
    <span className='reset' onClick={() => onFiltersReset({})}>
      Reset filters
    </span>

  function getInfoString() {
    const plural = (totalCombos !== 1) ? 's' : ''
    const combo_nums = (pageSize < totalCombos) ? `${startIndex + 1} - ${endIndex} of` : ''
    const filter_info = (filtered_props.length > 0) ? ` where ${filtered_props.map(prop =>
      `${prop} ${(filters[prop].condition !== 'Equal To') ? filters[prop].condition.toLowerCase() : 'is'}
      "${filters[prop].value}"`).join(' and ')}` : ''

    return `Showing ${combo_nums} ${totalCombos} combo${plural}${filter_info}.`
  }

  return (
    <div className='info'>
      {getInfoString()}{resetFilters}
    </div>
  )
}