import 'bootstrap/dist/js/bootstrap.min.js';
import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(null);

  //Função para obter o clima usando as coordenadas
  let getWeather = async (lat, lon) => {
    try {
      const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: lat,
          lon: lon,
        
          lang: 'pt',
          units: 'metric' //para aparecer em Celsius
        }
      });

      setWeather(res.data);
    } catch (error) {
      console.error('Erro ao buscar dados do clima', error);
    }
  };

  //Solicitando acesso a localização da pessoa
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeather(latitude, longitude);
        setLocation(true);
      }, () => {
        setLocation(false);
      });
    } else {
      setLocation(false);
    }
  }, []);

  if (!location) {
    return (
      <Fragment>Você precisa habilitar a localização no browser</Fragment>
    );

  } else if (!weather) {   //Quando carregarmos a pagina não teremos nenhum dado por isso apareca essa mensagem
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    );
  } else {


    return (
      <>
      <div className="body">
        <Fragment>
          <div className="container align-items-center" id='container-body'>
            <div className="row justify-content-center">
              <div className="col-5">
                <h2 className="city">{weather.name}</h2>
              </div>
           
              <div className="row justify-content-center" style={{backgroundColor: "#3D818A", borderRadius:"18px", height:"110px"  }}>
                <div className="col-6" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Ícone do tempo" id='icon'/>
                  </div>

                <div className="col-6" style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:""}}>
                  <p className='temp-atual'>{weather.main.temp} <sup>°C</sup></p>
                  <p className='descricao'>{weather.weather[0].description} </p>
                </div>
                </div>

          <div className="row justify-content-center">
               
                  <div className="col-6" style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                   <div className='div-temp'>
                   <i className="bi bi-thermometer-high" style={{fontSize:"28px", marginRight:"", marginTop:""}}></i>
                   <div className='div-max-min'>
                      <h3>Temp. máxima:</h3>
                      <p> {weather.main.temp_max}<sup>°C</sup></p>
                      </div>
                      </div>
                   
                      <div className='div-temp'>
                       <i className="bi bi-thermometer-low"  style={{fontSize:"28px", marginRight:"",  marginTop:""}}></i> 
                      <div className='div-max-min'>
                      <h3>Temp. minima:</h3>
                      <p> {weather.main.temp_min}<sup>°C</sup></p>
                      </div>
                  </div>
                  </div>
             
              
             <div className="col-6" style={{display:"flex", flexDirection:"column"}}>
                   <div className='div-temp'>
                   <i className="bi bi-speedometer" style={{fontSize:"28px", marginRight:"", marginTop:""}}></i>
                   <div className='div-max-min'>
                      <h3>Valor pressão:</h3>
                      <p> {weather.main.pressure} hpa</p>
                      </div>
                      </div>
                   
                      <div className='div-temp'>
                       <i className="bi bi-droplet-fill"  style={{fontSize:"28px", marginRight:"",  marginTop:""}}></i> 
                      <div className='div-max-min'>
                      <h3>Valor humidade:</h3>
                      <p> {weather.main.humidity} %</p>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
              </div>
        </Fragment>
        </div>
      </>
    );
  }
}
export default App
