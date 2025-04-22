// server.js
import app from './app.js';
import config from 'config';

const PORT = process.env.PORT || config.get('port') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));