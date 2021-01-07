import React from "react";

const PatientList = (props) => {
  const { patient, openModal, deleteHandler } = props;
  console.log(patient);

  const admitDate = new Date(patient.admitDate).toLocaleString();
  return (
    <tbody>
      <tr>
        {" "}
        <td>
          <i
            onClick={() => openModal(patient)}
            className="fa fa-square-o"
            style={{ cursor: "pointer" }}
          />
        </td>
        <td>{patient.pid}</td>
        <td>{patient.name}</td>
        <td>{admitDate}</td>
        <td>{patient.roomNum}</td>
        <td>{patient.roomType}</td>
        <td>{patient.age}</td>
        <td>{patient.gender}</td>
        <td>{patient.address}</td>
        <td>{patient.contact}</td>
        {patient.status === "Discharged" ? (
          <td className="text-danger">{patient.status}</td>
        ) : (
          <td className="text-success">{patient.status}</td>
        )}
        {/* <td>{patient.status}</td> */}
        <td>
          <i
            onClick={() => deleteHandler(patient)}
            className="fa fa-times fa-lg text-danger"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default PatientList;
