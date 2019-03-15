import Component from '@ember/component'
import { computed } from '@ember/object'
import { getOwner } from '@ember/application'
import { inject as service } from '@ember/service'

export default Component.extend({
  quantity: 1,
  quantities: null,
  notifier: service(),
  cart: computed(function() {
    return getOwner(this).lookup('service:cart');
  }),
  init() {
    this._super(...arguments)
    let stock = this.product.stock
    if (!stock || stock < 0) stock = 0
    else if (stock > 20) stock = 20
    this.set('quantities', Array.from(Array(stock)).map((v, i) => i + 1))
  },
  actions: {
    setQuantity(quantity) {
      this.quantity = quantity
    },
    addToCart() {
      this.get('notifier').empty()
      this.cart.add(this.product.id, this.quantity)
      if (this.quantity !== this.cart.items[this.product.id]) {
        this.get('notifier').success(`Cart updated with ${this.quantity} ${this.product.name}(s).`)
      } else {
        this.get('notifier').success(`${this.quantity} ${this.product.name} added to the cart.`)
      }
    },
  }
});
