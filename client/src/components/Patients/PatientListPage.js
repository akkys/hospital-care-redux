import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addPatient,
  deletePatient,
  listPatients,
} from "../../actions/PatientAction";
import ErrorAlert from "../../misc/ErrorAlert";
import LoadingPage from "../Pages/LoadingPage";
import PatientList from "./PatientList";

const PatientListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [admitDate, setAdmitDate] = useState("");
  const [status, setStatus] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const [roomType, setRoomType] = useState("");
  const [genders, setGenders] = useState(["Male", "Female", "Others"]);
  const [patientStatus, setPatientStatus] = useState([
    "Treating",
    "Discharged",
    "Under Observation",
  ]);
  const [roomTypes, setRoomTypes] = useState([]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const patientList = useSelector((state) => state.patientList);
  const { loading, patients, error } = patientList;
  const patientAdd = useSelector((state) => state.patientAdd);
  const { success: successSave, error: errorSave } = patientAdd;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Patients | A S K Hospitals";
    dispatch(listPatients());
  }, []);
  console.log(patients);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listPatients());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    async function getRoomTypes() {
      const roomTypeData = await axios.get("http://localhost:5000/wards/");
      if (roomTypeData.data.length > 0) {
        return (
          setRoomTypes(roomTypeData.data.map((room) => room.roomType)),
          setRoomType(roomTypeData.data[0].roomType)
        );
      }
    }
    getRoomTypes();
  }, []);

  useEffect(() => {
    setGenders(genders.map((gender) => gender));
    setGender(genders[0]);
    setPatientStatus(patientStatus.map((status) => status));
    setStatus(patientStatus[0]);
  }, []);

  const openModal = (patient) => {
    if (patient._id) {
      setModalVisible(true);
      setId(patient._id);
      setPid(patient.pid);
      setName(patient.name);
      setAge(patient.age);
      setGender(patient.gender);
      setContact(patient.contact);
      setAddress(patient.address);
      setAdmitDate(patient.admitDate);
      setStatus(patient.status);
      setRoomNum(patient.roomNum);
      setRoomType(patient.roomType);
    } else {
      setModalVisible(true);
      setId();
      setPid();
      setName();
      setAge();
      setGender();
      setContact();
      setAddress();
      setAdmitDate();
      setStatus();
      setRoomNum();
      setRoomType();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = {
      _id: id,
      pid,
      name,
      age,
      gender,
      contact,
      address,
      admitDate,
      roomNum,
      roomType,
      status,
    };
    dispatch(addPatient(patient));
    console.log(patient);
  };

  const deleteHandler = (patient) => {
    dispatch(deletePatient(patient._id));
    dispatch(listPatients());
  };

  const patientListData = patients.map((patient, i) => {
    return (
      <PatientList
        key={i}
        patient={patient}
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
          {patients.length === 0 ? (
            <div className="col-md-11 mb-3">
              <h4>No Record!</h4>
            </div>
          ) : (
            <div className="col-md-11 mb-3">
              <h4>List of Patients</h4>
            </div>
          )}
        </div>
        {userInfo && (
          <div className="col-md-1">
            <button
              onClick={() => openModal({})}
              className="btn btn-secondary btn-sm btn-block"
            >
              <strong>Add</strong>
            </button>
          </div>
        )}
      </div>
      <div className="container mt-3">
        <table className="table table-responsive">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">PID</th>
              <th scope="col">Name</th>
              <th scope="col">Admission Date</th>
              <th scope="col">Room No.</th>
              <th scope="col">Room Type</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {patientListData}
        </table>
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
              <h2>{!id ? "Add Patient" : "Update Patient"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="row">
                <div
                  className="col-md-6"
                  style={{ borderRight: "1px solid rgb(206, 206, 206)" }}
                >
                  <div className="form-group row">
                    <label className="col-md-3">Patient ID</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="pid"
                        value={pid}
                        onChange={(e) => setPid(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3">Name</label>
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
                    <label className="col-md-3">Admission Date</label>
                    <div className="col-md-9">
                      <input
                        type="datetime-local"
                        className="form-control"
                        name="admitDate"
                        value={admitDate}
                        onChange={(e) => setAdmitDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3">Status</label>
                    <div className="col-md-9">
                      <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {patientStatus.map((status, i) => {
                          return <option key={i}>{status}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3">Room Number</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="roomNum"
                        value={roomNum}
                        onChange={(e) => setRoomNum(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3">Room Type</label>
                    <div className="col-md-9">
                      <select
                        className="form-control"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                      >
                        {roomTypes.map((roomType, i) => {
                          return <option key={i}>{roomType}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group row">
                    <label className="col-md-3">Age</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                  </div>{" "}
                  <div className="form-group row">
                    <label className="col-md-3">Gender</label>
                    <div className="col-md-9">
                      <select
                        className="form-control"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        {genders.map((gender, i) => {
                          return <option key={i}>{gender}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3">Contact</label>
                    <div className="col-md-9">
                      <input
                        type="text"
                        className="form-control"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3">Address</label>
                    <div className="col-md-9">
                      <textarea
                        type="text"
                        className="form-control"
                        rows="5"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
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

export default PatientListPage;