import React from "react";

const WardList = (props) => {
  const { ward, openModal, userInfo, deleteHandler } = props;
  return (
    <div className="col-md-6 mb-3 mt-3 ward-container">
      <div
        className="card border-primary text-dark bg-light mb-3 "
        style={{ height: "280px" }}
      >
        <div
          className="card-header"
          style={{ backgroundColor: "rgb(223, 219, 219)" }}
        >
          {userInfo ? (
            <h4 onClick={() => openModal(ward)} style={{ cursor: "pointer" }}>
              {ward.roomType}
              <h5 className="float-right">{ward.price}/- per Day </h5>
            </h4>
          ) : (
            <h4>
              {ward.roomType}
              <h5 className="float-right">{ward.price}/- per Day </h5>
            </h4>
          )}
        </div>
        <div className="card-body">
          <h5 className="text-secondary">
            <h5>
              Description :
              {userInfo && (
                <i
                  onClick={() => deleteHandler(ward)}
                  className="fa fa-trash fa-lg float-right text-danger"
                />
              )}
            </h5>
            <span>{ward.desc}</span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default WardList;
