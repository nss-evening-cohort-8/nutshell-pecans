import 'bootstrap';
import './index.scss';
import realNiceComponent from './components/RealNiceComponent/RealNiceComponent';
import messageDisplay from './components/Messages/messageDisplay';

const initialize = () => {
  realNiceComponent();
  messageDisplay();
};

initialize();
