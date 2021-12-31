import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/ecom-logo-01.jpg";

const options = {
     burgerColorHover: "#eb4034",
     logo: logo ,
     logoWidth: "20vmax",
     navColor1: "#fff",
     logoHoverSize: "10px",
     logoHoverColor: "#eb4034",
     link1Text: "Home",
     link2Text: "About",
     link3Text: "Products",
     link4Text: "Contact",
     link1Url: "/",
     link2Url: "/about",
     link3Url: "/products",
     link4Url: "/contact",
     link1Size: "1.3vmax",
     link1Color: "rgba(35, 35, 35, 0.8)",
     link1ColorHover: "tomato",
     nav1JustifyContent: "flex-end",
     nav2JustifyContent: "flex-end",
     nav3JustifyContent: "flex-start",
     nav4JustifyContent: "flex-start",
     link1Margin: "1vmax",
     profileIconUrl: "/login",
     profileIconColor: "rgba(35, 35, 35, 0.8)",
     searchIconColor: "rgba(35, 35, 35, 0.8)",
     cartIconColor: "rgba(35, 35, 35, 0.8)",
     profileIconColorHover: "#eb4034",
     searchIconColorHover: "#eb4034",
     cartIconColorHover: "#eb4034",
     cartIconMargin: "1vmax",
};

const Header = () => {
     return <ReactNavbar {...options} />;
};

export default Header;
