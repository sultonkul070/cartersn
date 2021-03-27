import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <h3>Company</h3>
            <p>
              <a href="#">Posts</a>
            </p>
            <p>
              <a href="#">Products</a>
            </p>
            <p>
              <a href="#">Services</a>
            </p>
            <p>
              <a href="#">Our customers</a>
            </p>
            <p>
              <a href="#">About us</a>
            </p>
          </div>
          <div className="col-lg-4">
            <h3>Products</h3>
            <p>
              <a href="#">Posts</a>
            </p>
            <p>
              <a href="#">Albums</a>
            </p>
            <p>
              <a href="#">Photos</a>
            </p>
            <p>
              <a href="#">Clothing</a>
            </p>
            <p>
              <a href="#">Technologies</a>
            </p>
          </div>
          <div className="col-lg-4">
            <h3>Contact</h3>
            <p>(+99891) 622-53-87</p>
            <p>(+99897) 647-53-00</p>
            <p>(+99871) 002-53-07</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
