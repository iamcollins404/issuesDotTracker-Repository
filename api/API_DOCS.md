# API Documentation

## Base URL
```
http://localhost:5000
```

## Authentication

All protected endpoints require an authentication token to be sent in the request headers.

**Header Required:**
```
authtoken: <your_jwt_token>
```

The token is obtained from the sign-in endpoint and should be included in all authenticated requests.

---

## Dashboard Stats API

### Get Dashboard Statistics

Retrieves dashboard statistics including total issues count, issues grouped by status, and the 5 most recent issues for the authenticated user.

**Endpoint:** `GET /api/dashboard/stats`

**Authentication:** Required

**Headers:**
```
authtoken: <your_jwt_token>
```

**Response:**

**Success (200 OK):**
```json
{
  "success": true,
  "message": "Dashboard stats retrieved successfully",
  "data": {
    "totalIssues": 128,
    "pending": 54,
    "inProgress": 38,
    "completed": 36,
    "recentIssues": [
      {
        "issueId": "issue_123456",
        "issueOwner": "user_789012",
        "title": "Fix authentication bug",
        "description": "Users are unable to log in with email verification",
        "status": "pending",
        "created_at": "2024-01-15T10:30:00.000Z",
        "updated_at": "2024-01-20T14:22:00.000Z"
      },
      {
        "issueId": "issue_123457",
        "issueOwner": "user_789012",
        "title": "Implement dark mode",
        "description": "Add dark mode toggle to settings",
        "status": "in_progress",
        "created_at": "2024-01-14T09:15:00.000Z",
        "updated_at": "2024-01-19T16:45:00.000Z"
      }
      // ... up to 5 most recent issues
    ]
  }
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "User authentication required"
}
```

**401 Unauthorized (Invalid Token):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details here"
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
| `message` | string | Human-readable message |
| `data.totalIssues` | number | Total number of issues for the authenticated user |
| `data.pending` | number | Count of issues with "pending" status |
| `data.inProgress` | number | Count of issues with "in_progress" status |
| `data.completed` | number | Count of issues with "completed" status |
| `data.recentIssues` | array | Array of the 5 most recently created issues (ordered by created_at DESC) |

**Issue Object Structure:**

| Field | Type | Description |
|-------|------|-------------|
| `issueId` | string | Unique identifier for the issue |
| `issueOwner` | string | User ID of the issue owner |
| `title` | string | Title of the issue |
| `description` | string \| null | Description of the issue (optional) |
| `status` | string | Status of the issue: "pending", "in_progress", or "completed" |
| `created_at` | string (ISO 8601) | Timestamp when the issue was created |
| `updated_at` | string (ISO 8601) | Timestamp when the issue was last updated |

**Example Request:**

```bash
curl -X GET http://localhost:5000/api/dashboard/stats \
  -H "authtoken: your_jwt_token_here" \
  -H "Content-Type: application/json"
```

**Example with JavaScript/Fetch:**

```javascript
const response = await fetch('http://localhost:5000/api/dashboard/stats', {
  method: 'GET',
  headers: {
    'authtoken': 'your_jwt_token_here',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
```

---

## Issues API

### Get All Issues

Retrieves all issues that belong to the authenticated user. Issues are returned sorted by creation date in descending order (newest first).

**Endpoint:** `GET /api/issues`

**Authentication:** Required

**Headers:**
```
authtoken: <your_jwt_token>
```

**Response:**

**Success (200 OK):**
```json
{
  "success": true,
  "message": "Issues retrieved successfully",
  "data": [
    {
      "issueId": "issue_123456",
      "issueOwner": "user_789012",
      "title": "Fix authentication bug",
      "description": "Users are unable to log in with email verification",
      "status": "pending",
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-20T14:22:00.000Z"
    },
    {
      "issueId": "issue_123457",
      "issueOwner": "user_789012",
      "title": "Implement dark mode",
      "description": "Add dark mode toggle to settings",
      "status": "in_progress",
      "created_at": "2024-01-14T09:15:00.000Z",
      "updated_at": "2024-01-19T16:45:00.000Z"
    }
    // ... all issues for the authenticated user
  ],
  "count": 128
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "User authentication required"
}
```

**401 Unauthorized (Invalid Token):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details here"
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
| `message` | string | Human-readable message |
| `data` | array | Array of issue objects belonging to the authenticated user |
| `count` | number | Total number of issues returned |

**Issue Object Structure:**

| Field | Type | Description |
|-------|------|-------------|
| `issueId` | string | Unique identifier for the issue (varchar, max 50 chars) |
| `issueOwner` | string | User ID of the issue owner (matches authenticated user) |
| `title` | string | Title of the issue (varchar, max 255 chars) |
| `description` | string \| null | Description of the issue (optional text field) |
| `status` | string | Status of the issue. Possible values: `"pending"`, `"in_progress"`, `"completed"`. Default is `"pending"` |
| `created_at` | string (ISO 8601) | Timestamp when the issue was created |
| `updated_at` | string (ISO 8601) | Timestamp when the issue was last updated |

**Issue Status Values:**

- `pending` - Issue is pending and has not been started
- `in_progress` - Issue is currently being worked on
- `completed` - Issue has been completed

**Sorting:**

Issues are automatically sorted by `created_at` in **descending order** (newest first). The most recently created issues will appear first in the array.

**Notes:**

- Only issues belonging to the authenticated user are returned
- If the user has no issues, the `data` array will be empty and `count` will be 0
- All timestamps are in ISO 8601 format (UTC)

**Example Request:**

```bash
curl -X GET http://localhost:5000/api/issues \
  -H "authtoken: your_jwt_token_here" \
  -H "Content-Type: application/json"
```

**Example with JavaScript/Fetch:**

```javascript
const response = await fetch('http://localhost:5000/api/issues', {
  method: 'GET',
  headers: {
    'authtoken': 'your_jwt_token_here',
    'Content-Type': 'application/json'
  }
});

const result = await response.json();

if (result.success) {
  console.log(`Total issues: ${result.count}`);
  result.data.forEach(issue => {
    console.log(`- ${issue.title} (${issue.status})`);
  });
}
```

**Example with React/Redux:**

```javascript
// Using the apiRequest utility with Redux token
import { apiRequest } from '../api/client';

const fetchIssues = async () => {
  try {
    const response = await apiRequest('/api/issues', {
      method: 'GET',
      withAuth: true  // Automatically adds token from localStorage
    });
    
    return response.data;
  } catch (error) {
    console.error('Failed to fetch issues:', error);
    throw error;
  }
};
```

---

## Common Error Responses

### 400 Bad Request
Returned when request parameters are invalid or missing.

### 401 Unauthorized
Returned when:
- No authentication token is provided
- The authentication token is invalid or expired
- The user is not authenticated

### 500 Internal Server Error
Returned when an unexpected server error occurs. Check the `error` field in the response for details.

---

## Rate Limiting

Currently, there are no rate limits imposed on these endpoints. However, best practices should be followed:
- Cache responses on the client side when appropriate
- Avoid making excessive requests in short time periods

---

## Support

For issues or questions, please contact the development team or refer to the project repository.

