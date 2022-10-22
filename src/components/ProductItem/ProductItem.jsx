import React from 'react'
import Button from '../button/Button'
import './ProductItem.css'

function ProductItem({product, className, onAdd}) {

    const onAddHandler = () => {
        onAdd(product)
    }
  return (
    <div className={'product ' + className}>
        <img className={'img'} src={product.img} alt={product.title}></img>
        <div className={'title'}>{product.title}</div>
        <div className={'description'}>{product.description}</div>
        <div className={'price'}>
            <span>Price: <b>{product.price}</b></span>
        </div>
        <Button className={'add-btn'} onClick={onAddHandler}>
            Add to basket
        </Button>
    </div> 
  )
}

export default ProductItem