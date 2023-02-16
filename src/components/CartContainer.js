import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { openModal } from '../features/modal/modalSlice'
import CartItem from './CartItem'



const CartContainer = () => {
  const {cartItems,total,amount} = useSelector((state)=>(state.cart))
  const dispatch = useDispatch()
  if ( amount< 1){
    return (
        <section className="cart">
            <header>
                <h2>Your bag</h2>
                <h4 className="empty-cart">is currently empty</h4>
            </header>
        </section>
    )
  }
  return (
    <section className="cart">
        <header>
            <h2>Your bag</h2>
        </header>
        <div>
            {cartItems.map((element)=>{
              return <CartItem key={element.id} {...element}/>
            }) }
        </div>
        <footer>
            <hr />
            <div className='cart-total'>
            <h4>total <span>$ { total.toFixed(2)}</span></h4>
            </div>
            <button className="btn clear-btn" onClick={()=>dispatch(openModal())}
            >clear cart</button>
        </footer>
    </section>
  )
}

export default CartContainer
