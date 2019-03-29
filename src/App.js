import React, { Component } from 'react';
import logo from './Logo.png';
import loupe from './loupe.jpg';
import plus from './plus.png';
import './App.css';
import { bdd } from './database';

class App extends Component {
  render() {
    return (

        <div className="App">
          <header className="App-header">
            <div>
              <img src={logo} className="App-logo" alt="logo"/>
            </div>
          </header>
          <Tableau/>
          </div>

    );
  }
}

class Tableau extends Component{
  render() {
    return(
        <div>
          <div>
              <input id="search" type="text" placeholder="Search.." name="search"/>

          </div>
          <div className="pos">
          <table className="Table">
            <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Difficulté</th>
              <th>Nb. pers.</th>
              <th></th>
              <th><button ><img src={plus}/></button></th>
            </tr>
            </thead>
            <tfoot>
            <tr>
              <td colspan="6">
              </td>
            </tr>
            </tfoot>
            <Recette/>
          </table>
          </div>
        </div>
    );
  }
}

class Recette extends Component{
  constructor(props){
    super(props);
    this.state = {recette: []};
}

componentDidMount(){
  bdd.ref('/Recettes/').once('value', (snapshot)=> {
    var data = snapshot.val();
    let recettes = Object.values(data);
    console.log(recettes);
      this.setState({recette: recettes});
}
);
}

render() {
  return(
      <tbody>
        {this.state.recette.map((item, index)=>
         { return(
          <tr>
        <td><img src={item.image} class="image"/></td><td>{item.nom}</td><td>{item.difficulte}</td><td>{item.nb_pers}</td><td><a href="#">Modifier</a></td><td><a href="#">Supprimer</a></td>
      </tr>
         )})}
      </tbody>
  );
}
}

export default App;