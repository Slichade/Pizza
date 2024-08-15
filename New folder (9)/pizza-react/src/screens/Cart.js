import React from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/Header'
import { incementQuantity, decrementQuantity } from '../redux/CartSlice';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Place } from '../Place';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Cart() {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const increaseQuantity = (item) => {
        dispatch(incementQuantity(item))
    }
    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item))
    }
    const total= cart.map((item)=>item.price*item.quantity).reduce((curr,prev)=>curr+prev,0);
    function plk(){
     navigate('/Place');

    }

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/Home');
 
        }
    }, [cart, navigate]);


    /*
    new code*/
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [userAddress, setUserAddress] = useState();
    const [GPSLatitude, setGPSLatitude] = useState();
    const [GPSLongitude, setGPSLongitude] = useState();
    const [om, setom] = useState(false);
    const geo = navigator.geolocation;
  
    // Get User Current Location
    geo.getCurrentPosition(userCoords);
  
    function userCoords(position) {
      let userLatitude = position.coords.latitude;
      let userLongitude = position.coords.longitude;
  
      setLatitude(userLatitude);
      setLongitude(userLongitude);
    }
  
    const getUserAddress = async () => {
      let url = `https://api.opencagedata.com/geocode/v1/json?key=8b1054f0c4a845859d23fc9619ab30ac&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`;
  
      const loc = await fetch(url);
      const data = await loc.json();
  
      setUserAddress(data.results[0].formatted);
    }
  
    const handleGetUserAddress = () => {
      getUserAddress();
      setom(true);
    }
  
    // Get User GPS Current Location
    geo.watchPosition(userGPSCoords);
  
    function userGPSCoords(position) {
      let userGPSLatitude = position.coords.latitude;
      let userGPSLongitude = position.coords.longitude;
  
      console.log("Latitude: ", userGPSLatitude);
      console.log("Longitude: ", userGPSLongitude);
  
      setLatitude(userGPSLatitude);
      setLongitude(userGPSLongitude);
    }
  
    function addr(){
        handleGetUserAddress();
       
    }
 
 
    return (
        <>
            <Header />
            <div className='cart'>
                {/* Left part  */}
                <div className='cartLeft'>
 
                    {cart.map((item, index) => (
                        <div key={index} style={{ marginBottom: 20, display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div className='cartImage'>
                                <img src={item.image} style={{ height: 60, width: 60, borderRadius: 5 }} />
                            </div>
                            <div className='cartDescription'>
                                <h3 className='carttext'>{item.name}</h3>
                                <h4 className='carttextDescription'>{item.description.length > 30 ? item.description.substr(0, 80) + "..." : item.description}</h4>
                                <h4 className='carttype'>Regular| 100% thin white crust </h4>
                            </div>
                            <div style={{ marginLeft: "auto" }} className='cartTotal'>
                                <h4>{item.price * item.quantity}</h4>
 
                                <div className='cartButtons'>
                                    <div onClick={() => decreaseQuantity(item)} className='cartButton'>
                                        -
                                    </div>
                                    <div className='cartButton'>
                                        {item.quantity}
                                    </div>
                                    <div onClick={() => increaseQuantity(item)} className='cartButton'>
                                        +
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
 
 
 
                </div>
                {/* right part */}
                <div className='cartRight'>
                {om? <><h3 className='cartRightText'>Dilivery Address</h3><h4>{userAddress}</h4></>:<>
                
                    <h3 className='cartRightText'>Choose Dilivery Address</h3>
                    <div className='cartTop' onClick={addr}>
                        <AddLocationIcon style={{color:"gray",fontSize:17}} />
                        <div className='cartRightDesc'>
                            <h4>Select Location</h4>
                            <h4>Please select the location, so that we can find a restaurant that delivers to you!</h4>
                           
                                <button  style={{color:"green",borderWidth:0.7,borderColor:"green",cursor:"pointer",marginTop:7,borderRadius:4,padding:4}}>Add Location</button>


                        </div>
                    </div>
                    </>
                    }
                        
                    <h3 className='cartRightText'>Price Details</h3>
                    <div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:5}}>
                            <h4 style={{fontSize:15,fontWeight:"500"}}>SubTotal</h4>
                            <h4 style={{fontSize:15,fontWeight:"500"}}>{total}</h4>
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:5}}>
                            <h4 style={{fontSize:15,fontWeight:"500"}}>Discount</h4>
                            <h4 style={{fontSize:15,fontWeight:"500"}}>-</h4>
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:5}}>
                            <h4 style={{fontSize:15,fontWeight:"500"}}>Taxes and Charges</h4>
                            <h4 style={{fontSize:15,fontWeight:"500"}}>65</h4>
                        </div>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:5}}>
                            <h4 style={{fontSize:15,fontWeight:"bold"}}>Grand Total</h4>
                            <h4 style={{fontSize:15,fontWeight:"600"}}>{total+65}</h4>
                        </div>
 
                    </div>
                    {/* <button onClick={() =>{plk}} className='cartButtonRight'>Place Order</button> */}
                    <button onClick={plk}
                    className='cartButtonRight'>
        Place Order
      </button>
                </div>
                    
            </div>
        </>
 
    )
}
 
export default Cart