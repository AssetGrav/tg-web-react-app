import React from 'react'
import Button from '../button/Button'
import './ProductItem.css'

function ProductItem({product, className, onAdd}) {

    const onAddHandler = () => {
        onAdd(product)
    }
  return (
    <div className={'product ' + className}>
        <div className={'block'}>
            <img className={'img'} src={product.img} alt={product.title}></img>
            <div className={'title'}>
                {
                    product.title.lenght < 50
                        ? product.title
                        : product.title.substring(0, 50)
                }
            </div>
            <div className={'description'}>
                {
                    product.description.lenght < 50
                        ? product.description
                        : product.description.substring(0, 50)
                }
            </div>
            
            
        </div>
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