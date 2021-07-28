import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Product from '../components/ProductCard/ProductCard'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import Title from '../components/TitleComp/Title'
// import SwiperJs from '../components/SwiperJs'



const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const topRatedProductList = useSelector(state => state.productTopRated)
    const { loading: loadingTop, products: topRatedProduct } = topRatedProductList

    console.log(topRatedProduct)
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])


    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}

            <Title
                text='Top Product'
                textColor='#fa9e48'
                iconColor='#e68332'
                icon={<i className="fas fa-fire"></i>}
            />
            <Row>
                {topRatedProduct.map((product) => (
                    <Col key={product._id} sm={4} md={3} lg={2.5} xl={2}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>

            {/* <h2 className='mt-3 text-center-sm'>Latest Products</h2> */}
            <Title
                text='Latest Products'
                textColor='#F57224'
                iconColor='#ffae00'
                icon={<i class="far fa-smile-beam"></i>}
            />
            {loading ?
                <Loader /> : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <>
                        <Row>
                            {products.map((product) => (
                                <Col key={product._id} sm={4} md={3} lg={2.5} xl={2}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                    </>
                )}

        </>
    )
}

export default HomeScreen