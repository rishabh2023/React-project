import React, { Component, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const history = useHistory();
    let Cmp = props.Cmp
    useEffect(()=>{
        if(!localStorage.getItem('access_token')){
            history.push('/login')
        }
    })
    return (
        <div>
            <Cmp/>
        </div>
    )
}
