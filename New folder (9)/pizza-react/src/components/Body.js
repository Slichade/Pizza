
import React from 'react';
import "./Body.css";
import pizza from '../data/pizza';
import PizzaItem from './PizzaItem';
import { useSelector } from 'react-redux';

function Body() {
    const data = pizza;
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart)
    return (
        <div className='body'>
            {pizza.map((item, index) => (
                <PizzaItem key={index} pizza={item} />
            ))}
        </div>
    );
}

export default Body;



