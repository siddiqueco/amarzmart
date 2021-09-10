import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopThreeProducts } from '../actions/productActions'
import campaignImg from '../assests/img/cashon.png'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopThree)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopThreeProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark shadow-sm' touch={true} prevIcon='' nextIcon=''>
      <Carousel.Item  className='carosel-campaign-image'>
        <Image src={campaignImg} alt=''  className="d-block w-100" />
      </Carousel.Item>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid className='carosel-product-image'/>
            <Carousel.Caption className='carousel-caption'>
              <h2 >
                {product.name} (<span className=' tk '>৳</span>{product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}

    </Carousel>
  )
}

export default ProductCarousel