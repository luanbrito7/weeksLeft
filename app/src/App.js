import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useForm } from "react-hook-form";
import Weeks from './Weeks'

function App() {
  const { handleSubmit, register, errors } = useForm();
  const [userInput, setUserInput] = useState({
    age: '',
    death: ''
  });
  const onSubmit = values => {
    setUserInput({
      age: values.age,
      death: values.death
    })
  }

  if (userInput.age && userInput.death) {
    return (
      <Weeks age={userInput.age} death={userInput.death}></Weeks>
    )
  } else {
      return (
        <div className="App">
          <header className="App-header">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label for="age">Idade / Age</label><br/>
                <input
                  name="age"
                  type="number"
                  ref={register({
                    required: "Esse campo é obrigatório",
                    validate: value => value > 0 && value < 200
                  })}
                />
                {errors.age?.type === "validate" &&
                  (
                    <div>
                      <span className="error-message">É improvável que você tenha mais que duzentos ou menos que zero anos.</span>
                    </div>
                  )
                }
              </div>
              <div>
                <label for="death">Quantos anos estima viver?</label><br/>
                <input
                  name="death"
                  type="number"
                  placeholder="Média: 76 anos"
                  ref={register({
                    required: "Esse campo é obrigatório",
                    validate: value => value > 0 && value < 200
                  })}
                />
                {errors.death?.type === "validate" &&
                  (
                    <div>
                      <span className="error-message">É improvável que você viva mais que duzentos ou menos que zero anos.</span>
                    </div>
                  )
                }
              </div>
              <button type="submit">Submit</button>
            </form>
          </header>
        </div>
      );
  }
}

export default App;