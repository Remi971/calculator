import React from 'react';
import './App.css';
import {operators} from './operators.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      input: '0',
      operation: '',
      output: '',
      result:0,
      decimal: false,
    };
  }

  operation = (e) => {
    // On ne peut pas commencer par un operator
    if (this.state.output === '') {
      return
    }
    // S'il y a déjà un opertor
    if(this.state.output.match(/[*+/]$/)) {
      // Si celui-ci est un "moins", On garde le précédent en mémoire et on peut ajouter le moins après
      if (e.target.innerHTML === '-') {
        this.setState(
          (prev) => ({
            input: e.target.innerHTML,
            output: prev.output + e.target.innerHTML
          })
        )
        // Si ce n'est pas un "moins" il peut alors être remplacé par un autre operator
      } else {
        this.setState(
          (prev) => ({
            input: e.target.innerHTML,
            output: prev.output.replace(/\W$/, e.target.innerHTML),
            operation: e.target.innerHTML,
            decimal:false
          })
        )
      }
    } else if (this.state.output.match(/[*+/]-$/)) {
      this.setState(
        (prev) => ({
          input: e.target.innerHTML,
          output: prev.output.replace(/[*+/]-$/, e.target.innerHTML),
          operation: e.target.innerHTML,
          decimal: false
        })
      )
      // Si le résutat est égal à 0
    } else if (this.state.result === 0) {
      this.setState(
        (prev) => ({
          input: e.target.innerHTML,
          output: prev.output + e.target.innerHTML,
          operation: e.target.innerHTML,
          result: Math.abs(prev.input),
          decimal: false
        })
      )
      // Si on a déjà appuyé sur égale
    } else if (this.state.output.match(/=/)) {
      this.setState(
        (prev) => ({
          input: e.target.innerHTML,
          output: prev.result + e.target.innerHTML,
          operation: e.target.innerHTML,
          decimal: false
        })
      )
    } else {
      this.setState(
        (prev) => ({
          input: e.target.innerHTML,
          output: prev.output + e.target.innerHTML,
          operation: e.target.innerHTML,
          decimal: false,
          result: operators[prev.operation](prev.result, parseFloat(prev.input))
        })
      )
    }
  }

  handleClick = (e) => {
    //Au commencement losque input = 0
    if (this.state.input === '0') {
      this.setState({
        input: e.target.innerHTML,
        output: e.target.innerHTML
      })
    //
    } else if (this.state.input.match(/^\W/)) {
      if (this.state.input.match(/^-/) && this.state.operation !== '-') {
        this.setState(
          (prev) => ({
            input: prev.input + e.target.innerHTML,
            output: prev.output + e.target.innerHTML
          })
        )
      } else {
        this.setState(
          (prev) => ({
            input: e.target.innerHTML,
            output: prev.output + e.target.innerHTML
          })
        )
      }
    } else if (this.state.output.match(/=/)) {
      this.setState({
        input: e.target.innerHTML,
        output: e.target.innerHTML,
        result: 0
      })
    } else if (e.target.innerHTML === '.' && !this.state.decimal){
      this.setState(
        (prev) => ({
          input: prev.input + e.target.innerHTML,
          output: prev.output + e.target.innerHTML,
          decimal: true
        })
      )
    } else if (e.target.innerHTML === '.' && this.state.decimal) {
      return
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
      output: '',
      result: 0,
      operation: '',
      decimal: false
    });
  }

  equal = () => {
    if (this.state.operation !== '') {
      this.setState(
        (prev) => ({
          input: operators[prev.operation](prev.result, parseFloat(prev.input)),
          output: prev.output + '=' + operators[prev.operation](parseFloat(prev.result), parseFloat(prev.input)),
          result: operators[prev.operation](prev.result, parseFloat(prev.input)),
          operation: ''
        })
      )
    }else {
      return
    }
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
          <button onClick={this.handleClick} id='decimal' className='num'>.</button>
        </div>
      </div>
    );
  }
}

export default App;
