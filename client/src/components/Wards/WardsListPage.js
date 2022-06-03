import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addWard, deleteWard, listWards } from "../../actions/WardAction";
import ErrorAlert from "../../misc/ErrorAlert";
import PageHeader from "../Layout/PageHeader";
import LoadingPage from "../Pages/LoadingPage";
import WardList from "./WardList";

const WardsListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [roomType, setRoomType] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const wardList = useSelector((state) => state.wardList);
  const { loading, wards } = wardList;
  const wardAdd = useSelector((state) => state.wardAdd);
  const { success: successSave, error: errorSave } = wardAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Wards | A S K Hospitals";
    dispatch(listWards());
  }, [dispatch]);
  console.log(wards);

  useEffect(() => {
    document.title = "Wards | A S K Hospitals";
    if (successSave) {
      setModalVisible(false);
      dispatch(listWards());
    }
  }, [dispatch, successSave]);

  const openModal = (ward) => {
    if (ward._id) {
      setModalVisible(true);
      setId(ward._id);
      setRoomType(ward.roomType);
      setDesc(ward.desc);
      setPrice(ward.price);
    } else {
      setModalVisible(true);
      setId();
      setRoomType();
      setDesc();
      setPrice();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ward = {
      _id: id,
      roomType,
      desc,
      price,
    };
    dispatch(addWard(ward));
  };

  const deleteHandler = (ward) => {
    dispatch(deleteWard(ward._id));
    dispatch(listWards());
  };

  const wardsListData = wards.map((ward, i) => {
    return (
      <WardList
        key={i}
        ward={ward}
        openModal={openModal}
        userInfo={userInfo}
        deleteHandler={deleteHandler}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader data={wards} title="Wards" openModal={openModal} />
      <div className="row">{wardsListData}</div>
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="md"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Add Ward" : "Update Ward"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3">Room Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="roomType"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Price</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Description</label>
                <div className="col-md-9">
                  <textarea
                    type="text"
                    className="form-control"
                    rows="4"
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Add" : "Update"}
              </button>
              <button
                className="btn btn-secondary mt-5 mr-3 float-right"
                onClick={closeModal}
              >
                Cancel
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default WardsListPage;
