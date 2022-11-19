import React from 'react'
import ReactDOM  from 'react-dom'
import Quiz from './quiz'

function App() {
  return (
    <div>
        <Quiz></Quiz>
    </div>
  )
}

export default App

const rootElement = document.getElementById('root') 
ReactDOM.render(<App></App>, rootElement)