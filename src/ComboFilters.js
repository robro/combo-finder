import Popup from "reactjs-popup"

export default function ComboFilters({
  filterInfo,
  comboProps,
  filters,
  onFiltersSubmit,
  maxInputLength = 100
}) {

  const dropdown = document.getElementById('character-value')
  if (dropdown) {
    try {
      dropdown.value = filters.character.value
    } catch {
      dropdown.value = ''
    }
  }

  function submitFilters(props=comboProps) {
    let new_filters = {...filters}
    for (const prop of props) {
      const condition_elem = document.getElementById(prop+'-condition')
      const value_elem = [...document.getElementsByName(prop+'-value')].at(-1)
      const condition = (condition_elem) ? condition_elem.value : 'Equal To'
      const value = (value_elem) ? value_elem.value : ''
      new_filters[prop] = {'condition': condition, 'value': value}
    }
    onFiltersSubmit(new_filters)
  }

  function getLabel(text) {
    return (
      <td className='filter-lable'>
        <label className='capitalize'>
          {text}
        </label>
      </td>
    )
  }

  function getConditionFilter(prop, on_change=null) {
    const current_filter = filters[prop]
    const condition = (current_filter) ? current_filter['condition'] : false
    const value = (current_filter) ? current_filter['value'] : ''
    return (
      <>
        <td>
          <select
            className='drop condition'
            id={prop+'-condition'}
            name={prop+'-condition'}
            defaultValue={condition}
            onChange={on_change}>
            {filterInfo[prop].compare.map(option =>
              <option value={option}>{option}</option>
            )}
          </select>
        </td>
        <td>
          <input
            className='filter-input value'
            id={prop+'-value'}
            name={prop+'-value'}
            defaultValue={value}
            onChange={on_change}
            maxLength={maxInputLength}/>
        </td>
      </>
    )
  }

  function getValueFilter(prop, on_change=null, pointer=false) {
    const current_filter = filters[prop]
    const value = (current_filter) ? current_filter['value'] : ''
    const ptr_str = (pointer) ? 'pointer' : ''
    return (
      <td colSpan={2}>
        <select
          className={'drop value '+ptr_str}
          id={prop+'-value'}
          name={prop+'-value'}
          defaultValue={value}
          onChange={on_change}>
          <option value=''>
            {filterInfo[prop].options[0]}
          </option>
          {filterInfo[prop].options.slice(1).map(option => 
            <option value={option}>
              {option}
            </option>
          )}
        </select>
      </td>
    )
  }

  function getComboFilter(prop, label=true, on_change=null, pointer=false) {
    return (
      <>
        {label && getLabel(prop)}
        {(filterInfo[prop].compare.length > 1) ?
          getConditionFilter(prop, on_change) :
          getValueFilter(prop, on_change, pointer)}
      </>
    )
  }

  return (
    <>
      <table className='filter-bar'>
        <tbody>
          <tr className='filter-row'>
            {getComboFilter('character', false, (e) => 
              submitFilters([e.target.id.split('-')[0]]), true)}
            <td>
              <Popup trigger={
                <button className='btn-main alt-hover'>
                  All Filters
                </button>}
                modal
                nested>
                {
                  close => (
                    <div className='popup'>
                      <div className='popup-title-bar'>
                        <span className='popup-title'>
                            Advanced Search
                        </span>
                        <button
                          className='btn-close popup-title float-right'
                          onClick={() => close()}>
                          ✕
                        </button>
                      </div>
                      <hr className='popup-bar'/>
                      <table className='filter-table'>
                        <tbody>
                          {comboProps.map(prop => 
                            <tr className='filter-row'>
                              {getComboFilter(prop)}
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <hr className='popup-bar'/>
                      <div className='search-bar'>
                        <button
                          className='btn-main alt-hover float-right'
                          onClick={() => {
                            submitFilters()
                            close()}}>
                          Search
                        </button>
                        <button
                          className='btn-main cancel float-right'
                          onClick={() => close()}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )
                }
              </Popup>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
