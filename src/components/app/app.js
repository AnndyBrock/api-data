import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import SwapiService from "../../services/swapi-service";


export default class App extends Component {

    swapiService = new SwapiService();

    state={
        selectedPerson:1,
        loading:true
    };

    onItemSelected = (id, load) => {
        if(id!=this.state.selectedPerson){
            this.personLoaded(load);
        }
        this.setState({
            selectedPerson:id
        });

    };

    personLoaded = (load) => {
        this.setState({
            loading:load
        });
    };

    render (){

        return (
            <div>
                <Header />
                <RandomPlanet />

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onItemSelected} getData={this.swapiService.getAllPeople}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson} loading={this.state.loading} personLoaded={this.personLoaded}/>
                    </div>

                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onItemSelected} getData={this.swapiService.getAllPlanets}/>
                    </div>
                </div>
            </div>
        );
    }

}