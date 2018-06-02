import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';

class App extends Component {
  state = {
    products: [], 
    columns: [{
      dataField: 'name',
      text: 'Name',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'model',
      text: 'Model',
      filter: textFilter(),
      sort: true
    }, {
      dataField: 'manufacturer',
      text: 'Manufacturer',
      filter: textFilter(),
      sort: true
    },{
      dataField: 'cost_in_credits',
      text: 'Cost (credits)',
      filter: textFilter(),
      sort: true,
    }
    ,{
      dataField: 'max_atmosphering_speed',
      text: 'Speed',
      filter: textFilter(),
      sort: true
    }
    ,{
      dataField: 'hyperdrive_rating',
      text: 'Hyperdrive rating',
      filter: textFilter(),
      sort: true
    }
    ,{
      dataField: 'MGLT',
      text: 'MGLT',
      filter: textFilter(),
      sort: true
    }
    ,{
      dataField: 'starship_class',
      text: 'Starship class',
      filter: textFilter(),
      sort: true
    },{
      dataField: 'created',
      text: 'Created',
      filter: textFilter(),
      sort: true
    }]
    
  }

  componentDidMount() {

    axios.all([
      axios.get('https://swapi.co/api/starships/'),
      axios.get('https://swapi.co/api/starships/?page=2'),
      axios.get('https://swapi.co/api/starships/?page=3'),
      axios.get('https://swapi.co/api/starships/?page=4')
    ])
    .then(axios.spread((firstResponse, secondResponse, thirdResponse, fourthResponse) => {
      var firstPage = firstResponse.data.results;
      var secondPage = secondResponse.data.results;
      var thirdPage = thirdResponse.data.results;
      var fourthPage = fourthResponse.data.results;
              this.setState({
                products: firstPage.concat(secondPage, thirdPage, fourthPage)
              });
          })
     )
  }
  
  render() {
    return (
      <div className="container" style={{ marginTop: 50, marginLeft: 5 }}>
      <h1>StarWars - starships table </h1>
        <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ this.state.products } 
        columns={ this.state.columns }
        filter={ filterFactory() }
        pagination={ paginationFactory() }/>
      </div>
    );
  }
}

export default App;