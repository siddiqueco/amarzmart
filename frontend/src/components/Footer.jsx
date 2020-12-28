import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import css from './Footer.module.css'

const Footer = () => {
    return (
        <footer style={{background:'#ddd'}} className={css.footer}>                 
            <div className="social_icon">
                <ul className={css.linkWraper}>
                    <li className={css.link} ><a  className={css.anchor} href='https://www.facebook.com/ab.siddique786/'><i class="fab fa-facebook"></i></a></li>
                    <li className={css.link} ><a  href='https://github.com/siddique000/'><i class="fab fa-github"></i></a></li>
                    <li className={css.link} ><a  href='https://www.linkedin.com/in/siddique786//'><i class="fab fa-linkedin"></i></a></li>
                </ul>
            </div>
            <p className={css.para} >&copy; 2020 SidShop</p>
        </footer>
    )
}

export default Footer


// const Footer = () => {
//     return (
//         <footer>
//            <Container>
//                <Row>
//                    <Col className="text-center">
//                      &copy; 2020 SidShop
//                    </Col>
//                </Row>
//            </Container>
//         </footer>
//     )
// }

// const Footer = () => {
//     return (
//         <footer>
//            <Container>
//                <Row>
//                    <ul className='socials'>
//                        <li><a href='https://www.facebook.com/ab.siddique786/'><i class="fab fa-facebook"></i></a></li>
//                        <li><a href='https://github.com/siddique000/'><i class="fab fa-github"></i></a></li>
//                        <li><a href='https://www.linkedin.com/in/siddique786//'><i class="fab fa-linkedin"></i></a></li>                    
//                    </ul>
//                </Row>
//                <Row>
//                    <Col className="text-center">
//                      &copy; 2020 SidShop
//                    </Col>
//                </Row>
//            </Container>
//         </footer>
//     )
// }