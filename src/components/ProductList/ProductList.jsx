import React, { useCallback, useEffect, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'
import { useTelegram } from '../../hook/useTelegram';
import sunkiller from '../../photos/WhatsApp_Image_2022-.jpeg'

const products = [
  {id: '1', title: 'Sunkiller SPF50', price: 5000, description: 'Лудший крем от солнца', img: sunkiller},
  {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
  {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синнего цвета, косые'},
  {id: '4', title: 'Куртка 8', price: 7000, description: 'Фиолетовая цвета, прямые'},
  {id: '5', title: 'Джинсы 3', price: 5000, description: 'Зеленого цвета, прямые'},
  {id: '6', title: 'Куртка 7', price: 6000, description: 'Зеленого цвета, теплая'},
  {id: '7', title: 'Джинсы 6', price: 5500, description: 'Синего цвета, прямые'},
  {id: '8', title: 'Куртка 5', price: 12000, description: 'Красного цвета, теплая'},
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

function ProductList() {
  const [addedItems, setAddedItems] = useState([])
  const {tg, queryId} = useTelegram()
  console.log("query", queryId)
  const onSendData = useCallback(() => {
      const data = {
          products: addedItems,
          totalPrice: getTotalPrice(addedItems),
          queryId,
      }
      fetch('https://blooming-ridge-94832.herokuapp.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedItems])

  useEffect(() => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
          tg.offEvent('mainButtonClicked', onSendData)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = []

    if(alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if(newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`
      })
    }
  }

  return (
    <div className={'list'}>
        {products.map(item => (
          <ProductItem
            key={item.id}
            product={item}
            onAdd={onAdd}
            className={'item'}
          />
        ))}
    </div>
  )
}

export default ProductList
