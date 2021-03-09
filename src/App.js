import TinderPage from './container/TinderPage';
import setup from './helpers/setup';
import setHeader from './helpers/setHeader';

setup();
const appId = '60473d1d8bfcf8153ee897ca';
setHeader(appId);
function App() {
  return (
    <div className="app-container">
      <h1> my tinder fake app</h1>
      <TinderPage></TinderPage>
    </div>
  );
}

export default App;
