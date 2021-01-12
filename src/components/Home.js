import React, { useState } from 'react';
import getToken from '../lib/tokens.js';
import {useHistory} from 'react-router-dom;'

const Home = () => {

    const generateToken = () => {
        const token = getToken()
        localStorage.setItem("token", token)
    }

    return(
        <button onClick={generateToken}>Create a new list</button>
    )
}

export default Home