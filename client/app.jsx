import React from 'react';
import ReactDOM from 'react-dom';



class App extends React.Component {
  constructor () {
    super(props)
    this.state = {}
  }
  render () {
    return (
    <div>
    Rendering
    </div>
    )
  }
}







ReactDOM.render(<App/> , document.getElementById('app'));