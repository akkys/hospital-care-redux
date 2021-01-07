import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoctor,
  listDoctors,
  deleteDoctor,
} from "../../actions/DoctorAction";
import ErrorAlert from "../../misc/ErrorAlert";
import LoadingPage from "../Pages/LoadingPage";
import DoctorList from "./DoctorList";

const DoctorListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [expert, setExpert] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [available, setAvailable] = useState("");
  const [exp, setExp] = useState("");
  const [contact, setContact] = useState("");
  const [experts, setExperts] = useState([
    "Cardiology",
    "Psychology",
    "Neurology",
    "Dermotology",
    "Surgeon",
    "Paramedic",
    "ENT",
    "Consulting",
  ]);
  const [availables, setAvailables] = useState([
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
    "Full Day",
  ]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const doctorList = useSelector((state) => state.doctorList);
  const { doctors, loading } = doctorList;
  const doctorAdd = useSelector((state) => state.doctorAdd);
  const { success: successSave, error: errorSave } = doctorAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Doctors | A S K Hospitals";
    dispatch(listDoctors());
  }, [dispatch]);
  console.log("Docs", doctors);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listDoctors());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    setExperts(experts.map((exp) => exp));
    setExpert(experts[0]);
    setAvailables(availables.map((avail) => avail));
    setAvailable(availables[0]);
  }, []);

  const openModal = (doctor) => {
    if (doctor._id) {
      setModalVisible(true);
      setId(doctor._id);
      setName(doctor.name);
      setExpert(doctor.expert);
      setAvailable(doctor.available);
      setExp(doctor.exp);
      setContact(doctor.contact);
      setDesc(doctor.desc);
      setTime(doctor.time);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setExpert();
      setAvailable();
      setExp();
      setContact();
      setDesc();
      setTime();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = {
      _id: id,
      name,
      expert,
      available,
      exp,
      contact,
      desc,
      time,
    };
    dispatch(addDoctor(doctor));
    console.log(doctor);
  };

  const deleteHandler = (doctor) => {
    dispatch(deleteDoctor(doctor._id));
    dispatch(listDoctors());
  };

  const doctorsListData = doctors.map((doctor, i) => {
    return (
      <DoctorList
        key={i}
        docs={doctor}
        userInfo={userInfo}
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
          {doctors.length === 0 ? (
            <div className="col-md-11 mb-3">
              <h2>No Record!</h2>
            </div>
          ) : (
            <div className="col-md-11 mb-3">
              <h4>List of Doctors available in our Hospital</h4>
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
      <div className="row mt-3">
        <div className="container ">
          <div className="row">{doctorsListData}</div>
        </div>
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
              <h2>{!id ? "Add Doctor" : `Update Details`}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3">Doctor Name</label>
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
                <label className="col-md-3">Expertise In</label>
                <div className="col-md-9">
                  <select
                    className="form-control"
                    value={expert}
                    onChange={(e) => setExpert(e.target.value)}
                  >
                    {experts.map((expert, i) => {
                      return <option key={i}>{expert}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Experience in Years</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="exp"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Contact Number</label>
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
                <label className="col-md-3">Availbale At</label>
                <div className="col-md-9">
                  <select
                    className="form-control"
                    value={available}
                    onChange={(e) => setAvailable(e.target.value)}
                  >
                    {availables.map((available, i) => {
                      return <option key={i}>{available}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Available Times (in Hours)</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">About</label>
                <div className="col-md-9">
                  <textarea
                    type="text"
                    className="form-control"
                    rows="3"
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
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default DoctorListPage;
