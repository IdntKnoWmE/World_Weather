
type WeatherIconProps = {
    src: string
    text?: string
    className?: string
}

function WeatherIcon({ src, text, className }: WeatherIconProps) {
    return (
        <img className={className}
             src={src}
             alt={text? `${text} Icon`: "Weather Icon"}
        />
    );
}

export default WeatherIcon;