import axios from 'axios';
import { useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [city, setCity] = useState({});
  const API_key = `7b529bbd02138dd0ed83445de338a6d5`; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`
  const today = new Date().toLocaleDateString()
  let day = new Date();
  const weekDay = ['SUN', 'MON','TUE', 'WED','THU','FRI', 'SAT'];
  let Week = weekDay[day.getDay()];
  // const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
  // const [icon, setIcon] = useState({});

  //!event handler
  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  }


  //*인풋창에 도시를 입력하고 엔터 -> Weather API 호출(비동기적으로)
  const searchWeather = async(e) => {
    if(e.key === 'Enter'){
      try {
        const data = await axios({
          //weather API의 날씨정보를 가져오는 것임으로 GET 메서드 사용
          method: 'get',
          url: url
        })
        console.log(data);
        setCity(data);
        console.log(setCity)
        // console.log(data.data.weather[0].icon) //--> 04d
        // setIcon(data.data.weather[0].icon)
      }
      catch (err){
        alert('Please check the city name again');
      }
    }
  }
  //console.log(setIcon)

//*input창을 click하면 입력값 초기화
const resetValue = () => {
  setLocation('')
}


// _getWeather = (location) => {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_key}`
//   )
//   .then(res => res.json())
//   .then(json => {
//     this.Icon({
//       icon : json.weather[0].icon
//     })
//   })
// }


/* 날씨 아이콘 가져오기
1. 변수 condition 선언
2. 변수 reference 에 `http://openweathermap.org/img/wn/${condition}@2x.png`담아줌
3. city바뀔때마다 `city.data.weather[0].icon`값을 condition으로 할당하면 되지 않을까?
*/

//const onChangeIcon = (e) => {
//  setCondition(e.target.value)
//}

// const getWeatherIcon = async(e) => {
//   if(e)
// }

  return (
  <div className='base'>
    <div className="App">
      <div className='maininputChang'>
        <div className='day'>{today} {Week}</div>
        <h2>Today's weather</h2>
        <input 
        type = 'text'
        placeholder='Which City'
        value={location}
        onChange={onChangeLocation}
        onKeyDown={searchWeather}
        onClick={resetValue}
        />
      </div>
      {Object.keys(city).length !== 0 && (
        <div className='answer_form'>
        {/* <div className='weatherIcon'
        >{iconUrl}</div> */}
        <div className='sky'>
          {city.data.weather[0].description}
        </div>
        <div className='temperature'>
          { Math.round(((city.data.main.temp - 273.15) * 10)) / 10}°c
        </div>
        <div className='temperature_max_min'>
          <span className='_min'>
             { Math.round(((city.data.main.temp_min - 273.15) * 10)) / 10}°
          </span>
          <span className='v-line' />
          <span className='_max'>
             { Math.round(((city.data.main.temp_max - 273.15) * 10)) / 10}°
          </span>
        </div>
        <span className='line'/>
        <div className='cityName'>{city.data.name}<span className='country'>. {city.data.sys.country}</span></div>
      </div>
      )}
    </div>
  </div>
  );
}

export default App;

/*result.data.main.temp온도는 켈빈단위로 -> 섭씨온도로 바꿔줘야함
켈빈단위 -> 섭씨 변환식 : (온도 - 273.15)
*/