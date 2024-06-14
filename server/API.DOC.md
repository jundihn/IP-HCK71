# Learn The Agent

list of available endpoints:

- `POST /register`
- `POST /Login`

- `GET /user`
- `GET /cars`
- `GET /wishList`

- `POST /transaction`
- `POST /payment`
- `POST /wishList/:id`

- `PUT /edit_profile`
- `DELETE /delete_account`

&nbsp;

## 1. POST /register

Description:

- Register user

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": 2,
  "username": "user2",
  "email": "user2@gmail.com"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Username is required!"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password minimum length is 5 characters!"
}

```

&nbsp;

## 2. POST /login

Description:

- Login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "<token>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
OR
{
  "message": "Email is Required!"
}
OR
{
  "message": "Password is Required!"
}
```

&nbsp;

## 3. GET /user

Description:

- Fetch user data.

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "message": "User",
  "user": {
    "id": 2,
    "username": "percobaan",
    "email": "percobaan@gmail.com",
    "password": "$2a$10$4smKq2XM2F4cCno2KisbfeiQqjl8BPJ8h3iXlgzgPeGGLoDy7ct.G",
    "createdAt": "2024-06-13T08:58:36.381Z",
    "updatedAt": "2024-06-13T08:58:36.381Z"
  }
}
```

&nbsp;

## 4. GET /cars

Description:

- Get list cars.

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

- body:

```json
{
  "name": "string",
  "model": "string",
  "year": "number",
  "type": "string"
}
```

_Response (200 - Created)_

```json
{
  "message": "List Car",
  "cars": [
    {
      "id": 1,
      "name": "Buick",
      "model": "Enclave",
      "year": 2008,
      "type": "SUV",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 2,
      "name": "MINI",
      "model": "Convertible",
      "year": 2006,
      "type": "Convertible",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 3,
      "name": "Volvo",
      "model": "XC90",
      "year": 2019,
      "type": "SUV",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 4,
      "name": "Ford",
      "model": "Taurus",
      "year": 1999,
      "type": "Sedan, Wagon",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 5,
      "name": "Volvo",
      "model": "XC60",
      "year": 2020,
      "type": "SUV",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 6,
      "name": "HUMMER",
      "model": "H2",
      "year": 2006,
      "type": "SUV, Pickup",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 7,
      "name": "GMC",
      "model": "Sierra 1500 Crew Cab",
      "year": 2016,
      "type": "Pickup",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 8,
      "name": "GMC",
      "model": "Canyon Crew Cab",
      "year": 2008,
      "type": "Pickup",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 9,
      "name": "Subaru",
      "model": "Outback",
      "year": 2016,
      "type": "SUV",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 10,
      "name": "Mitsubishi",
      "model": "Outlander",
      "year": 2010,
      "type": "SUV",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    }
  ]
}
```

&nbsp;

## 5. PUT /edit_profile

Description:

- Updated profile

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "Integer"
}
```

- body:

```json
{
  {
  "username": "string",
  "email": "string",
}
}
```

_Response (200 - OK)_

````json
{
    {
    "message": "User updated",
    "updatedUser": {
        "id": 2,
        "username": "testing",
        "email": "testing@gmail.com",
        "password": "user4",
        "createdAt": "2024-06-13T08:58:36.381Z",
        "updatedAt": "2024-06-13T11:36:27.461Z"
    }
}
```


_Response (404 - Not Found)_

```json
{
  "message": "Data not found"
}
````

&nbsp;

## 6. DELETE /delete_account

Description:

- Delete account

Request:

- headers:

```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_

```json
{
  "message": "youre gone"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 3. GET /wishList

Description:

- Fetch wishList data.

Request:

- headers:

```json
{
  "authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
  "wishlist": [
    {
      "id": 2,
      "name": "MINI",
      "model": "Convertible",
      "year": 2006,
      "type": "Convertible",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    },
    {
      "id": 3,
      "name": "Volvo",
      "model": "XC90",
      "year": 2019,
      "type": "SUV",
      "createdAt": "2024-06-13T03:36:33.341Z",
      "updatedAt": "2024-06-13T03:36:33.341Z"
    }
  ]
}
```

&nbsp;

## Global Errror

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
