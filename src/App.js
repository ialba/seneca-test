import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom';
import './styles/App.css';
import Answer from './Answer';


class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrect: false,
      question : {
        question : "An animal cell contains",
        photo : "cell.png",
        answers : [
          { id: 0, answer1 : "Cell Wall", answer2 : "Ribosomes", correctAnswer : 1, chosenAnswer : 0},
          { id: 1, answer1 : "Cytoplasm", answer2 : "Chloroplast", correctAnswer : 0, chosenAnswer : 0},
          { id: 2, answer1 : "Partially permeable membrane", answer2 : "Impermeable membrane", correctAnswer : 0, chosenAnswer : 0},
          { id: 3, answer1 : "Cellulose", answer2 : "Mitochondria", correctAnswer : 1, chosenAnswer : 0},
        ]
      }
    };
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnter={false}
        transitionLeave={false}>
        <div className={"Mask "+ (this.state.isCorrect ? "Correct" : "Incorrect")}>
            { this.state.question.question}
            <Answers
            answerList={this.state.question.answers}
            checkAnswers={(prmIsCorrect) => this.checkAnswers(prmIsCorrect)}
             />
             <h2>{ this.state.isCorrect ? 'The answers are correct' : 'The answer is incorrect2'}</h2>
        </div>
      </ReactCSSTransitionGroup>

    );
  }

  checkAnswers(prmIsCorrect){
    console.log(prmIsCorrect);
    this.setState({
      isCorrect : prmIsCorrect
    })
    prmIsCorrect ? ReactDOM.render(<Correct photo={this.state.question.photo} />, document.getElementById('root')) : ''; // TODO: add a routing here
  }

}

function Correct(props) {
  return (
    <ReactCSSTransitionGroup
      transitionName="slide"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
      <div className="Mask">
        <img src={"/images/"+props.photo} />
      </div>
    </ReactCSSTransitionGroup>
  );
}

class Answers extends Component{
  constructor(props){
    super(props);
    this.state = {
      answerList : props.answerList
    }
  }
  render(){
    const answers = this.state.answerList.slice();
    const listAnswers = answers.map((answer)=>
      <Answer key={answer.id.toString()}
          answer={answer}
          onClick={(index, chosenAnswer) => this.handleClick(index, chosenAnswer)}
      />
    )
    return (
      <ul>{listAnswers}</ul>
    );
  }
  handleClick(index, chosenAnswer){
    const stateCP = this.state.answerList.slice();
    stateCP[index].chosenAnswer = chosenAnswer;
    this.props.checkAnswers(this.checkAnswers());
  }
  checkAnswers(){
    return this.state.answerList.filter(answer => answer.chosenAnswer === answer.correctAnswer).length === this.state.answerList.length;
  }
}

export default Question;
