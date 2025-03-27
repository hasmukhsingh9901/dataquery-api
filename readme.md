# SQL Query Assistant 🤖💬

## Overview

SQL Query Assistant is an intelligent backend service that transforms natural language questions into executable SQL queries using AI-powered conversion and provides additional query insights.

## 🌟 Features

- **Natural Language to SQL Conversion**
  - Convert plain English questions to SQL queries
  - Execute queries directly against your database
  - Supports complex query transformations

- **Query Explanation**
  - Get human-readable explanations of SQL queries
  - Understand query structure and intent

- **Query Validation**
  - Check SQL query validity
  - Receive detailed validation feedback

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **AI Integration**: Gemini AI
- **Validation**: Zod
- **Additional Libraries**: 
  - Axios
  - Helmet
  - Morgan
  - Cors

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL Database
- Gemini AI API Key

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sql-query-assistant.git
cd sql-query-assistant
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PORT=3306
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name

# AI Provider Configuration
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run the Application
```bash
# Development Mode
npm run dev

# Production Mode
npm start
```

## 🔍 Endpoints

### 1. Query Conversion Endpoint
- **URL**: `/query`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "question": "Show me all active customers"
  }
  ```
- **Response**:
  ```json
  {
    "sql": "SELECT * FROM customers WHERE status = 'active'",
    "result": [...],
    "metadata": {
      "rowCount": 10,
      "timestamp": "2024-03-28T12:34:56Z"
    }
  }
  ```

### 2. Query Explanation Endpoint
- **URL**: `/explain`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "question": "SELECT name FROM users WHERE age > 18"
  }
  ```
- **Response**:
  ```json
  {
    "question": "...",
    "explanation": "This query retrieves names of users older than 18...",
    "timestamp": "2024-03-28T12:34:56Z"
  }
  ```

### 3. Query Validation Endpoint
- **URL**: `/validate`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "question": "SELECT * FROM users"
  }
  ```
- **Response**:
  ```json
  {
    "valid": true,
    "query": "SELECT * FROM users",
    "message": "Valid MySQL query",
    "timestamp": "2024-03-28T12:34:56Z"
  }
  ```

## 🛡️ Security Features

- Rate Limiting
- CORS Configuration
- Environment-based Security
- Input Validation
- Error Handling



