# Update Issue API

## Endpoint
```
PUT /api/issues/update/:issueId
```

## Authentication
Required - Include `authtoken` header

## Headers
```
authtoken: <your_jwt_token>
Content-Type: application/json
```

## URL Parameters
- `issueId` (required) - The unique identifier of the issue to update

## Request Body

All fields are optional, but at least one must be provided:
- `title` (string, optional) - Update the issue title
- `description` (string, optional) - Update the issue description (can be set to empty string to clear)
- `status` (string, optional) - Update the issue status. Must be one of: `"pending"`, `"in_progress"`, `"completed"`

**Example Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in_progress"
}
```

## Response

### Success (200 OK)
```json
{
  "success": true,
  "message": "Issue with ID issue_123456789 updated successfully",
  "data": {
    "issueId": "issue_123456789",
    "issueOwner": "user_789012",
    "title": "Updated title",
    "description": "Updated description",
    "status": "in_progress",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-20T14:22:00.000Z"
  }
}
```

### Error Responses

**400 Bad Request - Missing Issue ID:**
```json
{
  "success": false,
  "message": "Issue ID is required"
}
```

**400 Bad Request - No Fields Provided:**
```json
{
  "success": false,
  "message": "At least one field (title, description, or status) must be provided for update"
}
```

**400 Bad Request - Invalid Status:**
```json
{
  "success": false,
  "message": "Status must be one of: pending, in_progress, completed"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "User authentication required"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "message": "Issue with ID issue_123456789 not found or you don't have permission to update it"
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

## Example Requests

### cURL
```bash
curl -X PUT http://localhost:5000/api/issues/update/issue_123456789 \
  -H "authtoken: your_jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "status": "in_progress"
  }'
```

### JavaScript/Fetch
```javascript
const response = await fetch('http://localhost:5000/api/issues/update/issue_123456789', {
  method: 'PUT',
  headers: {
    'authtoken': 'your_jwt_token_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Updated title',
    status: 'in_progress'
  })
});

const data = await response.json();
```

### Using apiRequest utility
```javascript
import { apiRequest } from '../api/client';

const updatedIssue = await apiRequest('/api/issues/update/issue_123456789', {
  method: 'PUT',
  withAuth: true,
  body: {
    title: 'Updated title',
    status: 'in_progress'
  }
});
```

## Notes
- You can only update issues that belong to you (issues where you are the owner)
- Partial updates are supported - you can update just one field or multiple fields
- The `updated_at` timestamp is automatically updated when an issue is modified
- Setting `description` to an empty string will clear the description (set it to null)

