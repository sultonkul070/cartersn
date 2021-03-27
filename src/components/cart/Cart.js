import React, {useState} from "react";
import {Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

export default function Cart(props) {

    let history = useHistory();

    const [modal, setModal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    const handleValidSubmit = (event, values) => {

        const {cardInfo, allProductsPrice, orderedProducts, createPaidOrderedItems} = props

        let counter = 0
        let tempObjectId = null


        cardInfo.map(item => {
            if (item.name === values.name && item.number === parseInt(values.number) && item.month === parseInt(values.month) && item.year === parseInt(values.year) && item.cvv === parseInt(values.cvv)) {
                counter = 1
                tempObjectId = item.id
            }
        })

        if (counter === 1) {

            let cardIndex = cardInfo.findIndex(obj => obj.id === tempObjectId)

            cardInfo[cardIndex].balance -= allProductsPrice

            createPaidOrderedItems(orderedProducts)

            toast.success("To'lovingiz muvaffaqiyatli amalga oshirildi!")

            setModal(!modal)

            history.push('/profile')

        } else if (counter === 0) {
            toast.error("To'lov amalga oshirilmadi.")
        }


    }

    const {orderedProducts, allProductsPrice, changeCount, deleteProductFromCart} = props

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between">
                <h1 className="mb-5">My cart</h1>
                <div className="d-flex align-items-center">
                    <h4>All products price: <span className="badge badge-primary">{allProductsPrice}$</span></h4>
                    <Button onClick={toggle} color="warning" className="ml-3">Checkout</Button>
                </div>
            </div>
            <div className="row">

                {orderedProducts.length ? orderedProducts.map((item, index) => (
                        <div key={index} className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="card border-0">
                                        <img className="w-100" src={item.imgURL} alt="product"/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card border-0">
                                        <h5>{item.name}, {item.brand}</h5>
                                        <h5>Size: {item.size}</h5>
                                        <h5>Price: <span className="badge badge-danger">{item.price}$</span></h5>
                                        <h5>Total count: <span className="badge badge-warning">{item.totalCount}</span></h5>
                                        <h5>Total price: <span className="badge badge-danger">{item.totalPrice}$</span></h5>
                                    </div>
                                    <div className="card border-0 my-4">
                                        <ButtonGroup>
                                            <Button onClick={() => changeCount(item.id, 'cart-minus')}>-</Button>
                                            <Button outline color="secondary" disabled>{item.totalCount}</Button>
                                            <Button onClick={() => changeCount(item.id, 'cart-plus')}>+</Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className="card border-0">
                                        <Button color="danger"
                                                onClick={() => deleteProductFromCart(item.id)}>Remove</Button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    )) :
                    <div className="col-lg-2 offset-lg-5">
                        <div className="card border-0">
                            <h4>No data</h4>
                        </div>
                    </div>
                }

            </div>
            <Modal isOpen={modal} toggle={toggle} backdrop="static">
                <AvForm onValidSubmit={handleValidSubmit}>
                    <ModalHeader toggle={toggle}>
                        Modal title
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <AvField name="name" label="NAME ON CARD" type="text" required/>
                                </div>
                                <div className="col-lg-6">
                                    <AvField name="number" label="CARD NUMBER" type="number" required/>
                                </div>
                                <div className="col-lg-4">
                                    <AvField type="select" name="month" label="EXPIRY DATE">
                                        <option value="">Select a month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                    </AvField>
                                </div>
                                <div className="col-lg-4">
                                    <AvField type="select" name="year" label=".">
                                        <option value="2021">2021</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                    </AvField>
                                </div>
                                <div className="col-lg-4">
                                    <AvField name="cvv" label="CVV" maxLength={'4'} type="text" required/>
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary">Pay</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </AvForm>
            </Modal>
        </div>
    )
}