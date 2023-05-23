import Popup from "reactjs-popup"
import Showdown from "showdown"

export default function NotationGuide({ children }) {
  const converter = new Showdown.Converter({'simpleLineBreaks': true})
  const guideText = [...require('./NotationGuideText.json')]

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
          <hr className='popup-bar'/>
          <table className='notation-table'>
            <thead>
              <tr>
                <th className="notation-header">Notation</th>
                <th className="notation-header">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {guideText.map(row => getRow(row))}
            </tbody>
          </table>
        </div>
      )}
    </Popup>
  )
}