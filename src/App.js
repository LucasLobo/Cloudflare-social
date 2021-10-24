import './App.css';

import Content from './components/content'

function App() {
  
  return (
    <div className="App">

      <div className="content">

        <div className="content-header">
          <h1>Your Social Network</h1>
        </div>

        <div className="content-body">
          <Content></Content>
        </div>      

      </div>
    </div>
  );
}

export default App;
