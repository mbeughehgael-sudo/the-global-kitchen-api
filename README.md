# The Global Kitchen API

A RESTful API for managing a digital cookbook, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js v18+
- **Framework:** Express.js v5
- **Database:** MongoDB with Mongoose ODM
- **Configuration:** dotenv

## Features

- Full CRUD operations on recipes
- Category-based filtering
- Schema-level validation (required fields, enums, min values)
- MongoDB indexes on `category` and `title` for fast lookups
- Global error handling (400, 404, 409, 500)
- Async/await throughout — non-blocking I/O
- Layered 3-tier architecture (Routes → Controllers → Services → Models)

## Project Structure

```
global-kitchen-api/
├── src/
│   ├── config/
│   │   └── db.js             # Single MongoDB connection module
│   ├── models/
│   │   └── Recipe.js         # Mongoose schema & indexes
│   ├── services/
│   │   └── recipeService.js  # Business logic & validation
│   ├── controllers/
│   │   └── recipeController.js
│   ├── routes/
│   │   └── recipeRoutes.js
│   └── middleware/
│       └── errorHandler.js   # Global error handler
├── server.js
├── .env.example
└── .gitignore
```

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd global-kitchen-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/global-kitchen?retryWrites=true&w=majority
   ```

4. Start the server:
   ```bash
   # Development (with auto-reload)
   npm run dev

   # Production
   npm start
   ```

## API Endpoints

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | /recipes          | Get all recipes (filter by category) |
| GET    | /recipes/:id      | Get a single recipe by ID          |
| POST   | /recipes          | Create a new recipe                |
| PATCH  | /recipes/:id      | Update specific fields of a recipe |
| DELETE | /recipes/:id      | Delete a recipe                    |

### Query Parameters

- `GET /recipes?category=Italian` — filter recipes by category (case-insensitive)

### Recipe Document Schema

```json
{
  "title": "Spaghetti Carbonara",
  "ingredients": ["pasta", "eggs", "pancetta", "parmesan", "black pepper"],
  "instructions": "Boil pasta. Fry pancetta. Mix eggs and cheese. Combine off heat.",
  "cookingTime": 25,
  "difficulty": "Medium",
  "category": "Italian"
}
```

### Field Rules

| Field        | Type     | Constraints                        |
|--------------|----------|------------------------------------|
| title        | String   | required, min 2 chars, trimmed     |
| ingredients  | [String] | required, at least 1 item          |
| instructions | String   | required, trimmed                  |
| cookingTime  | Number   | required, min value: 1             |
| difficulty   | String   | required, enum: Easy / Medium / Hard |
| category     | String   | required, trimmed                  |

### Example Requests

**Create a recipe:**
```bash
curl -X POST http://localhost:3000/recipes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tacos al Pastor",
    "ingredients": ["pork", "pineapple", "tortillas", "cilantro", "onion"],
    "instructions": "Marinate pork, grill, serve on tortillas with pineapple.",
    "cookingTime": 40,
    "difficulty": "Medium",
    "category": "Mexican"
  }'
```

**Filter by category:**
```bash
curl http://localhost:3000/recipes?category=Mexican
```

**Update cooking time:**
```bash
curl -X PATCH http://localhost:3000/recipes/<id> \
  -H "Content-Type: application/json" \
  -d '{"cookingTime": 35}'
```
