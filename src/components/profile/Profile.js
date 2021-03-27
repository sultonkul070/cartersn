import React, {useState} from 'react';
import {Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';

export default function Profile(props) {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const {paidOrderedItems} = props

    return (
        <div className="container my-lg-5">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={({active: activeTab === '1'})}
                        onClick={() => {
                            toggle('1');
                        }}
                    >
                        Settings
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={({active: activeTab === '2'})}
                        onClick={() => {
                            toggle('2');
                        }}
                    >
                        Order history
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12" className="my-lg-3">
                            <h4>My profile</h4>
                            <Row>
                                <div className="col-lg-4 offset-lg-4">
                                    <Card>
                                        <CardHeader>
                                            Jackie Chan
                                        </CardHeader>
                                        <CardBody>
                                            <h5>Info</h5>
                                            <h5>Info</h5>
                                            <h5>Info</h5>
                                        </CardBody>
                                    </Card>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row className="my-lg-3">
                        {paidOrderedItems.length ? paidOrderedItems.map((item, index) => (
                                <div key={index} className="col-lg-6 mb-lg-2">
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
                                                <h5>Total count: <span
                                                    className="badge badge-warning">{item.totalCount}</span></h5>
                                                <h5>Total price: <span
                                                    className="badge badge-danger">{item.totalPrice}$</span></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <div className="col-lg-2 offset-lg-5 my-lg-4">
                                <div className="card border-0">
                                    <h4>No data</h4>
                                </div>
                            </div>
                        }
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

