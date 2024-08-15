
import React from "react";
import "./Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate(); 

  function changeme(){
    navigate('/');
  }

  return (
    <div className="header">
      <div className="headerLeft">
        <img
          className="image"
          src="https://pizzaonline.dominos.co.in/static/assets/logo_white.svg"
          alt="logo"
        />
      </div>

      <div onClick={() => navigate("/cart")} style={{ position: "relative", cursor: "pointer" , marginLeft:800}}>
        <ShoppingCartIcon style={{ color: "white" }} />
        <span
          style={{
            backgroundColor: "white",
            width: 14,
            height: 14,
            borderRadius: 7,
            textAlign: "center",
            position: "absolute",
            bottom: 14,
            left: 14,
            fontSize: 13,
            fontWeight: "400",
          }}
        >
          {cart.length} {/* Render the length of cart array */}
        </span>
      </div>
      <button onClick={changeme}>
        Logout
      </button>
    </div>
  );
}

export default Header;
