# SIMPLE FLASK APP

## 1. Project Overview

This is a simple python-based flask application that demonstrates the following deliverables:

- Backend and Database development
- Role Based Access Control

## 2. Contents

1. [Project overview](#1-project-overview)
2. [Contents](#2-contents)
3. [Backend and database deployment](#3-backend-and-database-developement)
4. [RBAC](#4-role-based-access-control-authentication-and-security-headers)
5. [API Documentation](#5-api-documentation)
6. [Frontend development](#6-frontend-development)
7. [Deployment](#7-deployment)

## 3. Backend and Database developement

Backend-side for this application is developed using flask to provide access routes, while adopting mongodb, a noSQL database, to support functionality of model-control-view (MVC). 
<img width="890" alt="Screen Shot 2023-11-03 at 00 34 35" src="https://github.com/RevoU-FSSE-2/week-18-gkorompis/assets/52250424/f9b549ad-e71e-4905-ad7f-73e011a9c190">

## 4. Role Based Access Control, Authentication, and Security Headers

### RBAC

| Role   | Collection                | Allowed Methods               |
|--------|---------------------------|------------------------------|
| admin  | users, jobs, resetpasses  | get, post, put, delete       |
| member | users, jobs, resetpasses  | get, post (self)             |

### Authentication and Security Headers
| Middleware          | Routes                                   | Functionality                               |
|---------------------|------------------------------------------|---------------------------------------------|
| authenticateLogin  | `/login`                                 | Authenticate login credentials                |
| setXRequestIdHeader | `/login, /users, /jobs, /resetPass`     | Assign an ID to every request header         |
| permitRole          | `/users, /jobs`                          | Ensure Role-Based Access Control (RBAC)      |
| securedHeader       | global                                   | Ensure security by attaching necessary headers |

## 5. API Documentation

Complete documentation of the API can be found in this swagger documentation

click link for wagger documentation:

## 6. Frontend Development

Client-side for this application is using reactjs typescript template. This architecture is also using redux framework to promote functionality of exchaning states across components. Errors will be handles by MUI snackbars. 

## 7. Deployment 

### Client-side:

- The client-side is deployed on AWS S3 resource.

### Server-side:

- The [server-side]() is deployed using AWS services:
  - **API Gateway**: AWS API Gateway is used to manage and expose the API.
  - **AWS Lambda**: AWS Lambda functions are used to host the server-side code.