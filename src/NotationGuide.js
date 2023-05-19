import Popup from "reactjs-popup"

export default function NotationGuide({ children }) {
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
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>1 </b>...<b> 9</b></td>
                <td className='notation-cell'><b>Direction</b> of joystick input. Corresponds to the keys on a numpad.<br></br>
                  (6 = forward, 3 = down-back, etc.).</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>&gt;</b></td>
                <td className='notation-cell'><b>Cancel</b> the previous move to the following move.</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>~</b></td>
                <td className='notation-cell'><b>Chain/Target combo</b> the previous move into a followup.</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>,</b></td>
                <td className='notation-cell'><b>Link</b> the previous move to the following move (requires precise timing)</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>j.X</b></td>
                <td className='notation-cell'>Move performed while <b>jumping</b>.</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>P</b> or <b>K</b></td>
                <td className='notation-cell'>Any <b>punch</b> or <b>kick</b> (when button strength does not matter)</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>[X]</b></td>
                <td className='notation-cell'><b>Hold</b> the button input.</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>dl.X</b></td>
                <td className='notation-cell'>Briefly <b>delay</b> the action.</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>AA</b></td>
                <td className='notation-cell'><b>Anti-air</b>; hit the opponent while they're mid-air.</td>
              </tr>
              <tr className='notation-row'>
                <td className='notation-cell right-border'><b>Y xN<br></br>&#123;Y&#125; xN</b></td>
                <td className='notation-cell'><b>Repeat</b> 'Y' input 'N' number of times.<br></br>
                  A sequence of multiple inputs will be bundled into "&#123;&#125;".</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </Popup>
  )
}