import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { bdd } from './database';

class Form extends React.Component {

    constructor(props){
        super(props);
        this.writeRecetteData = this.writeRecetteData.bind(this);
        this.state ={
            bouton: "Ajouter",
        };
    }

    writeRecetteData (){ 
        var nom = this.refs.nom.value;
        var difficulte = this.refs.diff.value;
        var nb_pers = this.refs.pers.value;
        var cuisson = this.refs.cuisson.value;
        var prep = this.refs.prep.value;
        var type = this.refs.type.value;
        var ingredient = JSON.parse(localStorage.getItem('Ingredient'));
        var materiels = JSON.parse(localStorage.getItem('Materiel'));
        var preparation = JSON.parse(localStorage.getItem('Preparation'));

        console.log(ingredient);

        bdd.ref('Recettes').push({
            nom: nom,
            difficulte: difficulte,
            nb_pers: nb_pers,
            tps_cuisson: cuisson,
            tps_prep: prep,
            type: type,
            ingredient: ingredient,
            materiels: materiels,
            preparation: preparation,


         });
    }

    render() {
        return (
            <div>
                <form>
                    <Image/><br/>   
                    
                    <label>Nom</label><br/>
                    <input type="text" placeholder="Nom" ref="nom"/><br/><br/>

                    <label>Difficulté</label><br/>
                    <input type="text" placeholder="Difficulté" ref="diff"/><br/><br/>
                    <Ingredients/>
                    <Materiaux/>

                    <label>Nombre pers</label><br/>
                    <input type="number" ref="pers"/><br/><br/>

                    <Preparation/>

                    <Tags/>

                    <label>Temps de cuisson</label><br/>
                    <input type="text" ref="cuisson"/><br/><br/>

                    <label>Temps de préparation</label><br/>
                    <input type="text" ref="prep"/><br/><br/>

                    <label>Type</label><br/>
                    <select for="type_select" ref="type">
                    <option></option>
                    <option>Classique</option>
                    <option>Bizarre</option>
                    <option>Tristan est con</option>
                    </select><br/><br/>


                    <Link to="/"><input type="button" value="Retour"/></Link>
                    <input type="button" value={this.state.bouton} onClick={this.writeRecetteData}/>
                </form>
            </div>
        );
    }
}

