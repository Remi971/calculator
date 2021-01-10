import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '0',
      output: ''
    };
  }

  operation = (e) => {
    let input = this.state.input
    if (input.match(/[/+*]$/)) {
      if (input[input.length - 1] === e.target.innerHTML) {
        return
      } else {
        this.setState(
          (prev) => ({
          input: prev.input + e.target.innerHTML,
          output: prev.input + e.target.innerHTML
        }))
      }
    }else {
      this.setState(
        (prev) => ({
        input: prev.input + e.target.innerHTML,
        output: prev.input + e.target.innerHTML
      }))
    }
  }

  handleClick = (e) => {
    if (this.state.input === '0') {
      this.setState({
        input: e.target.innerHTML,
        output: e.target.innerHTML
      })
    }else {
      this.setState(
        (prev) => ({
          input: prev.input + e.target.innerHTML,
          output: prev.input + e.target.innerHTML})
      );
    }
  }

  clear = () => {
    this.setState({
      input: '0',
      output: ''});
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <div className='display'>
            <div id='output' className='output'>{this.state.output}</div>
            <div id='display' className='input'>{this.state.input}</div>
          </div>
          <button onClick={this.clear} id='clear' className='AC'>AC</button>
          <button onClick={this.operation} id='divide' className='division'>/</button>
          <button onClick={this.operation} id='multiply' className='multiply'>*</button>
          <button onClick={this.handleClick} id='seven' className='num'>7</button>
          <button onClick={this.handleClick} id='eight' className='num'>8</button>
          <button onClick={this.handleClick} id='nine' className='num'>9</button>
          <button onClick={this.operation} id='subtract' className='minus'>-</button>
          <button onClick={this.handleClick} id='four' className='num'>4</button>
          <button onClick={this.handleClick} id='five' className='num'>5</button>
          <button onClick={this.handleClick} id='six' className='num'>6</button>
          <button onClick={this.operation} id='add' className='plus'>+</button>
          <button onClick={this.handleClick} id='one' className='num'>1</button>
          <button onClick={this.handleClick} id='two' className='num'>2</button>
          <button onClick={this.handleClick} id='three' className='num'>3</button>
          <button id='equals' className='egal'>=</button>
          <button onClick={this.handleClick} id='zero' className='num zero'>0</button>
          <button id='decimal' className='num'>.</button>
        </div>
      </div>
    );
  }
}

export default App;
