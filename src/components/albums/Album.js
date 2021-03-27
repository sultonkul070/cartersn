import React, { useState, useEffect } from "react";
import { Button, CardBody, Card, Spinner } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Photo from '../photos/Photo';

let className = "container";
let way = '/photos';

function Album() {
  const [loader, setLoader] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [tempId, setTempId] = useState(null);


  const toggle = (id) => {
    setTempId(id);
    <Photo />
  }
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = () => {
    setLoader(true);

    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        setAlbums(response.data);
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
        <h2>Albums</h2>
        <div className="row">
          {loader ? (
            <div className="col-lg-2 offset-lg-5 text-center">
              <Spinner color="dark" />
            </div>
          ) : (
            albums.length &&
            albums.map((item, index) => (
              <div key={index} className="col-lg-3 mb-lg-5">
                <Link to={"/photos/" + item.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5>
                      {index + 1}.{item.title}
                    </h5>
                  </div>
                </div>
              </Link>  
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Album;