class Ingredients extends React.Component{

    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.Ingredient = [];
    }

    add(){
        var nom = this.refs.nom.value;
        var qte = this.refs.qte.value;
        var mesure = this.refs.mesure.value;
        if(localStorage.getItem('Materiel') == null){
        
        }
        var prod = {nom :nom,
                    qte : qte,
                    mesure : mesure}
        this.Ingredient.push(prod);
        localStorage.setItem('Ingredient', JSON.stringify(this.Ingredient));
        this.Ingredient = JSON.parse(localStorage.getItem('Ingredient'));
    }

    delete(e){
        var index = e.target.getAttribute('data-key')
        var list = JSON.parse(localStorage.getItem('Ingredient'));
        list.splice(index,1);
        this.setState({
            Ingredient: list
        });
        localStorage.setItem('Ingredient', JSON.stringify(list));
    }

    render(){
        return(
            <div>
                <label>Ingredients</label><br/>
                <input type="text" placeholder="Nom de l'ingredient" ref="nom"/>
                <input type="text" placeholder="Quantité" ref="qte"/>
                <input type="text" placeholder="Unité de mesure" ref="mesure"/>
                <input type="button" value="Ajouter" onClick={this.add.bind(this)}/>
                <br/><br/>
                <ul>
                    {this.Ingredient.map(function(item, index){
                        return(
                            <li key={index}>{item.nom} {item.qte} {item.mesure} item<input type="button" value="supprimer" onClick={this.delete.bind(this)} data-key={index}/></li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

class Materiaux extends React.Component{

    constructor(){
        super();
        this.delete = this.delete.bind(this);
        this.state ={

            Materiel: []
        };
    }

    add(){
        var title = this.refs.title.value;
        if(localStorage.getItem('Materiel') == null){
            var Materiel = [];
            Materiel.push(title);
            localStorage.setItem('Materiel', JSON.stringify(Materiel));
        }
        else{
            var Materiel = JSON.parse(localStorage.getItem('Materiel'));
            Materiel.push(title);
            localStorage.setItem('Materiel', JSON.stringify(Materiel));
        }
        this.setState({
            Materiel: JSON.parse(localStorage.getItem('Materiel'))
        });
    }

    delete(e){
        var index = e.target.getAttribute('data-key')
        var list = JSON.parse(localStorage.getItem('Materiel'));
        list.splice(index,1);
        this.setState({
            Materiel: list
        });
        localStorage.setItem('Materiel', JSON.stringify(list));
    }
    render(){
        return(
            <div>
                <label>Matériel</label><br/>
                <input type="text" placeholder="Nouveau Materiel..." ref="title"/>
                <input type="button" value="Ajouter" onClick={this.add.bind(this)}/>
                <br/><br/>
                <ul>
                    {this.state.Materiel.map(function(Materiels, index){
                        return(
                            <li key={index}>{Materiels} <input type="button" value="supprimer" onClick={this.delete.bind(this)} data-key={index}/></li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

class Preparation extends React.Component{
    constructor(){
        super();
        this.delete = this.delete.bind(this);
        this.state ={

            Preparation: []
        };
    }

    add(){
        var title = this.refs.title.value;
        if(localStorage.getItem('Preparation') == null){
            var Preparation = [];
            Preparation.push(title);
            localStorage.setItem('Preparation', JSON.stringify(Preparation));
        }
        else{
            var Preparation = JSON.parse(localStorage.getItem('Preparation'));
            Preparation.push(title);
            localStorage.setItem('Preparation', JSON.stringify(Preparation));
        }
        this.setState({
            Preparation: JSON.parse(localStorage.getItem('Preparation'))
        });
    }

    delete(e){
        var index = e.target.getAttribute('data-key')
        var list = JSON.parse(localStorage.getItem('Preparation'));
        list.splice(index,1);
        this.setState({
            Preparation: list
        });
        localStorage.setItem('Preparation', JSON.stringify(list));
    }
    render(){
        return(
            <div>
                <label>Préparation</label><br/>
                <input type="text" placeholder="Nouvelle étape..." ref="title"/>
                <input type="button" value="Ajouter" onClick={this.add.bind(this)}/>
                <br/><br/>
                <ul>
                    {this.state.Preparation.map(function(Preparation, index){
                        return(
                            <li key={index}>{Preparation} <input type="button" value="supprimer" onClick={this.delete.bind(this)} data-key={index}/></li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}


class Tags extends React.Component{

    constructor(){
        super();
        this.delete = this.delete.bind(this);
        this.state ={

            Tags: []
        };
    }

    add(){
        var title = this.refs.title.value;
        if(localStorage.getItem('Tags') == null){
            var Tags = [];
            Tags.push(title);
            localStorage.setItem('Tags', JSON.stringify(Tags));
        }
        else{
            var Tags = JSON.parse(localStorage.getItem('Tags'));
            Tags.push(title);
            localStorage.setItem('Tags', JSON.stringify(Tags));
        }
        this.setState({
            Tags: JSON.parse(localStorage.getItem('Tags'))
        });
    }

    delete(e){
        var index = e.target.getAttribute('data-key')
        var list = JSON.parse(localStorage.getItem('Tags'));
        list.splice(index,1);
        this.setState({
            Tags: list
        });
        localStorage.setItem('Tags', JSON.stringify(list));
    }
    render(){
        return(
            <div>
                <label>Tags</label><br/>
                <input type="text" placeholder="Nouveau Tag..." ref="title"/>
                <input type="button" value="Ajouter" onClick={this.add.bind(this)}/>
                <br/><br/>
                <ul>
                    {this.state.Tags.map(function(Tag, index){
                        return(
                            <li key={index}>{Tag} <input type="button" value="supprimer" onClick={this.delete.bind(this)} data-key={index}/></li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

class Image extends React.Component {
    render() {
        return (
            <div>
                <img src="#"/>
                <input type="file" id="image" accept="image/png, image/jpeg"/>
            </div>

        );
    }
}
export default Form;