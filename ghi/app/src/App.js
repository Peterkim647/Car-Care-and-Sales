import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';
import ServiceHistory from './ServiceHistory';
import ManufacturerList from './ManufacturerList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="manufacturers" element={<ManufacturerList />} />

          <Route path="technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>

          <Route path="appointments">
            <Route path="" element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
