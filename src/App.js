import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '0',
      operation: '',
      output: '',
      result:0
    };
  }

  operation = (e) => {
    if (this.state.output === '') {
      return
    }
    const operators = {
      '/': function(a,b){ return a/b},
      '*': function(a,b){ return a*b},
      '-': function(a,b){ return a-b},
      '+': function(a,b){ return a+b},
    }

    if(this.state.output.match(/[/*-+]$/)) {
      this.setState(
        (prev) => ({
          input: e.target.innerHTML,
          output: prev.output.repace(/[/*-+]$/, e.target.innerHTML),
          operation: e.target.innerHTML
        })
      )
    } else if (this.state.result === 0) {
      this.setState(
        (prev) => ({
          input: e.target.innerHTML,
          output: prev.output + e.target.innerHTML,
          operation: e.target.innerHTML,
          result: prev.input
        })
      )
    } else {
      this.setState(
        (prev) => ({
          input: e.target.innerHTML,
          output: prev.output + e.target.innerHTML,
          operation: e.target.innerHTML,
          result: operators[prev.operation](prev.result, prev.input)
        })
      )
    }
  }


  handleClick = (e) => {
    if (this.state.input === '0') {
      this.setState({
        input: e.target.innerHTML,
        output: e.target.innerHTML
      })
    } else if (this.state.input.match(/^[/*-+]/)) {
      this.setState(
        (prev) => ({
        input: e.target.innerHTML,
        output: prev.output + e.target.innerHTML
        })
      )
    } else {
      this.setState(
        (prev) => ({
          input: prev.input + e.target.innerHTML,
          output: prev.output + e.target.innerHTML})
      );
    }
  }

  clear = () => {
    this.setState({
      input: '0',
      output: ''
    });
  }

  equal = () => {
    console.log(this.state.result);
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
          <button onClick={this.equal} id='equals' className='egal'>=</button>
          <button onClick={this.handleClick} id='zero' className='num zero'>0</button>
          <button id='decimal' className='num'>.</button>
        </div>
      </div>
    );
  }
}

export default App;
