export default function ComboRows({
  comboData,
  comboProps
}) {
  function getComboRows() {
    return comboData.map(combo => (
      <tr className='combo-row'>
        {comboProps.map(prop => (
          <td className={`prop-value ${prop} ${combo[prop] >= 0 && 'plus'}`}>
            {combo[prop]}
          </td>
        ))}
      </tr>
    ))
  }

  return (
    <tbody>
      {getComboRows()}
    </tbody>
  )
}
