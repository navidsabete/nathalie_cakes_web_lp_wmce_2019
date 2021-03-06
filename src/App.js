import React from 'react';
import './App.css';
import { confirmAlert } from 'react-confirm-alert'; // Import

import 'react-confirm-alert/src/react-confirm-alert.css';

import { bdd } from './database';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Input, Table, Divider, Button, Rate, Icon} from 'antd';

const Search = Input.Search;

class App extends React.Component{

  constructor(props) {
    super(props);
    this.recherche = this.recherche.bind(this);
    this.state = {recette: [], donnees: [], tmp_recette: []};
     this.columns = [{
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: image => (
        <img src={image} alt="photo" style={{height: "100px"}}/>
      )
    }, {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
    }, {
      title: 'Difficulté',
      dataIndex: 'difficulte',
      key: 'difficulte',
      render : difficulte => (
          <Rate value={difficulte}/>
      ),
    }, {
      title: 'Action',
      key: 'action',
      dataIndex: '',
      render: (data) => (
        <span>
            <Link to={"/edit/"+  data.id}><Button type="primary" >Modifier</Button></Link>
          <Divider type="vertical" />
          <Button type="danger" onClick={this.Supprimer.bind(data.nom, data.id, data.nom)}>Supprimer</Button>
        </span>
      ),
    }];
     this.Supprimer=this.Supprimer.bind(this);
}

Supprimer(id, nom, index) {
    confirmAlert({
        title: 'Supprimer une recette',
        message: 'Voulez vous vraiment supprimer cette recette: ' + nom,
        buttons: [
            {
                label: 'Supprimer',
                onClick: () => {
                    bdd.ref(`/Recettes/recette_${id}`).remove();
                    console.log('id : '+id);
                    console.log('nom : '+nom);
                    console.log('index : '+index);

                    bdd.ref('/Recettes/').once('value', (snapshot)=> {
                            var data = snapshot.val();
                            let recettes = Object.values(data);
                            this.setState({recette: recettes});
                        }
                    );


                }
            },
            {
                label: 'Annuler',

            }
        ]
    });

}

recherche(value){
  let search = this.state.tmp_recette.filter(({nom})=> nom.includes(value) || nom.includes(value.toLowerCase()) || nom.includes(value.substring(0,1).toUpperCase()+value.substring(1)));
  this.setState({recette: search});
}

  componentDidMount(){
    bdd.ref('/Recettes/').once('value', (snapshot)=> {
      var data = snapshot.val();
      let recettes = Object.values(data);
      this.setState({recette: recettes, tmp_recette: recettes});
    }     
  );
  }
 
  render() {
    return(
        <div className="pos">
          <Search placeholder="Recherche..." onSearch={this.recherche} enterButton style={{width: "200px",marginRight:"10px"}}/>
            <Link to="/add"><Button><Icon type="plus-circle" /></Button></Link>
            <Table columns={this.columns} dataSource={this.state.recette} style={{marginTop:"20px"}}/>

        </div>
    );
  }
}

export default App;