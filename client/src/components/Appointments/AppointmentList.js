import React from "react";

const AppointmentList = (props) => {
  const { appt, openModal, openDeleteModal } = props;

  const currTime = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const time = new Date(appt.datetime).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <tbody>
      <tr className="table-active">
        <td>
          <i
            onClick={() => openModal(appt)}
            className="fa fa-square-o"
            style={{ cursor: "pointer" }}
          />
        </td>
        <td className="">{time}</td>
        <td
          onClick={() => openModal(appt)}
          style={{ color: "green", cursor: "pointer" }}
        >
          {appt.name}
        </td>
        <td>
          <span>{appt.contact}</span>
          <br />
          {appt.email ? <span>{appt.email}</span> : <span>Not Mentioned</span>}
          {/* <span>{appt.email}</span> */}
        </td>
        <td>
          {appt.address}, {appt.city}
        </td>
        <td>{appt.docName}</td>

        <td>{appt.choose}</td>
        {time >= currTime ? (
          <td className="">Pending</td>
        ) : (
          <td className="text-danger">Completed / Expired</td>
        )}
        <td style={{ cursor: "pointer", textAlign: "center" }}>
          <small
            onClick={() => openDeleteModal(appt._id)}
            className="text-danger"
          >
            <i className="fa fa-times fa-lg" />
          </small>
        </td>
      </tr>
    </tbody>
  );
};

export default AppointmentList;
