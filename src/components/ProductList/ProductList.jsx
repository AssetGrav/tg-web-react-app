import React, { useCallback, useEffect, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem'
import './ProductList.css'
import { useTelegram } from '../../hook/useTelegram';
import sunkiller from '../../photos/WhatsApp_Image_2022-.jpeg'
import anessa from '../../photos/an_50_spf_1-491x800.jpg'
import aqua from '../../photos/aquaskin.jpg'

const products = [
  {id: '1', title: 'Isehan Sunkiller Perfect Water Essence SPF50', price: 5000, description: 'Солнцезащитный крем', img: sunkiller},
  {id: '2', title: 'Shiseido Anessa Perfect UV Skincare Milk SPF 50', price: 12000, description: 'Подходит для детей, кроме новорожденных, и для взрослых.', img: anessa},
  {id: '3', title: 'SKIN AQUA', price: 5000, description: 'Rohto Skin Aqua Tone Up UV Essence — санскрин для лица и тела с приятной текстурой ', img: aqua},
  {id: '4', title: 'Название товара', price: 7000, description: 'Описание'},
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0)
}

function ProductList() {
  const [addedItems, setAddedItems] = useState([])
  const {tg, queryId} = useTelegram()

  const onSendData = useCallback(() => {
      const data = {
          products: addedItems,
          totalPrice: getTotalPrice(addedItems),
          queryId,
      }
      console.log("data", data)
      fetch('https://mysterious-hamlet-97862.herokuapp.com/web-data', {
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
