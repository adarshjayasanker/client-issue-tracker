# Client Issue Tracker

A role-based customer support workflow system that allows businesses to receive, manage, and resolve customer issues
through a structured ticket lifecycle.

## Features

- User authentication (JWT based)
- Ticket creation & Tracking
- Role-based access (User/Admin)
- status workflow (Open -> In Progress -> Resolved -> Closed)
- Ticket conversation thread

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Authentication: JWT

## Architecture

Monorepo structure: 
- /client -> React environment
- /server -> Express API

## Purpose

This project demonstrates backend authentication, authorization, and workflow state management in a real-world business
scenario.