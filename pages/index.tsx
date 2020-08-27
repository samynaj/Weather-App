import styles from '../styles/Home.module.css';
import WeatherCard from '../components/weather-card'
import Footer from '../components/footer';
import HeadComponent from '../components/head';
import DisplayError from '../components/displayerror';
import React from 'react';


const API_KEY = '96a147e92a77f484f05c44c04753fe9a';

interface WeatherIconProps {
  Thunderstorm: string;
  Drizzle: string;
  Rain: string;
  Snow: string; 
  Atmosphere: string; 
  Clear: string; 
  Clouds: string;
}
interface StateProps {
  input: string;
  city: string;
  days: (any)[];
  icon: string;
  error: boolean;
}

class Home extends React.Component {
  weathericon: WeatherIconProps;
  readonly state: StateProps;

  constructor(props: Readonly<{}>){
    super(props);
    this.state = {
      input: "",
      city: "",
      days: [],
      icon: "",
      error: false
    }
    
    this.weathericon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: "wi-sleet",
      Rain: 'wi-storm-showers',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog'
    }
  }
  
  get_weatherIcon(icons: WeatherIconProps, rangeId: number){
    switch(true) {
      case rangeId >=200 && rangeId <= 232:
        this.setState({icon: this.weathericon.Thunderstorm});
        break;
      case rangeId >=300 && rangeId <= 321:
        this.setState({icon: this.weathericon.Drizzle});
        break;
      case rangeId >=500 && rangeId <= 531:
        this.setState({icon: this.weathericon.Rain});
        break;
      case rangeId >=600 && rangeId <= 622:
        this.setState({icon: this.weathericon.Snow});
        break;
      case rangeId >=701 && rangeId <= 781:
        this.setState({icon: this.weathericon.Atmosphere});
        break;
      case rangeId ===800:
        this.setState({icon: this.weathericon.Clear});
        break;
      case rangeId >=801 && rangeId <= 804:
        this.setState({icon: this.weathericon.Clouds});
        break;
      default:
        this.setState({icon: this.weathericon.Clouds});
    }
  }
  calCelsius(temp: number){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }


  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value}) ;
    console.log(this.state.input)
  }


  getWeather = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try {
      if(this.state.input){
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.input}&appid=${API_KEY}`);
        const res = await api_call.json();

        this.setState({
          city: res.city.name,
          days: res.list.filter((lis: any) => res.list.indexOf(lis) < 5),
          error: false
        })
        this.get_weatherIcon(this.weathericon, res.list.filter((lis: any) => res.list.indexOf(lis) < 5).map((day: { weather: { id: any; }[]; }) => day.weather[0].id));
        
        
        
      }else {
        this.setState({error: true})
      }
    } catch (error) {
      error.message = "You entered a wrong city";
      this.setState({...this.state, city: error.message, error: true})
    }
    
    
  }
  render() {

      const dateFormatter = (unixtime: number) => {
        const millisec = unixtime * 1000;
        const dateObj = new Date(millisec);
        return dateObj;
      }

      return (
        <div className={styles.container}>
          
          <HeadComponent />
          <div>{this.state.error? <DisplayError/> : null}</div>
          <main className={styles.main}>
            <h1 className={styles.title}>
              WEATHER FORECAST
            </h1>
            <form onSubmit={this.getWeather}>
              <input type='text' placeholder='City' onChange={this.handleChange} className={styles.input}/>
              <button className={styles.button}>Check weather</button>
            </form>
            <div className={styles.city} >{this.state.city}</div>
            <div className={styles.grid}>
              {
                 
                this.state.days.map((day: { dt:  number; main: { temp: number; }; weather: { description: string; }[]; }) => 
                      <WeatherCard 
                        key={day.dt} 
                        weekday={dateFormatter(day.dt).toLocaleString("en-US", {weekday: "long"})}
                        month={dateFormatter(day.dt).toLocaleString("en-US", {month: "long"})}
                        date={dateFormatter(day.dt).toLocaleString("en-US", {day: "numeric"})}
                        hour={dateFormatter(day.dt).toLocaleString("en-US", {hour: "numeric"})}
                        temp={this.calCelsius(day.main.temp)} 
                        desc={day.weather[0].description}
                        weathericon={this.state.icon}
                      />)
                      
              }
            </div>
          </main>
          <Footer />
        </div>
      )
  }
}

export default Home;