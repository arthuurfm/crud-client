import axios from 'axios';

// GET, POST, PUT, DELETE.
const method = process.argv[2];

// rota (http://localhost:3000/rota).
const url = process.argv[3];

// argumentos (key=value).
const args = process.argv.slice(4);

// body -> transforma ["id=number", "title=title"] em {id: number, title: "title"}.
const data = args.reduce((acc, arg) => {
  const [key, value] = arg.split('=');

  // tenta converter números automaticamente.
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