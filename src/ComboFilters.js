export default function ComboFilters({
  filterInfo,
  comboProps,
  onFiltersSubmit,
  maxInputLength = 100
}) {

  function submitFilters() {
    let new_filters = {}
    for (const prop of comboProps) {
      let condition = document.getElementById(prop+'-condition')
      condition = (condition) ? condition.value : 'Equal To'
      try {
        let value = document.getElementById(prop+'-value').value
        if (!value) continue
        new_filters[prop] = {'condition': condition, 'value': value}
      } 
      catch { continue }
    }
    onFiltersSubmit(new_filters)
  }

  function getLabel(text) {
    return (
      <td>
        <label className='capitalize'>
          {text}
        </label>
      </td>
    )
  }

  function getConditionFilter(prop) {
    return (
      <>
        <td>
          <select
            className='drop condition'
            id={prop+'-condition'}>
            {filterInfo[prop].compare.map(option => (
              <option value={option}>{option}</option>
            ))}
          </select>
        </td>
        <td>
          <input
            className='filter-input value'
            id={prop+'-value'}
            maxLength={maxInputLength}/>
        </td>
      </>
    )
  }

  function getValueFilter(prop, on_change=null) {
    return (
  <   td colSpan={2}>
        <select 
          className='drop value' 
          id={prop+'-value'} 
          onChange={on_change}>
          <option value=''>
            {filterInfo[prop].options[0]}
          </option>
          {filterInfo[prop].options.slice(1).map(option => (
            <option value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
    )
  }

  function getComboFilter(prop, label=true, on_change=null) {
    return (
      <>
        {label && getLabel(prop)}
        {(filterInfo[prop].compare.length > 1) ?
          getConditionFilter(prop) :
          getValueFilter(prop, on_change)}
      </>
    )
  }

  return (
    <>
      <table className='filter-bar'>
        <tbody>
          <tr className='filter-row'>
            {getComboFilter('character', false, submitFilters)}
            <td>
              <button
                className='btn btn-main' 
                type='button' 
                onClick={submitFilters}>
                All Filters
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <table className='filter-table'>
        <tbody>
          {comboProps.slice(1).map(prop => (
            <tr className='filter-row'>
              {getComboFilter(prop)}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
