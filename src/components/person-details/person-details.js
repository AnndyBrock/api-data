import React, { Component } from 'react';

import './person-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";

export default class PersonDetails extends Component {

    state={
        person:null
    };

    swapiService = new SwapiService();

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if(this.props.personId !== prevProps.personId){
            this.updatePerson();
        }
    }

    onError = (err) => {
        this.setState({
            error: true
        });
    };

    updatePerson(){
        const {personId} = this.props;
        if(!personId){
            return;
        }
        this.swapiService.getPerson(personId)
            .then((person)=>{
                this.setState({person})
            }).catch(this.onError);
        this.props.personLoaded(false);
    }

    render() {

        const {person} = this.state;
        const content = person && !this.props.loading ? <PersonView person={person}/>: <Spinner/>

        return (
            <div className="person-details card">
                {content}
            </div>
        )
    }
}


const PersonView = ({ person }) => {

    const { name, gender, birthYear, hairColor, eyeColor, id } = person;

    return (
        <React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                 alt='character'/>
            <div className="card-body" key={id}>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Hair Color</span>
                        <span>{hairColor}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
};