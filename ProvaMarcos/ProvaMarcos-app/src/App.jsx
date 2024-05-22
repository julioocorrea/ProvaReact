import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [conselho, setConselho] = useState('');

  const ConselhoPorPalavra = (palavra) => {
    axios.get(`https://api.adviceslip.com/advice/search/${palavra}`)
      .then(res => {
        const data = res.data;
        if (data.total_results > 0) {
          setConselho(data.slips[0].advice);
        } 
        else {
          setConselho(data.message.text);
        }
      });
  };

  const ConselhoAleatorio = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then(res => {
        const data = res.data;
        setConselho(data.slip.advice);
      });
  };

  const limparConselho = () => {
    setConselho('');
  };

  return (
    <>
      <div className='container-xl'>
        <div className='row m-5'>
          <div className='col'>
            <button onClick={() => ConselhoPorPalavra('dog')} className='btn btn-success'>Conselho com a Palavra dog</button>
          </div>
          <div className='col'>
            <button onClick={() => ConselhoPorPalavra('cat')} className='btn btn-success'>Conselho com a Palavra cat</button>
          </div>
          <div className='col'>
            <button onClick={() => ConselhoPorPalavra('study')} className='btn btn-success'>Conselho com a Palavra study</button>
          </div>
          <div className='col'>
            <button onClick={ConselhoAleatorio} className='btn btn-success'>Conselho Aleatorio</button>
          </div>
        </div>
      </div>
      
      {conselho && (
        <>
          <div className='row m-5 mb-0'>
            <div className='col'>
              <h2 className='EfeitoConselho' >Conselho:</h2>
            </div>
          </div>
          <div className='row m-5 mt-0'>
            <div className='col'>
              <p>{conselho}</p>
              <button onClick={limparConselho} className='btn btn-primary'>Limpar Conselho</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
