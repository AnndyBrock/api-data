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

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.swapiService.getAllPeople}
                renderItem={({name, gender, birthYear})=>`${name} (${gender}, ${birthYear})`}
            />
        );
        const personDetails = (
            <PersonDetails personId={this.state.selectedPerson} loading={this.state.loading} personLoaded={this.personLoaded}/>
        );

        return (
            <div>
                <Header />
                <RandomPlanet />

                <Row left={itemList} rigth={personDetails}/>
            </div>
        );
    }

}

const Row = ({left, rigth})=>{
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {rigth}
            </div>
        </div>
    )
}