## How to start the server
node server.js
add MONGODB_URL and PORT to .env file

## API Endpoint

POST `http://localhost:5000/api/student`

### Request Body Example

```json
{
  "name": "JDoe",
  "age": 20,
  "gender": "Male",
  "marks": {
    "physics": {"obtained": 85, "total": 100},
    "chemistry": {"obtained": 90,"total":  100},
    "maths": {"obtained":75,"total":  100}
  }
}
```

## API Endpoint

POST `http://localhost:5000/api/student2`

```json
{
  "first_name": "J",
  "last_name": "Doe",
  "years_old": 20,
  "gender": "Male",
  "scores": {
    "physics": {"obtained": 85, "total": 100},
    "chemistry": {"obtained": 90,"total":  100},
    "maths": {"obtained":75,"total":  100}
  }
}
```

## API Endpoint

GET `http://localhost:5000/api/studentData`