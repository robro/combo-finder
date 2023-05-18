export default function TitleBar({ 
  titleText = 'Combo Finder'
}) {
  return (
    <div className='title-bar'>
      <div className='title'>
        <h1>
          🔎 {titleText}
        </h1>
      </div>
    </div>
  )
}