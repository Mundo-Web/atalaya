const SetSelectValue = (select, id, text) => {
  $(select).empty()
  if (!id) return
  const option = document.createElement('option')
  option.value = id
  option.text = text ?? id
  $(select).append(option)
  $(select).val(id)
  $(select).trigger('change')
}

export default SetSelectValue