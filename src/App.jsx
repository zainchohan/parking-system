import { useState } from 'react';
import { Container, Form, Button, Table, Alert, Card, Row, Col } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai'; // Importing delete icon from React Icons
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [parkedVehicles, setParkedVehicles] = useState([]);
  const [licensePlate, setLicensePlate] = useState('');
  const [filter, setFilter] = useState('');

  const parkingSpots = 10;

  const parkVehicle = () => {
    if (parkedVehicles.length >= parkingSpots) {
      alert('No parking spots available!');
      return;
    }

    if (licensePlate === '') {
      alert('Please enter a license plate number.');
      return;
    }

    const newVehicle = {
      licensePlate,
      spot: parkedVehicles.length + 1,
      timeParked: new Date(),
    };

    setParkedVehicles([...parkedVehicles, newVehicle]);
    setLicensePlate('');
  };

  const removeVehicle = (spot) => {
    const updatedVehicles = parkedVehicles.filter((vehicle) => vehicle.spot !== spot);
    setParkedVehicles(updatedVehicles);
  };

  const calculateTimeParked = (timeParked) => {
    const now = new Date();
    const diff = Math.floor((now - new Date(timeParked)) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const filteredVehicles = parkedVehicles.filter((vehicle) =>
    vehicle.licensePlate.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Parking Management System</h3>

      {/* Row for input form and parked vehicles */}
      <Row className="g-4">
        {/* Input form column */}
        <Col md={6} xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Form>
                <Form.Group controlId="formLicensePlate">
                  <Form.Label>License Plate Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter license plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    aria-label="License Plate Number"
                    required
                  />
                </Form.Group>
                <Button
                  variant="success"
                  onClick={parkVehicle}
                  className="w-100 mt-3"
                  disabled={!licensePlate}
                >
                  Park Vehicle
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Parked vehicles column */}
        <Col md={6} xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              {/* Filter vehicles form */}
              <Form className="mb-4">
                <Form.Group controlId="formFilter">
                  <Form.Label>Filter by License Plate</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Search vehicles..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    aria-label="Filter by License Plate"
                  />
                </Form.Group>
              </Form>

              {/* Parked vehicles list displayed in table form */}
              {filteredVehicles.length === 0 ? (
                <Alert variant="info">No vehicles parked yet.</Alert>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Parking Spot</th>
                      <th>License Plate</th>
                      <th>Time Parked</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVehicles.map((vehicle) => (
                      <tr key={vehicle.spot}>
                        <td>Spot {vehicle.spot}</td>
                        <td>{vehicle.licensePlate}</td>
                        <td>{calculateTimeParked(vehicle.timeParked)}</td>
                        <td>
                          <Button
                            variant="light"
                            onClick={() => removeVehicle(vehicle.spot)}
                            className="text-danger rounded-pill d-flex align-items-center"
                            style={{ backgroundColor: '#F8D7DA' }} // Light red background
                          >
                            <AiOutlineDelete className="me-2" /> Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              {/* Message when the parking lot is full */}
              {parkedVehicles.length >= parkingSpots && (
                <Alert variant="danger" className="mt-4 text-center">No spots available!</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
