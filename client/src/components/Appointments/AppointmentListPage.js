import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addAppointment,
  deleteAppointment,
  listAppointments,
} from "../../actions/AppointmentAction";
import LoadingPage from "../Pages/LoadingPage";
import AppointmentList from "./AppointmentList";
import ErrorAlert from "../../misc/ErrorAlert";
import DeleteModal from "../../misc/DeleteModal";
import PaginationButton from "../Layout/PaginationButton";
import PageHeader from "../Layout/PageHeader";

const AppointmentListPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [datetime, setDatetime] = useState("");
  const [choose, setChoose] = useState("");
  const [docName, setDocName] = useState("");
  const [docts, setDocts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredAppt, setFilteredAppt] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultPerPage] = useState(5);

  const appointmentList = useSelector((state) => state.appointmentList);
  const { appointments, loading } = appointmentList;
  const appointmentAdd = useSelector((state) => state.appointmentAdd);
  const { success: successSave, error: errorSave } = appointmentAdd;

  const openModal = (appointment) => {
    if (appointment._id) {
      setModalVisible(true);
      setId(appointment._id);
      setName(appointment.name);
      setEmail(appointment.email);
      setContact(appointment.contact);
      setAddress(appointment.address);
      setCity(appointment.city);
      setZipcode(appointment.zipcode);
      setDatetime(appointment.datetime);
      setChoose(appointment.choose);
      setDocName(appointment.docName);
    } else {
      setModalVisible(true);
      setId();
      setName();
      setEmail();
      setContact();
      setAddress();
      setCity();
      setZipcode();
      setDatetime();
      setChoose();
      setDocName();
    }
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Appointments | A S K Hospitals";
    dispatch(listAppointments());
  }, [dispatch]);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listAppointments());
    }
  }, [dispatch, successSave]);

  useEffect(() => {
    async function getDocNames() {
      const docNameData = await axios.get("http://localhost:5000/doctors/");
      //   console.log(docNameData.data);
      if (docNameData.data.length > 0) {
        return (
          setDocts(docNameData.data.map((doc) => doc.name)),
          setDocName(docNameData.data[0].name)
        );
      }
    }
    getDocNames();
  }, []);

  useEffect(() => {
    setFilteredAppt(
      appointments.filter((appointment) => {
        return (
          appointment.contact.includes(search) ||
          appointment.email.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, appointments]);
  console.log("Filter", filteredAppt);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointment = {
      _id: id,
      name,
      email,
      contact,
      datetime,
      address,
      city,
      zipcode,
      docName,
      choose,
    };
    dispatch(addAppointment(appointment));
    console.log("Appt", appointment);
  };

  const deleteHandler = (appointment) => {
    dispatch(deleteAppointment(appointment._id));
    setDeleteModalVisible(false);
    dispatch(listAppointments());
  };

  //Pagination
  const indexOfLastResult = currentPage * resultPerPage;
  const indexOfFirstResult = indexOfLastResult - resultPerPage;
  const currentResult = filteredAppt.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < appointments.length / resultPerPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const appointmentListData = currentResult.map((appointment, i) => {
    return (
      <AppointmentList
        key={i}
        appt={appointment}
        openModal={openModal}
        openDeleteModal={openDeleteModal}
        deleteHandler={deleteHandler}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <PageHeader
        data={appointments}
        title="Appointments"
        openModal={openModal}
        search={search}
        setSearch={setSearch}
      />
      {currentResult.length === 0 ? (
        <h4>Search result : {currentResult.length}</h4>
      ) : (
        <div className="container mt-3">
          {search && <h4>Search result : {currentResult.length}</h4>}
          <table className="table table-responsive-lg">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Contact & Email</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Info</th>
              </tr>
            </thead>
            {appointmentListData}
          </table>
        </div>
      )}
      <PaginationButton
        PerPage={resultPerPage}
        total={appointments.length}
        paginate={paginate}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        perPageLength={currentResult.length}
      />
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="lg"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Add New Appointment" : "Update Appointment"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3">Patient Name</label>
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
                <label className="col-md-3">Email</label>
                <div className="col-md-9">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />{" "}
                  <small id="emailHelp" className="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
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
                <label className="col-md-3">Schedule Date & Time</label>
                <div className="col-md-9">
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="datetime"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Doctor Name</label>
                <div className="col-md-9">
                  <select
                    className="form-control"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                  >
                    {docts.map((doc, i) => {
                      return (
                        <option key={i} value={doc}>
                          {doc}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Patient Address</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">City</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">Zipcode</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3">I Would Like To (Select One)</label>
                <div className="col-md-9">
                  <select
                    className="form-control"
                    value={choose}
                    onChange={(e) => setChoose(e.target.value)}
                  >
                    <option>A New Patient Appointment</option>
                    <option>A Routine Checkup</option>
                    <option>A Comprehensive Health Exam</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 float-right"
              >
                {!id ? "Add Appointment" : "Update Appointment"}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}
      {appointments.map((appointment, i) => {
        return (
          <div key={i}>
            {deleteModalVisible && (
              <DeleteModal
                key={i}
                data={appointment}
                deleteHandler={deleteHandler}
                openDeleteModal={openDeleteModal}
                deleteModalVisible={deleteModalVisible}
                setDeleteModalVisible={setDeleteModalVisible}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppointmentListPage;
