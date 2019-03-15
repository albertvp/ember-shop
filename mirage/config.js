export default function() {
  this.timing = 400
  this.namespace = '/api'
  this.promotions = [{
    productId: 'GR1',
    name: 'Buy One Get One Free',
    minimum: 1,
    add: 1,
  }, {
    productId: 'SR1',
    name: 'Bulk purchase item discount',
    minimum: 3,
    price: 4.5,
  }, {
    productId: 'CF1',
    name: 'Pack promotion 2/3 of total price',
    minimum: 3,
    percent: 2/3,
  }]
  this.products = [{
    id: 'GR1',
    type: 'product',
    attributes: {
      id: 'GR1',
      name: 'Green Tea',
      image: 'http://pngimg.com/uploads/cup/cup_PNG1978.png',
      price: 3.11,
      stock: 5,
    }
  }, {
    id: 'SR1',
    type: 'product',
    attributes: {
      id: 'SR1',
      name: 'Strawberries',
      image: 'https://dtgxwmigmg3gc.cloudfront.net/files/4ef27994c566d71238000d05-icon-256x256.png',
      price: 5.00,
      stock: 10,
    },
  }, {
    id: 'CF1',
    type: 'product',
    attributes: {
      id: 'CF1',
      name: 'Coffee',
      image: 'https://www.freeiconspng.com/uploads/coffee-icon-png-1.png',
      price: 11.233,
      stock: 22,
    },
  }]
  this.getPromotions = (product, quantity) => {
    let promoQuantity = quantity
    let promoPrice = product.attributes.price
    let totalAmount = promoPrice * quantity
    let totalDiscount = promoPrice * quantity
    let promotion = this.promotions.find(p => p.productId === product.id)
    console.log(promotion.minimum, quantity)
    if (promotion && quantity >= promotion.minimum) {
      if (promotion.add) {
        promoQuantity += promotion.add
      } else if (promotion.price) {
        promoPrice = promotion.price
        totalDiscount = promoPrice * quantity
      } else if (promotion.percent) {
        totalDiscount = totalAmount * promotion.percent
      }
    } else {
      return { totalAmount, totalDiscount, quantity, discounted: promoPrice }
    }
    return { totalAmount, totalDiscount, name: promotion.name, quantity: promoQuantity, discounted: promoPrice }
  }

  this.get('/products', (db, request) => {
    let filtered
    if (request.queryParams.name) {
      filtered = this.products.filter((product) => {
        return product.attributes.name.toLowerCase().indexOf(request.queryParams.name.toLowerCase()) !== -1
      })
      return { data: filtered }
    } else {
      return { data: this.products }
    }
  })

  this.get('/products/:id', (db, request) => {
    if (!request.params.id) return null
    return { data: this.products.find(p => p.id == request.params.id) }
  })

  this.get('/items', (db, request) => {
    const ids = Object.keys(request.queryParams)
    if (ids.length) {
      let filtered = this.products.filter((product) => {
        return ids.indexOf(product.id) !== -1
      }).map(product => {
        const promotion = this.getPromotions(product, +request.queryParams[product.id])
        console.log(product.attributes.price, promotion)
        return {
          id: product.id,
          type: 'item',
          attributes: {
            ...product.attributes,
            promotion: promotion.name,
            quantity: promotion.quantity,
            discounted: promotion.discounted,
            amount: promotion.totalAmount,
            total: promotion.totalDiscount,
          },
        }
      })
      return { data: filtered }
    }
    return { data: [] }
  })
}
