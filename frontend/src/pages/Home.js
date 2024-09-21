import React from 'react';
import "../css/Home.css";
import MyChart from '../components/MyChart';

const Home = () => {
    // data array 
 const data = [
  {
    "id": 340981,
    "insurance_validity_date" : "2025-03-22",  // New Date 1
    "alert_type": "LowCharge",
    "vehicle_id": "AB93EF6RFPB545339",
    "message": "Low Battery",
    "value": "9%",
    "status": "resolved",
    "created_at": "2024-09-04 18:15:02.595 +0530",
    "updated_at": "2024-09-04 18:51:04.894 +0530",
    "isCritical": true
  },
  {
    "id": 340982,
    "insurance_validity_date" : "2024-10-10",  // New Date 2
    "alert_type": "LowCharge",
    "vehicle_id": "AB93EF6RFPB545340",
    "message": "High Battery",
    "value": "100%",
    "status": "resolved",
    "created_at": "2024-09-04 18:15:02.595 +0530",
    "updated_at": "2024-09-04 18:51:04.894 +0530",
    "isCritical": true
  },
  {
    "id": 340983,
    "insurance_validity_date" : "2023-12-01",  // New Date 3
    "alert_type": "LowCharge",
    "vehicle_id": "AB93EF6RFPB545341",
    "message": "Low Battery",
    "value": "9%",
    "status": "resolved",
    "created_at": "2024-09-04 18:15:02.595 +0530",
    "updated_at": "2024-09-04 18:51:04.894 +0530",
    "isCritical": true
  },
  {
    "id": 340984,
    "insurance_validity_date" : "2024-09-25",  // New Date 4
    "alert_type": "LowCharge",
    "vehicle_id": "AB93EF6RFPB545342",
    "message": "Low Battery",
    "value": "9%",
    "status": "resolved",
    "created_at": "2024-09-04 18:15:02.595 +0530",
    "updated_at": "2024-09-04 18:51:04.894 +0530",
    "isCritical": true
  },
  {
    "id": 340985,
    "insurance_validity_date" : "2024-11-15",  // New Date 5
    "alert_type": "LowCharge",
    "vehicle_id": "AB93EF6RFPB545343",
    "message": "Low Battery",
    "value": "9%",
    "status": "resolved",
    "created_at": "2024-09-04 18:15:02.595 +0530",
    "updated_at": "2024-09-04 18:51:04.894 +0530",
    "isCritical": true
  },
];


    // Grouping data into Low and High battery
    const lowBatteryCount = data.filter(item => parseFloat(item.value) < 10).length;
    const highBatteryCount = data.filter(item => parseFloat(item.value) >= 10).length;

    // Defining x and y labels for the chart
    const xlabelsArrayBattery = ["Below Critical Battery", "Below Critical Battery"];
    const ylabelsArrayBattery = [lowBatteryCount, highBatteryCount];


const currentDate = new Date();

// Categorizing vehicles based on insurance validity
const expireIn30DaysCount = data.filter(item => {
    const insuranceDate = new Date(item.insurance_validity_date);
    const daysDifference = (insuranceDate - currentDate) / (1000 * 60 * 60 * 24); // convert milliseconds to days
    return daysDifference <= 30 && daysDifference > 0;
}).length;

const validInsuranceCount = data.filter(item => {
    const insuranceDate = new Date(item.insurance_validity_date);
    const daysDifference = (insuranceDate - currentDate) / (1000 * 60 * 60 * 24);
    return daysDifference > 30;
}).length;

const expiredInsuranceCount = data.filter(item => {
    const insuranceDate = new Date(item.insurance_validity_date);
    const daysDifference = (insuranceDate - currentDate) / (1000 * 60 * 60 * 24);
    return daysDifference < 0;
}).length;

// X labels for the chart
const xlabelsArrayInsurance = ["Expire in 30 Days", "Valid Insurance", "Expired Insurance"];

// Y labels for the chart (counts)
const ylabelsArrayInsurance = [expireIn30DaysCount, validInsuranceCount, expiredInsuranceCount];





    return (
        <div id="homeBg">
            <div className="row d-flex justify-content-center">
                <div className="col-md-4">
                    <MyChart xlabels={xlabelsArrayBattery} ylabels={ylabelsArrayBattery} title="Battery Status" />
                </div>
                <div className="col-md-4">
                    <MyChart xlabels={xlabelsArrayInsurance} ylabels={ylabelsArrayInsurance} title="Insurance Status" />
                </div>
            </div>
        </div>
    );
}

export default Home;