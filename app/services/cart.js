import Service, { inject as service } from '@ember/service'

export default Service.extend({
  items: null,
  store: service(),

  init() {
    this._super(...arguments);
    this.set('items', {})
  },

  add(id, quantity) {
    if (this.items[id]) {
      this.items[id] = this.items[id] + quantity
    } else {
      this.items[id] = quantity
    }
  },

  remove(id) {
    delete this.items[id]
  },

  empty() {
    delete this.items
    this.items = {}
  }
});
