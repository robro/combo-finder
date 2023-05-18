import Popup from "reactjs-popup"

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
      <td className='filter-lable'>
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
              <Popup trigger={<button
                  className='btn-main alt-hover'>
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
                          {comboProps.slice(1).map(prop => (
                            <tr className='filter-row'>
                              {getComboFilter(prop)}
                            </tr>
                          ))}
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
