import s from "./landing.module.css";
import { Link } from "react-router-dom";

export default function LandingPage(){
    return <div className={s.landing}>
        <img src="https://wallup.net/wp-content/uploads/2017/10/25/484105-anime-Pok%C3%A9mon_trainers-Pok%C3%A9mon-pixel_art-pixels.jpg" alt="" className={s.landingImage} />
        <Link to="/home">
            <h2 className={s.landingButton}>Home</h2>
        </Link>
    </div>
}