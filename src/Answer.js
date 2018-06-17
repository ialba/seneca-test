import React, { Component } from 'react';
import './styles/Answer.css';

class Answer extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer : props.answer,
      chosenAnswer : 0
    }
  }
  render(){
    return(
    <div className="Answer" onClick={
      async () =>{
        await this.setState({
          chosenAnswer : this.state.chosenAnswer === 0 ? 1 : 0
        })
        this.props.onClick(this.state.answer.id, this.state.chosenAnswer);
      }
    }>
      <div className={"Answer1 "+ (this.state.chosenAnswer === 0 ? "Selected" : "")}>{ this.state.answer.answer1 }</div>
      <div className={"Answer2 "+ (this.state.chosenAnswer === 1 ? "Selected" : "")}>{ this.state.answer.answer2 }</div>
    </div>
    )
  }
}

export default Answer;
