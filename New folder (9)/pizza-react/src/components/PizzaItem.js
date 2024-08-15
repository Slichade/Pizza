import React from 'react'
import "./PizzaItem.css";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/CartSlice';


function PizzaItem({ pizza }) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  }
  return (
    <div className='pizzaItem'>
      <div className='pizzaItemOuterContainer' >
        <img style={{ width: 163, height: 100 }} src={pizza.image} />
        <div className='pizzaItemcontainer'>
          <h5 className='pizzaItemText'>{pizza.name}</h5>
          <h5 className='pizzaItemText'>₹{pizza.price}</h5>
          <h4 className='pizzaItemDescription'>{pizza.description.length > 30 ? pizza.description.substr(0, 30) + "..." : pizza.Description}</h4>


          {cart.some((c) => c.id === pizza.id) ? (

            <button
              onClick={() => removeItemFromCart(pizza)}
              className="pizzaItemButton">
              Remove from Cart
            </button>

          ) : (

            <button
              onClick={() => addItemToCart(pizza)}
              className="pizzaItemButton">
              Add To Cart
            </button>
          )}

        </div>
      </div >
    </div >
  );
}

export default PizzaItem;

