# Judge0 Code Execution API

A Node.js Express API that integrates with Judge0 to execute code against multiple test cases and return results.

## Features

- Execute code in multiple programming languages
- Run code against multiple test cases
- Base64 encoding support for Judge0 API
- Automatic polling for execution results
- Type-safe with TypeScript and Zod validation

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Judge0 RapidAPI key

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd judge0_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   RAPID_API_KEY=your_rapidapi_key_here
   ```
   
   To get your RapidAPI key:
   - Go to [RapidAPI Judge0 CE](https://rapidapi.com/judge0-official/api/judge0-ce)
   - Subscribe to the API (free tier available)
   - Copy your API key from the dashboard

4. **Build the project**
   ```bash
   npm run build
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST /submit

Executes code against multiple test cases.

#### Request Body

```json
{
  "language_id": 100,
  "source_code": "name = input()\nprint(f'hello, {name}')",
  "testcases": [
    {
      "stdin": "Saksham",
      "expected_output": "hello, Saksham"
    },
    {
      "stdin": "World",
      "expected_output": "hello, World"
    }
  ]
}
```

#### Request Parameters

- `language_id` (number): The programming language ID from Judge0
  - Python: `100`
  - JavaScript: `97` 
  - Java: `91`
  - C++: `76`
  - [View all language IDs](https://ce.judge0.com/languages)
- `source_code` (string): The source code to execute
- `testcases` (array): Array of test case objects
  - `stdin` (string): Input for the program
  - `expected_output` (string): Expected output to compare against

#### Example Request

```bash
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/json" \
  -d '{
    "language_id": 100,
    "source_code": "name = input()\nprint(f\"hello, {name}\")",
    "testcases": [
      {
        "stdin": "Alice",
        "expected_output": "hello, Alice"
      },
      {
        "stdin": "Bob", 
        "expected_output": "hello, Bob"
      }
    ]
  }'
```

#### Response Example

```json
{
  "result": {
    "submissions": [
      {
        "token": "abc123-def456",
        "status": {
          "id": 3,
          "description": "Accepted"
        },
        "stdout": "aGVsbG8sIEFsaWNl",
        "stderr": null,
        "compile_output": null,
        "time": "0.001",
        "memory": 512
      },
      {
        "token": "xyz789-uvw012", 
        "status": {
          "id": 3,
          "description": "Accepted"
        },
        "stdout": "aGVsbG8sIEJvYg==",
        "stderr": null,
        "compile_output": null,
        "time": "0.001",
        "memory": 512
      }
    ]
  }
}
```

#### Status Codes

- `200` - Success
- `413` - Validation error (invalid input format)
- `500` - Server error

#### Common Status Descriptions

- `Accepted` - Code executed successfully
- `Wrong Answer` - Output doesn't match expected
- `Time Limit Exceeded` - Code took too long to execute
- `Runtime Error` - Code crashed during execution
- `Compilation Error` - Code failed to compile

## Project Structure

```
judge0_app/
├── src/
│   ├── types/
│   │   └── index.ts       # Type definitions and schemas
│   ├── utils/
│   │   └── index.ts       # Utility functions
│   └── index.ts           # Main application file
├── dist/                  # Compiled JavaScript files
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```
