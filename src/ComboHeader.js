export default function ComboHeader({
  comboProps,
  sortProp,
  sortReversed,
  onSortPropChange,
  onSortReversedChange
}) {
  function sortStatus(prop) {
    if (prop !== sortProp) return ''
    if (sortReversed) return 'descend'
    return 'ascend'
  }

  function setSorting(new_sort) {
    onSortPropChange(new_sort)
    onSortReversedChange(new_sort === sortProp && !sortReversed)
  }

  function getComboHeader() {
    return comboProps.map(prop => (
      <th
        className={`prop-header ${prop} ${sortStatus(prop)} noselect`}
        onClick={e => setSorting(e.currentTarget.textContent)}>
        {prop}
        <span className='sorting'>
          <div className={`sorting up-arrow ${sortStatus(prop)}`}/>
          <div className={`sorting down-arrow ${sortStatus(prop)}`}/>
        </span>
      </th>
    ))
  }

  return (
    <thead>
      <tr>
        {getComboHeader()}
      </tr>
    </thead>
  )
}
