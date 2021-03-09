import TinderPage from './container/TinderPage';
import setup from './helpers/setup';
import setHeader from './helpers/setHeader';

setup();
const appId = '6046d0a851354b0b0bba8119';
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
