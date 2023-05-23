import Popup from "reactjs-popup"
import Showdown from "showdown"

export default function NotationGuide({ children }) {
  const converter = new Showdown.Converter({'simpleLineBreaks': true})
  const guideData = require('./NotationGuideData.json')

  function getGuideRows(title) {
    return (
      <>
      <thead>
        <th className="notation-title center capitalize" colSpan={2}>
          <h2>{title}</h2>
        </th>
      </thead>
      <tbody>
        {guideData[title].map(row => getRow(row))}
      </tbody>
      </>
    )
  }

  function getRow(row) {
    return (
      <tr className='notation-row'>
        <td
          className='notation-cell right-border'
          dangerouslySetInnerHTML={{__html: converter.makeHtml(row.notation)}} />
        <td
          className='notation-cell'
          dangerouslySetInnerHTML={{__html: converter.makeHtml(row.meaning)}} />
      </tr>
    )
  }

  return (
    <Popup trigger={
      <a className='pointer'>{children}</a>}
      modal
      nested>
      {close => (
        <div className='popup'>
          <div className='popup-title-bar'>
            <span className='popup-title'>
              Notation Guide
            </span>
            <button
              className='btn-close popup-title float-right'
              onClick={() => close()}>
              ✕
            </button>
          </div>
          <hr className='popup-bar margin-bottom'/>
          <table className='notation-table'>
            {Object.keys(guideData).map(key => getGuideRows(key))}
          </table>
        </div>
      )}
    </Popup>
  )
}