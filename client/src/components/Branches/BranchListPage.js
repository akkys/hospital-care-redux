import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addBranch,
  deleteBranch,
  listBranches,
} from "../../actions/BranchAction";
import ErrorAlert from "../../misc/ErrorAlert";
import LoadingPage from "../Pages/LoadingPage";
import BranchList from "./BranchList";

const BranchListPage = () => {
  const [modalVisible, setModalVisible] = useState("");
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [helpLine, setHelpLine] = useState("");
  const [contact, setContact] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const branchList = useSelector((state) => state.branchList);
  const { loading, branches, error } = branchList;
  const branchAdd = useSelector((state) => state.branchAdd);
  const { success: successSave, error: errorSave } = branchAdd;
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Branches | A S K Hospitals";
    dispatch(listBranches());
  }, [dispatch]);
  console.log(branches);

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
      dispatch(listBranches());
    }
  }, [dispatch, successSave]);

  const openModal = (branch) => {
    if (branch._id) {
      setModalVisible(true);
      setId(branch._id);
      setAddress(branch.address);
      setEmail(branch.email);
      setContact(branch.contact);
      setHelpLine(branch.helpLine);
    } else {
      setModalVisible(true);
      setId();
      setAddress();
      setEmail();
      setContact();
      setHelpLine();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const branch = {
      _id: id,
      address,
      email,
      contact,
      helpLine,
    };
    dispatch(addBranch(branch));
  };

  const deleteHandler = (branch) => {
    dispatch(deleteBranch(branch._id));
    dispatch(listBranches());
  };

  const brachListData = branches.map((branch, i) => {
    return (
      <BranchList
        key={i}
        branch={branch}
        openModal={openModal}
        deleteHandler={deleteHandler}
        userInfo={userInfo}
      />
    );
  });

  return loading ? (
    <LoadingPage />
  ) : (
    <div className="home-container container">
      <div className="row">
        <div className="col-md-11">
          {branches.length === 0 ? (
            <div className="col-md-11 mb-3">
              <h4>No Branches Added!</h4>
            </div>
          ) : (
            <div className="col-md-11 mb-3">
              <h4>Braches List</h4>
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
      {modalVisible && (
        <Modal
          show={modalVisible}
          onHide={() => setModalVisible(false)}
          size="md"
          className="modal-container"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>{!id ? "Add Brach" : "Update Brach"}</h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              {errorSave && <ErrorAlert message={errorSave} />}
              <div className="form-group row">
                <label className="col-md-3">Address</label>
                <div className="col-md-9">
                  <textarea
                    type="text"
                    rows="3"
                    className="form-control"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                <label className="col-md-3">HelpLine Number</label>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    name="helpLine"
                    value={helpLine}
                    onChange={(e) => setHelpLine(e.target.value)}
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
      <div className="row">{brachListData}</div>
    </div>
  );
};

export default BranchListPage;
