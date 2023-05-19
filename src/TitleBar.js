import logo from './logo.png'

export default function TitleBar({
  titleText = 'Combo Finder'
}) {
  return (
    <div className='title-bar'>
      <div className='title'>
        <img
          src={logo}
          height={55}
          alt={titleText}
          title={titleText} />
      </div>
    </div>
  )
}