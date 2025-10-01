# CRUD Client
## About
A simple CRUD, but without using Postman, everything via the command line. The database connection will be fully accessible for testing, without .env protection.

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
**You will use the client.js as a interact menu (in cmd).**
~~~javascript
import axios from 'axios';

const method = process.argv[2];
const url = process.argv[3];
const args = process.argv.slice(4);

const data = args.reduce((acc, arg) => {
  if (!arg.includes('=')) return acc;

  const [key, value] = arg.split('=');

  if (value === '') {
    acc[key] = '';
  } else if (!isNaN(value)) {
    acc[key] = Number(value);
  } else if (value.toLowerCase() === 'true') {
    acc[key] = true;
  } else if (value.toLowerCase() === 'false') {
    acc[key] = false;
  }else {
    acc[key] = value;
  }

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
> [!IMPORTANT]
> When use POST or PUT, the sintaxe is **key=value for numbers** and **key="value" for strings**.
- GET:
  ```
  node client.js GET "http://localhost:3000/route-name"
  ```
- POST:
  ```
  node client.js POST "http://localhost:3000/route-name" key=value
  ```
- PUT:
  ```
  node client.js PUT "http://localhost:3000/route-name/id" key=value
  ```
- DELETE:
  ```
  node client.js DELETE http://localhost:3000/route-name/id
  ```

## Developed by:
**Arthur Franz**
