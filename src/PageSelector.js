import { useState } from "react"

export default function PageSelector({ 
  currentPage,
  totalPages, 
  onCurrentPageChange, 
  maxLength = 4
}) {
  const [pageInput, setPageInput] = useState(currentPage)

  function pageUp() {
    if (currentPage >= totalPages) return
    let new_page = currentPage + 1
    setPageInput(new_page)
    onCurrentPageChange(new_page)
  }

  function pageDown() {
    if (currentPage <= 1) return
    let new_page = currentPage - 1
    setPageInput(new_page)
    onCurrentPageChange(new_page)
  }

  function goToPage() {
    if (pageInput === '') {
      setPageInput(currentPage)
      return
    }
    let new_page = parseInt(pageInput)
    if (new_page < 1) new_page = 1
    if (new_page > totalPages) new_page = totalPages
    if (new_page === currentPage) {
      setPageInput(currentPage)
      return
    }
    setPageInput(new_page)
    onCurrentPageChange(new_page)
  }

  function capInput(e) {
    if (e.target.value.length > e.target.maxLength)
      e.target.value = e.target.value.slice(0, e.target.maxLength)
  }

  function handleKeyDown(e) {
    return e.key === 'Enter' && goToPage()
  }

  function getDownStatus() {
    return (currentPage === 1) ? 'disabled' : ''
  }

  function getUpStatus() {
    return (currentPage === totalPages) ? 'disabled' : ''
  }

  function getGoStatus() {
    return (totalPages === 1) ? 'disabled' : ''
  }

  return (
    <div className='page-select'>
      <button
        className={'btn-left'}
        onClick={pageDown}
        disabled={getDownStatus()}>
        ❮
      </button>
      <button
        className={'btn-right shift'}
        onClick={pageUp}
        disabled={getUpStatus()}>
        ❯
      </button>
      <input
        className='page-input'
        type='number'
        min={1}
        max={totalPages}
        maxLength={maxLength}
        value={pageInput}
        onInput={capInput}
        onChange={e => setPageInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={getGoStatus()} />
      <button
        className='btn-right'
        onClick={goToPage}
        disabled={getGoStatus()}>
        Go
      </button>
    </div>
  );
}