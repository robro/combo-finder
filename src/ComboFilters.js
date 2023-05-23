import Popup from "reactjs-popup"

export default function ComboFilters({
  filterInfo,
  comboProps,
  filters,
  onFiltersSubmit,
  onControlTypeChange,
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
      <td className='filter-label capitalize'>
        <label>
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
          className='drop filter-drop'
          id={prop+'-condition'}
          name={prop+'-condition'}
          defaultValue={(filters[prop]) ? filters[prop]['condition'] : false}>
          {filterInfo[prop].compare.map(option =>
            <option value={option}>{option}</option>
          )}
        </select>
      </td>
      <td>
        <input
          className='filter-input'
          id={prop+'-value'}
          name={prop+'-value'}
          defaultValue={(filters[prop]) ? filters[prop]['value'] : ''}
          maxLength={maxInputLength}/>
      </td>
      </>
    )
  }

  function getValueFilter(prop) {
    return (
      <td colSpan={2}>
        <select
          className={'drop filter-drop'}
          id={prop+'-value'}
          name={prop+'-value'}
          defaultValue={(filters[prop]) ? filters[prop]['value'] : ''}>
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

  function getComboFilter(prop) {
    return (
      <>
        {getLabel(prop)}
        {(filterInfo[prop].compare.length > 1) ?
          getConditionFilter(prop) :
          getValueFilter(prop)}
      </>
    )
  }

  return (
    <>
    <table className='filter-bar'>
      <tbody>
        <tr className='filter-row'>
          <td className="fixed-size">
            <select
              className={'drop value pointer'}
              id={'character-value'}
              name={'character-value'}
              defaultValue={''}
              onChange={(e) => submitFilters([e.target.id.split('-')[0]])}>
              <option value=''>
                {filterInfo['character'].options[0]}
              </option>
              {filterInfo['character'].options.slice(1).map(option =>
                <option value={option}>
                  {option}
                </option>
              )}
            </select>
          </td>
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
          <td className="align-right">
            <label>
              Control Type:
            </label>
          </td>
          <td className="fixed-size">
            <select
              className="drop wide"
              onChange={(e) => onControlTypeChange(e.target.value)}>
              <option value='classic'>Classic</option>
              <option value='modern'>Modern</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    </>
  )
}
