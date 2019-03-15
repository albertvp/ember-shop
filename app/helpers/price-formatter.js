import { helper } from '@ember/component/helper'

export function priceFormatter(number) {
  const absolute = parseInt(number)
  if (absolute == number) {
    return '£' + absolute + '.00'
  } else {
    return '£' + absolute + '.' + parseInt((number - absolute) * 100)
  }
}

export default helper(priceFormatter);
