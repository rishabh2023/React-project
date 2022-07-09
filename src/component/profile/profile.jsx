import React, { Component } from 'react'
import UserInfo from './userinfo';
import Navbar from '../home/navbar.jsx'


export default class Profile extends Component {
    render() {
        return [<Navbar />, <UserInfo />]



    }
}