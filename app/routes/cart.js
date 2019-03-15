import Route from '@ember/routing/route'
import { computed } from '@ember/object'
import { getOwner } from '@ember/application'

export default Route.extend({
  cart: computed(function() {
    return getOwner(this).lookup('service:cart');
  }),

  beforeModel() {
    if (!this.cart.items || !Object.keys(this.cart.items).length) {
      this.replaceWith('shop')
    }
  },
  model() {
    const productIds = Object.keys(this.cart.items)
    return this.store.query('item', { ids: productIds, ...this.cart.items })
  },
  actions: {
    goToCheckout() {
      this.replaceWith('checkout')
    },
  },
})
