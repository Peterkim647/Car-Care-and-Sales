import './index.css';
import React, { useState, useEffect } from 'react';

export default function AppointmentList() {

    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const url = "http://localhost:8080/api/appointments/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const createdAppointments = data.appointments.filter(appointment => appointment.status === "created");
            setAppointments(createdAppointments);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const cancelAppointment = async (id) => {
        const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({ status: "canceled" }),
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(cancelUrl, fetchConfig);
        if (response.ok) {
            fetchData();
        };

    }

    const finishAppointment = async (id) => {
        const finishUrl = `http://localhost:8080/api/appointments/${id}/finish/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({ status: 'finished' }),
            headers: {
                "Content-Type": "application/json"
            },
        };
        const response = await fetch(finishUrl, fetchConfig);
        if (response.ok) {
            fetchData();
        };

    }

    return (
        <>
            <h1 className="mb-3 mt-3">Service Appointments</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        const vip = appointment.vip === true ? "Yes" : "No";
                        const date = new Date(appointment.date_time).toLocaleDateString();
                        const time = new Date(appointment.date_time).toLocaleTimeString('en-US', { timeZone: 'UTC', hour: "2-digit", minute: "2-digit"});
                        const technicianName = `${appointment.technician.first_name} ${appointment.technician.last_name}`;

                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{vip}</td>
                                <td>{appointment.customer}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                                <td>{technicianName}</td>
                                <td>{appointment.reason}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                                    <button className="btn btn-success" onClick={() => finishAppointment(appointment.id)}>Finish</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    )

}
