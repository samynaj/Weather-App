import styles from '../styles/Home.module.css'

interface WeatherCardProps {
    weekday: string;
    month: string;
    date: string;
    hour: string;
    weathericon: string;
    temp: number;
    desc: string;
}

const WeatherCard: React.FC<WeatherCardProps> = props => {
    
    return (
        <div  className={styles.card}>
            <h3>{props.weekday}</h3>
            <h2>
                <span>{props.month}, {props.date} </span><span>{props.hour}</span>
            </h2>
            <h1>
                <i className={`wi ${props.weathericon}`}></i>
            </h1>
            <h3>{props.temp}&deg;</h3>
            <p>{props.desc}</p>
        </div>

    );
}

export default WeatherCard;