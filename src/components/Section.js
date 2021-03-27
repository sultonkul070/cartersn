import React, { useState, useEffect } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { AvForm, AvField } from "availity-reactstrap-validation";

let className = "container";

function Section() {
  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [tempId, setTempId] = useState(null);

  const [loaderComments, setLoaderComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [modal, setModal] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [deletePostId, setdeletePostId] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    setEditPost(null);
  };

  const handleValidSubmit = (events, values) => {
    toggleModal();

    if (editPost) {
      axios
        .put("https://jsonplaceholder.typicode.com/posts/" + editPost.id, {
          values,
        })
        .then((response) => {
          toast.success("Edited successfully!");
        })
        .catch((error) => {
          toast.error("Error");
        });
    } else {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", values)
        .then((response) => {
          toast.success("Post added successfully!");
        })
        .catch((error) => {
          toast.error("Error");
        });
    }

    fetchPosts();
  };

  const editOrDeletePosts = (idOrItem, status) => {
    if (status === "edit") {
      toggleModal();
      setEditPost(idOrItem);
    } else {
      toggleModalDelete(idOrItem);
    }
  };

  const toggleModalDelete = (id) => {
    setModalDelete(!modalDelete);
    setdeletePostId(id);
  };

  const agreeToDelete = (answer) => {
    if (answer === "yes") {
      axios
        .delete("https://jsonplaceholder.typicode.com/posts/" + deletePostId)
        .then((response) => {
          toast.warning("Deleted successfully!");
        })
        .catch((error) => {
          toast.error("Error");
        });
      setModalDelete(false);
      fetchPosts();
    } else {
      setModalDelete(false);
    }
  };

  const toggle = (id) => {
    setTempId(tempId === id ? null : id);

    setLoaderComments(true);

    axios
      .get("https://jsonplaceholder.typicode.com/comments?postId=" + id)
      .then((response) => {
        setComments(response.data);
        setLoaderComments(false);
      })
      .catch((error) => {
        setLoaderComments(false);
        setError(error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoader(true);

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoader(false);
      })
      .catch((error) => {
        setError(error);
        setLoader(false);
      });
  };

  return (
    <section className="section-1 py-lg-5">
      {error ? (
        <React.StrictMode>{toast.error("Serverda xatolik")}</React.StrictMode>
      ) : null}

      <div className={className}>
        <div className="d-flex justify-content-between my-lg-3">
          <h2>Posts</h2>
          <button onClick={toggleModal} className="btn btn-danger">
            New post
          </button>
        </div>
        <div className="row">
          {loader ? (
            <div className="col-lg-2 offset-lg-5 text-center">
              <Spinner color="dark" />
            </div>
          ) : (
            posts.length &&
            posts.map((item, index) => (
              <div key={index} className="col-lg-12 mb-lg-3">
                <div className="card">
                  <div className="card-body">
                    <h4>
                      {index + 1}.{item.title}
                    </h4>
                    <p>{item.body}</p>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between">
                      <Button
                        color="secondary"
                        onClick={() => toggle(item.id)}
                        style={{ marginBottom: "1rem" }}
                      >
                        Comments
                      </Button>
                      <div>
                        <button
                          onClick={() => editOrDeletePosts(item, "edit")}
                          className="btn btn-warning mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => editOrDeletePosts(item.id, "delete")}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <Collapse isOpen={tempId === item.id}>
                      <Card>
                        {comments.length &&
                          comments.map((item, index) => (
                            <CardBody key={index}>
                              <h5>{item.name}</h5>
                              <h6>{item.email}</h6>
                              <p>{item.body}</p>
                              <hr />
                            </CardBody>
                          ))}
                      </Card>
                    </Collapse>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Modal
        isOpen={modalDelete}
        toggle={() => toggleModalDelete(null)}
        backdrop="static"
      >
        <ModalHeader toggle={() => toggleModalDelete(null)}>
          Modal title
        </ModalHeader>
        <ModalBody>Do you want to delete the post?</ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="submit"
            onClick={() => agreeToDelete("yes")}
          >
            Yes
          </Button>{" "}
          <Button color="secondary" onClick={() => agreeToDelete("no")}>
            No
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modal} toggle={toggleModal} backdrop="static">
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <AvForm onValidSubmit={handleValidSubmit}>
          <ModalBody>
            <AvField
              value={editPost ? editPost.title : ""}
              name="title"
              label="Title"
              type="text"
              required
            />
            <AvField
              value={editPost ? editPost.body : ""}
              name="body"
              label="Body"
              type="textarea"
              required
            />
            <AvField
              value={editPost ? editPost.userId : ""}
              name="userId"
              label="User id"
              type="number"
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={editOrDeletePosts}>
              Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    </section>
  );
}

export default Section;
