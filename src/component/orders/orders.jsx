import React, { Component } from 'react'
import Navbar from '../home/navbar.jsx'
import Order_card from "./order_card"
export default class Order extends Component {
    render() {
        return [<Navbar/>,<Order_card/>]
    }
}
