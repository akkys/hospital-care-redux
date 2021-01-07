import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, deleteRoom, listRooms } from "../../actions/RoomAction";
import ErrorAlert from "../../misc/ErrorAlert";
import LoadingPage from "../Pages/LoadingPage";
import LabRoom from "./LabRoom";

const LabRoomPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [groups, setGroups] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [sampleGroups, setSampleGroups] = useState([
    "Blood",
    "Urine",
    "Stool",
    "Throat Swab",
    "UV Scan",
    "MRI",
    "X-Ray",
  ]);
  const roomList = useSelector((state) => state.roomList);
  const { rooms, loading } = roomList;
  const roomAdd = useSelector((state) => state.roomAdd);
  const { success: successSave, error: errorSave } = roomAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Laboratory | A S K Hospitals";
    dispatch(listRooms());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listRooms());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    setSampleGroups(sampleGroups.map((sample) => sample));
    setGroups(sampleGroups[0]);
  }, []);

  const openModal = (room) => {
    if (room._id) {
      setModalVisible(true);
      setId(room._id);
      setNum(room.num);
      setName(room.name);
      setCapacity(room.capacity);
      setFromTime(room.fromTime);
      setToTime(room.toTime);
      setGroups(room.groups);
    } else {
      setModalVisible(true);
      setId();
      setNum();
      setName();
      setCapacity();
      setFromTime();
      setToTime();
      setGroups();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const room = {
      _id: id,
      num,
      name,
      capacity,
      groups,
      fromTime,
      toTime,
    };
    dispatch(addRoom(room));
  };

  const deleteHandler = (room) => {
    dispatch(deleteRoom(room._id));
    dispatch(listRooms());
  };

  const roomListData = rooms.map((room, i) => {
    return (
      <LabRoom
        key={i}
        room={room}
        openModal={openModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <div className="row">
        <div className="col-md-11">
          {rooms.length === 0 ? (
            <div className="col-md-11 mb-3">
              <h2>No Record!</h2>
            </div>
          ) : (
            <div className="col-md-11 mb-3">
              <h4>List of Labs available in our Hospital</h4>
            </div>
          )}
        </div>

        <div className="col-md-1">
          <button
            onClick={() => openModal({})}
            className="btn btn-secondary btn-sm btn-block"
          >
            <strong>Add</strong>
          </button>
        </div>
      </div>
      <div className="container mt-3">
        {rooms.length > 0 && (
          <table className="table table-responsive-lg">
            <thead className="thead-dark">
              <tr style={{ textAlign: "center" }}>
                <th scope="col"></th>
                <th scope="col">No.</th>
                <th scope="col">Room Name</th>
                <th scope="col">Sample Groups</th>
                <th scope="col">Capacity</th>
                <th scope="col">Timing</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            {roomListData}
          </table>
        )}
      </div>
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="lg"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Add Laboratory" : "Update Laboratory"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3"> Name</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Capacity</label>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    name="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
                <label className="col-md-1">No.</label>
                <div className="col-md-2">
                  <input
                    type="text"
                    className="form-control"
                    name="num"
                    value={num}
                    onChange={(e) => setNum(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Time Slots</label>

                <div className="col-md-2">
                  <input
                    type="time"
                    className="form-control"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>

                <label className="col-md-1" style={{ textAlign: "center" }}>
                  To
                </label>
                <div className="col-md-2">
                  <input
                    type="time"
                    className="form-control"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3"> Sample Groups</label>
                <div className="col-md-9">
                  <select
                    className="form-control"
                    value={groups}
                    onChange={(e) => setGroups(e.target.value)}
                  >
                    {sampleGroups.map((group, i) => {
                      return <option key={i}>{group}</option>;
                    })}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Add" : "Update"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default LabRoomPage;
