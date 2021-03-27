import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

let className = "container";
function Photo(props) {
  const [loader, setLoader] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const history = useHistory();
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    setLoader(true);

    axios
      .get(
        "https://jsonplaceholder.typicode.com/photos?albumId=" +
          history.location.pathname.slice(8)
      )
      .then((response) => {
        setPhotos(response.data);
        setLoader(false);
      })
      .catch((error) => {
        setError(error);
        setLoader(false);
      });
  };
  return (
    <div className="albums">
      {error ? (
        <React.StrictMode>{toast.error("Serverda xatolik")}</React.StrictMode>
      ) : null}
      <div className={className}>
        <h2>Photos</h2>
        <div className="row">
          {loader ? (
            <div className="col-lg-2 offset-lg-5 text-center">
              <Spinner color="dark" />
            </div>
          ) : (
            photos.length &&
            photos.map((item, index) => (
              <div key={index} className="col-lg-3 mb-lg-5">
                <div className="card h-100">
                  <div className="card-body d-flex justify-content-center">
                    <img src={item.thumbnailUrl} />
                  </div>
                  <div className="card-footer">
                    <h5>
                      {item.id}.{item.title}
                    </h5>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Photo;
