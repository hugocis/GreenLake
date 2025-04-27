import express from 'express';
import { askController } from './controllers/ask.controller';

const app = express();
app.use(express.json());

app.post('/api/greenlake-eval/ask', askController);

app.listen(5454, () => {
  console.log('✅ Servidor corriendo en http://localhost:5454');
});
