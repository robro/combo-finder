import NotationGuide from "./NotationGuide"

export default function Footer() {
  return (
    <div className='footer'>
      <table className='full-width'>
        <tr>
          <td className='align-top'>
            Need help? Check the <NotationGuide>combo notation guide.</NotationGuide>
          </td>
          <td className='align-right'>
            Have a suggestion? <a
              href='https://twitter.com/robrotic'
              target="_blank"
              rel="noopener noreferrer">
              Contact me on Twitter.
            </a>
            <br></br>
            Or check out the <a
              href='https://github.com/robro/combo-finder'
              target="_blank"
              rel="noopener noreferrer">
              repository.
            </a>
          </td>
        </tr>
      </table>
    </div>
  )
}
