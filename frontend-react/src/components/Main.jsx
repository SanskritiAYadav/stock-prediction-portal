import React from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'

const Main = () => {
  return (
    <>
    <Header />
    <div className='container'>
        <div className='p-5 text-center bg-light-dark rounded-3'>
             <h1 className='text-light'>Welcome to the Stock Prediction Portal </h1>
                <p className='text-light lead'>Predict the future of stocks with our cutting-edge machine learning models. Our portal provides accurate and timely predictions to help you make informed investment decisions. Whether you're a seasoned trader or just starting out, our user-friendly interface and powerful algorithms will give you the edge you need to succeed in the stock market.</p>
                <Button text="Get Started" class="btn-info"/>
        </div>
    </div>

    <Footer />
    
    </>
  )
}

export default Main