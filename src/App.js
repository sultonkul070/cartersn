import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Album from "./components/albums/Album";
import Photo from './components/photos/Photo'
import Product from "./components/products/Product";
import Technology from "./components/technologies/Technology";
import Footer from "./components/Footer";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [
        {
          id: 1,
          name: "T-shirt",
          brand: "Nike",
          size: "XL",
          price: 25,
          imgURL: "/images/t-shirt-nike.jpg",
        },
        {
          id: 2,
          name: "T-shirt",
          brand: "Reebok",
          size: "XXL",
          price: 20,
          imgURL: "/images/t-shirt-reebok.jpg",
        },
        {
          id: 3,
          name: "Pants",
          brand: "Reebok",
          size: "33",
          price: 35,
          imgURL: "/images/pants-reebok.jpg",
        },
        {
          id: 4,
          name: "Pants",
          brand: "Nike",
          size: "31",
          price: 40,
          imgURL: "/images/pants-nike.jpg",
        },
        {
          id: 5,
          name: "Cap",
          brand: "Nike",
          size: "standart",
          price: 30,
          imgURL: "/images/cap-nike.jpg",
        },
        {
          id: 6,
          name: "Cap",
          brand: "Adidas",
          size: "standart",
          price: 32,
          imgURL: "/images/cap-adidas.jpg",
        },
        {
          id: 7,
          name: "Snickers",
          brand: "Adidas",
          size: "40",
          price: 125,
          imgURL: "/images/snickers-adidas.jpg",
        },
        {
          id: 8,
          name: "Snickers",
          brand: "Nike",
          size: "42",
          price: 150,
          imgURL: "/images/snickers-nike.jpg",
        },
      ],
      technologies: [
        {
          id: 1,
          name: "Mobile",
          brand: "Apple",
          model: "12 Pro Max",
          price: 1100,
          imgURL: "/images/iphone-12.jpg",
        },
        {
          id: 2,
          name: "Mobile",
          brand: "Samsung",
          model: "s21",
          price: 1200,
          imgURL: "/images/samsung-s21.jpg",
        },
        {
          id: 3,
          name: "Mobile",
          brand: "Huawei",
          model: "p30 Lite",
          price: 160,
          imgURL: "/images/huawei-p30.jpg",
        },
        {
          id: 4,
          name: "Mobile",
          brand: "Redmi",
          model: "Note 8",
          price: 190,
          imgURL: "/images/redmi-note8.jpg",
        },
        {
          id: 5,
          name: "Laptop",
          brand: "Apple",
          model: "Macbook Pro",
          price: 1400,
          imgURL: "/images/macbook-pro.jpg",
        },
        {
          id: 6,
          name: "Laptop",
          brand: "HP",
          model: "Core i7",
          price: 950,
          imgURL: "/images/hp-i7.jpg",
        },
        {
          id: 7,
          name: "Smart Watch",
          brand: "Apple",
          model: "Series 3",
          price: 170,
          imgURL: "/images/watch-series3.jpg",
        },
        {
          id: 8,
          name: "Smart Watch",
          brand: "Redmi",
          model: "4",
          price: 55,
          imgURL: "/images/redmi-watch-4.jpg",
        },
      ],
      cardInfo: [
        {
          id: 1,
          name: "William",
          number: 12345678,
          month: 1,
          year: 2017,
          cvv: 1234,
          balance: 10000,
        },
        {
          id: 2,
          name: "Lee",
          number: 12345678,
          month: 1,
          year: 2019,
          cvv: 1234,
          balance: 20000,
        },
        {
          id: 3,
          name: "Donald",
          number: 12345612,
          month: 1,
          year: 2019,
          cvv: 1224,
          balance: 30000,
        },
      ],
      orderInfo: {
        id: 123456,
        firstName: "Jackie",
        lastName: "Chan",
        totalPrice: 0,
      },
      orderedProducts: [],
      tempCount: 1,
      tempPrice: 0,
      paidOrderedItems: [],
    };
  }

  changeCount = (item, status) => {
    if (status !== "reset") {
      if (status === true) {
        this.setState({
          tempCount: this.state.tempCount + 1,
          tempPrice: (this.state.tempCount + 1) * item.price,
        });
      } else if (this.state.tempCount >= 1 && !status) {
        this.setState({
          tempCount: this.state.tempCount - 1,
          tempPrice: (this.state.tempCount - 1) * item.price,
        });
      } else if (status === "cart-plus") {
        const { orderedProducts } = this.state;

        let objectId = orderedProducts.findIndex((obj) => obj.id === item);
        orderedProducts[objectId].totalCount += 1;
        orderedProducts[objectId].totalPrice =
          orderedProducts[objectId].totalCount *
          orderedProducts[objectId].price;

        this.setState({
          orderedProducts: orderedProducts,
        });
        this.calculateAllPrices();
      } else if (status === "cart-minus") {
        const { orderedProducts } = this.state;

        let objectId = orderedProducts.findIndex((obj) => obj.id === item);

        if (orderedProducts[objectId].totalCount >= 1) {
          orderedProducts[objectId].totalCount -= 1;
        }
        orderedProducts[objectId].totalPrice =
          orderedProducts[objectId].totalCount *
          orderedProducts[objectId].price;

        this.setState({
          orderedProducts: orderedProducts,
        });

        this.calculateAllPrices();
      }
    } else {
      this.setState({
        tempCount: 1,
        tempPrice: 0,
      });
    }
  };

  addToCart = (item) => {
    const { tempCount, orderedProducts, orderInfo } = this.state;

    if (tempCount >= 1) {
      item.orderId = orderInfo.id;
      item.totalCount = tempCount;
      item.totalPrice = tempCount * item.price;
      orderedProducts.push(item);
    }
  };

  calculateAllPrices = () => {
    let priceCounter = 0;

    const { orderedProducts, orderInfo } = this.state;

    orderedProducts.map((item) => {
      priceCounter = priceCounter + item.totalPrice;
    });

    orderInfo.totalPrice = priceCounter;

    this.setState({
      orderInfo: orderInfo,
    });
  };

  deleteProductFromCart = (id) => {
    const { orderedProducts } = this.state;

    let objectId = orderedProducts.findIndex((obj) => obj.id === id);

    orderedProducts.splice(objectId, 1);

    this.setState({
      orderedProducts: orderedProducts,
    });

    this.calculateAllPrices();
  };

  createPaidOrderedItems = (items) => {
    this.setState({
      paidOrderedItems: [...items, ...this.state.paidOrderedItems],
      orderedProducts: [],
    });
  };

  render() {
    const {
      products,
      technologies,
      tempCount,
      tempPrice,
      orderedProducts,
      orderInfo,
      cardInfo,
      paidOrderedItems,
    } = this.state;

    return (
      <Router>
        <Navbar
          orderInfo={orderInfo}
          orderedProducts={orderedProducts}
          allProductsPrice={orderInfo.totalPrice}
          calculateAllPrices={this.calculateAllPrices}
        />
        <Switch>
          <Route exact path="/">
            <Section />
          </Route>
          {/*<Route path="/products" component={Product}/>*/}
          <Route path="/albums" render={() => <Album />} />
          <Route path="/photos/:url" render={() => <Photo />} />
          <Route
            path="/products"
            render={() => (
              <Product
                tempCount={tempCount}
                tempPrice={tempPrice}
                data={products}
                changeCount={(item, status) => this.changeCount(item, status)}
                addToCart={(item) => this.addToCart(item)}
              />
            )}
          />
          <Route
            path="/technologies"
            render={() => (
              <Technology
                tempCount={tempCount}
                tempPrice={tempPrice}
                data={technologies}
                changeCount={(item, status) => this.changeCount(item, status)}
                addToCart={(item) => this.addToCart(item)}
              />
            )}
          />
          <Route
            path="/cart"
            render={() => (
              <Cart
                deleteProductFromCart={(id) => this.deleteProductFromCart(id)}
                orderedProducts={orderedProducts}
                allProductsPrice={orderInfo.totalPrice}
                changeCount={(item, status) => this.changeCount(item, status)}
                cardInfo={cardInfo}
                paidOrderedItems={paidOrderedItems}
                createPaidOrderedItems={(items) =>
                  this.createPaidOrderedItems(items)
                }
              />
            )}
          />
          <Route
            path="/profile"
            render={() => <Profile paidOrderedItems={paidOrderedItems} />}
          />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

export default App;
