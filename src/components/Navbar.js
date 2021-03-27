import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useState } from "react";

function Navbar(props) {
  const [dropdownOpen, changeDropdown] = useState(false);

  const toggle = () => {
    changeDropdown(!dropdownOpen);
    props.calculateAllPrices();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="/">
            <img className="e-logo" src="/images/e-logo.jpg" alt="/logo" />
          </a>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/albums">
                Albums
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technologies">
                Technologies
              </Link>
            </li>
          </ul>
          <div className="ml-lg-auto">
            <div className="d-flex align-items-center">
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>Cart</DropdownToggle>
                <DropdownMenu>
                  {props.orderedProducts.length ? (
                    props.orderedProducts.map((item, index) => (
                      <DropdownItem key={index}>
                        {item.name} {item.totalCount}x
                      </DropdownItem>
                    ))
                  ) : (
                    <DropdownItem>No data</DropdownItem>
                  )}
                  <DropdownItem divider />
                  {props.orderedProducts.length ? (
                    <DropdownItem>
                      <Link to="/cart">
                        Total price: {props.allProductsPrice}$
                      </Link>
                    </DropdownItem>
                  ) : null}
                </DropdownMenu>
              </Dropdown>
              <h4 className="ml-2">
                <Link to={"/profile"}>
                  {props.orderInfo.firstName} {props.orderInfo.lastName}
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
