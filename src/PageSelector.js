export default function PageSelector({
  currentPage,
  totalPages,
  onCurrentPageChange,
  maxLength = 4
}) {

  function pageUp() {
    if (currentPage >= totalPages) return
    onCurrentPageChange(currentPage + 1)
  }

  function pageDown() {
    if (currentPage <= 1) return
    onCurrentPageChange(currentPage - 1)
  }

  function goToPage() {
    let page_input = document.getElementById('page-input').value
    if (!page_input) return
    let new_page = parseInt(page_input)
    if (new_page < 1) new_page = 1
    if (new_page > totalPages) new_page = totalPages
    onCurrentPageChange(new_page)
  }

  function capInput(e) {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength)
  }

  function handleKeyDown(e) {
    return e.key === 'Enter' && goToPage()
  }

  function disableDown() {
    return currentPage === 1 && 'disabled'
  }

  function disableUp() {
    return currentPage === totalPages && 'disabled'
  }

  function disableInput() {
    return totalPages === 1 && 'disabled'
  }

  try {
    document.getElementById('page-input').value = currentPage
  } 
  catch {}

  return (
    <div className='page-select'>
      <button
        className={'btn-left page-btn'}
        onClick={pageDown}
        disabled={disableDown()}>
        ❮
      </button>
      <button
        className={'btn-right shift page-btn'}
        onClick={pageUp}
        disabled={disableUp()}>
        ❯
      </button>
      <input
        className='page-input'
        id='page-input'
        type='number'
        min={1}
        max={totalPages}
        maxLength={maxLength}
        defaultValue={currentPage}
        onInput={capInput}
        onKeyDown={handleKeyDown}
        disabled={disableInput()} />
      <button
        className='btn-right page-btn'
        onClick={goToPage}
        disabled={disableInput()}>
        Go
      </button>
    </div>
  )
}