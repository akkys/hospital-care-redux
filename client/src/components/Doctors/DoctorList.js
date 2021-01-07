import React from "react";
import img from "../../img/doc.png";

const DoctorList = (props) => {
  const { docs, userInfo, openModal, deleteHandler } = props;
  return (
    <>
      <div className="col-md-6 mb-3 mt-3 card-container">
        <div className="row no-gutters">
          <div className="col-md-3">
            <img src={img} className="card-img" alt="..." />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h4 className="card-title">
                {docs.name}{" "}
                {userInfo && (
                  <i
                    onClick={() => openModal(docs)}
                    className="fa fa-pencil-square-o float-right text-success"
                  />
                )}
              </h4>
              <p className="card-text">Experience : {docs.exp} Year(s)</p>
              <h5 className="card-title">Specialist in : {docs.expert}</h5>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h6>Available at : {docs.available}</h6>
          <h6>
            Duty Timings: {docs.time}
            {""} Hrs.
          </h6>
          <h6>Contact : {docs.contact}</h6>
          <p className="card-text">About: {docs.desc}</p>
          {userInfo && (
            <i
              onClick={() => deleteHandler(docs)}
              className="fa fa-trash fa-lg float-right text-danger"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorList;
