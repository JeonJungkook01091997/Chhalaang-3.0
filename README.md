
# Alt Mobility - Scalable Real-Time Vehicle Alert System

Welcome to the repository for **Chhalang 3.0's** Alt Mobility challenge. The goal of this project is to design and build a **Scalable Real-Time Vehicle Alert System** capable of processing alerts from a large fleet of vehicles with high efficiency.


## Project Overview
In the **Alt Mobility challenge**, the task is to develop a **scalable real-time vehicle alert system**. The system will ingest and process real-time data from a fleet of vehicles and generate alerts based on various criteria such as battery performance, driving modes, location, and other telemetry data.

## Problem Statement
The challenge is to build a system that can:
- Handle up to **1000 alerts per second** from the fleet.
- Distinguish between **critical** and **non-critical** alerts.
- Ensure real-time performance, scalability, and reliability.
- Enable monitoring of alerts through a user-friendly interface or dashboard.

## System Architecture
The system design leverages the following core principles:
- **Real-time data ingestion**: Efficiently handle high-velocity data from vehicle telemetry.
- **Alert generation engine**: Categorizes alerts based on severity (e.g., critical, warning) and predefined rules.
- **Scalability**: Designed to process up to 1000 alerts per second using horizontally scalable architecture.
- **Alert prioritization**: Immediate attention to critical alerts while managing non-critical alerts for further action.
  
### High-Level Components
1. **Data Ingestion Layer**: Captures vehicle data in real-time from sensors.
2. **Processing Engine**: Applies business logic to generate alerts.
3. **Alert Queue**: Prioritizes and queues alerts for distribution.
4. **Notification System**: Delivers alerts to the end-users or admin dashboard.
5. **Dashboard**: (Optional) Real-time visualization of alerts and fleet status.

## Features
- **Real-time processing** of vehicle telemetry data.
- **Scalable** architecture to handle large-scale fleets.
- **Configurable alert rules**: Modify thresholds for generating critical or non-critical alerts.
- **Fault-tolerant** design ensuring reliable alert generation even in case of failures.
- **Extendable**: The system can be easily expanded to include more alert types or data sources.
