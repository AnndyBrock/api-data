import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService();

    state = {
        planet: {},
        loading:true
    };

    constructor(){
        super();
        this.updatePlanet();
    }

    onPlanetLoad = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        });
    };

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updatePlanet (){
        const id=Math.floor(Math.random()*20000)+2;
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoad)
            .catch(this.onError);
    }

    render() {

        const {planet, loading, error} = this.state;

        const hasDate = !(loading || error);

        const errorMsg = error? <ErrorIndicator/>: null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasDate ? <PlanetView planet={planet}/>: null;


        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {content}
                {errorMsg}
            </div>

        );
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population,
        rotationPerioaad, diameter } = planet;

    return (
        <React.Fragment>
            <img className="planet-image"
                 src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPerioaad}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};