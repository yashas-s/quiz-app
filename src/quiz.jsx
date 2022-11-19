import React, { Component } from 'react'
import {quizdata} from './quizdata'
import './styles.css'

export class Quiz extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
        userAnswer:null,    
        currentIndex:0,  
        options: [],       
        quizEnd: false, 
        score: 0,      
        disabled: true,
    }
  }
  loadquiz = () => {
    const{currentIndex} = this.state;
    this.setState(() => {
         return{
            question:quizdata[currentIndex].question,
            options:quizdata[currentIndex].options,
            answer:quizdata[currentIndex].answer
         }

    })
  }

  nextQuestionHandler = () => {
    const {userAnswer, answer, score} = this.state
    
    if(userAnswer === answer){
        this.setState({
            score: score + 1
        })
    }

    this.setState({
        currentIndex: this.state.currentIndex + 1,
        userAnswer: null
    })

  }

  componentDidMount() {
    this.loadquiz();
  }

  checkAnswer = answer => {
    this.setState({
        userAnswer: answer,
        disabled: false
    })
  }

  componentDidUpdate(prevProps, prevState){
    const{currentIndex} = this.state;
    if(this.state.currentIndex !== prevState.currentIndex)
        this.setState(() => {
            return{
            question:quizdata[currentIndex].question,
            options:quizdata[currentIndex].options,
            answer:quizdata[currentIndex].answer
            }

    });
  }
  finishHandler =() => {
    if(this.state.currentIndex === quizdata.length -1){
        this.setState({
            quizEnd:true
        })
    }

}





  render() {
    const{question, options, currentIndex, userAnswer, quizEnd} = this.state
    
    if(quizEnd) {
        return(
            <div>
               <h1> Quiz over. Final Score is {this.state.score} points </h1>
            </div>
        )
            
        
    }
    
    return (
      <div>
       <h2>{question}</h2>
       <span>{`question ${currentIndex + 1} of ${quizdata.length}`}</span>
       {
        options.map(option => 
            <p key = {option.id} className={`options ${userAnswer === option? "selected" : null}`} 
            onClick = {() => this.checkAnswer(option)} >
            {option}
            </p>
            )
       }
        {currentIndex < quizdata.length - 1 && 
        <button disabled = {this.state.disabled} 
        onClick={this.nextQuestionHandler}>
            Next Question
        </button>}
        {currentIndex === quizdata.length-1 &&
        <button onClick = {this.finishHandler}
        disabled = {this.state.disabled}>
        finish
        </button>
        }
        
        



      </div>
    )
  }
}

export default Quiz