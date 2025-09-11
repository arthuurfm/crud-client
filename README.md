# CRUD Client
## About
A simple CRUD, but without using Postman, everything via the command line.

## Installation
After cloning the repository, enter the folder corresponding to the project (in cmd) and use:
```
npm install
```

## How to use:
#### Run the server:
```
npm run dev
```
#### Requests (GET, POST, PUT and DELETE):
**You will use the client.js as a interact menu.**
~~~javascript
import axios from 'axios';

const method = process.argv[2];

const url = process.argv[3];

const args = process.argv.slice(4);

const data = args.reduce((acc, arg) => {
  const [key, value] = arg.split('=');

  const num = Number(value);
  acc[key] = isNaN(num) ? value : num;

  return acc;
}, {});


(async () => {
  try {
    let res;
    
    switch (method.toUpperCase()) {
      case 'GET':
        res = await axios.get(url);
        break;
      
      case 'POST':
        res = await axios.post(url, data);
        break;

      case 'PUT':
        res = await axios.put(url, data);
        break;

      case 'DELETE':
        res = await axios.delete(url);
        break;
      
      default:
        console.log('Invalid method! Use GET, POST, PUT or DELETE.');
        return;
    }

    console.log(`Server response:\n${JSON.stringify(res.data, null, 2)}`);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
})();
~~~
- GET:
  ```
  node client.js GET http://localhost:3000/route-name
  ```
- POST:
  ```
  node client.js POST http://localhost:3000/route-name id=value title="value"
  ```
- PUT:
  ```
  node client.js PUT http://localhost:3000/route-name/id title="value"
  ```
- DELETE:
  ```
  node client.js DELETE http://localhost:3000/route-name/id
  ```

## Developed by:
**Arthur Franz**
