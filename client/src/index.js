import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import 'animate.css/animate.min.css';
import './styles/global.scss';

const Root = () => (
  
      <App />
      
);

ReactDOM.render(<Root />, document.getElementById('root'));