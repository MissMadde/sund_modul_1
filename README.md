# Swedish Political Parties API

## API Routes Overview

| Method | Route | Request Body | Description & Expected Return | Expected Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | /parties | *None* | Returns a list of all political parties (JSON array). | 200 OK |
| `POST` | /parties | { "name": string, "leader": string, "seats"?: number } | Adds a new party and returns a success message with the created party object (`seats` defaults to `0` if omitted). | 201 Created (Success)<br>400 Bad Request (Missing `name` or `leader`) |
| `PUT` | /parties/:id | { "name"?: string, "leader"?: string } | Updates an existing party's `name` and/or `leader` by ID and returns a confirmation message with the updated party. | 200 OK (Success)<br>404 Not Found (Invalid ID) |
| `DELETE` | /parties/:id | *None* | Deletes a party by ID and returns a confirmation message including the deleted party's name. | 200 OK (Success)<br>404 Not Found (Invalid ID) |

---

## Insomnia Screenshots

- **GET `/parties` (Success)**  
  ![Screenshot for GET /parties](images/img_getSuccess.png)

- **POST `/parties` (Success - 201 Created)**  
  ![Screenshot for POST /parties success](images/img_postSuccess.png)

- **POST `/parties` (Error - 400 Bad Request)**  
  ![Screenshot for POST /parties 400 error](images/img_postError.png)

- **PUT `/parties/:id` (Success - 200 OK)**  
  ![Screenshot for PUT /parties success](images/img_putSuccess.png)

- **PUT `/parties/:id` (Error - 404 Not Found)**  
  ![Screenshot for PUT /parties 404 error](images/img_putError.png)

- **DELETE `/parties/:id` (Success - 200 OK)**  
  ![Screenshot for DELETE /parties success](images/img_deleteSuccess.png)

- **DELETE `/parties/:id` (Error - 404 Not Found)**  
  ![Screenshot for DELETE /parties 404 error](images/img_deleteError.png)


  **Seats not included in post (TASK 6)**
  ![Screenshot for POST](images/img_postNoSeats.png)
