import React, { Component, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function ExpertsProtectedRoute(props) {
    const history = useHistory();
    let Cmp = props.Cmp
    useEffect(()=>{
        if((localStorage.getItem('expert')==='false') || (!localStorage.getItem('expert'))){
            history.push('/apply')
        }
    })
    return (
        <div>
            <Cmp/>
        </div>
    )
}
