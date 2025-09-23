import axios from 'axios';

// GET, POST, PUT, DELETE.
const method = process.argv[2];

// rota (http://localhost:3000/rota).
const url = process.argv[3];

// argumentos (key=value).
const args = process.argv.slice(4);

// body -> transforma ["id=number", "title=title"] em {id: number, title: "title"}.
const data = args.reduce((acc, arg) => {
  if (!arg.includes('=')) return acc;

  const [key, value] = arg.split('=');

  if (value === '') {
    acc[key] = ''; // mantém string vazia.
  } else if (!isNaN(value)) {
    acc[key] = Number(value); // converte para número.
  } else if (value.toLowerCase() === 'true') {
    acc[key] = true;
  } else if (value.toLowerCase() === 'false') {
    acc[key] = false;
  }else {
    acc[key] = value; // mantém string normal.
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
    console.error('Error:', JSON.stringify((error.response?.data || error.message), null, 2));
  }
})();