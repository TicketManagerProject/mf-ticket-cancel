import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

const InfoUser = () => {
  const [validated, setValidated] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [appointments, setAppointments] = useState([]); // Array para almacenar los resultados
  const [success, setSuccess] = useState(false); // Estado para mensaje de éxito

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      // Almacenar los valores en el array
      const newAppointment = {
        room: selectedRoom,
        dateTime: dateTime,
      };
      setAppointments([...appointments, newAppointment]);

      // Resetear el formulario y los estados
      setSelectedRoom("");
      setDateTime("");
      setValidated(false);
      setSuccess(true); // Mostrar mensaje de éxito

      console.log("New Appointment:", newAppointment);
      console.log("All Appointments:", appointments);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        style={{
          width: "45rem",
          backgroundColor: "#ECEBF4",
          borderRadius: "20px",
        }}
      >
        <Card.Body>
          <Card.Title
            className="text-center"
            style={{
              color: "#23294B",
              fontSize: "35px",
              fontWeight: "800",
              marginTop: "30px",
            }}
          >
            Appointment cancellation
          </Card.Title>
          <div style={{ margin: "10px" }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalAddress"
              >
                <Form.Label
                  column
                  sm={4}
                  style={{ color: "#23294B", fontWeight: "bold" }}
                >
                  Date and time *
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    required
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="form-control"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Invalid Date and time.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
              
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#23294B",
                    fontWeight: "bold",
                    width: "200px",
                    marginTop: "10px",
                  }}
                >
                  Search
                </Button>
              </div>
              {/*Mensaje */}
              {success && (
                <div className="text-center mt-3" style={{ color: "green" }}>
                  Appointment created successfully!
                  <div>Ticket Number: {appointments[appointments.length - 1].room}</div>
                  <div>Date: {new Date(appointments[appointments.length - 1].dateTime).toLocaleDateString()}</div>
                  <div>Time: {new Date(appointments[appointments.length - 1].dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  {/* Add the location based on the room */}
                  <div>Location: {appointments[appointments.length - 1].room === "room1" ? "Office10" : "Office14"}</div>
                </div>
              )}
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default InfoUser
