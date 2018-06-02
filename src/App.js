import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';

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
      sort: true
    }, {
      dataField: 'manufacturer',
      text: 'Manufacturer',
      sort: true
    }]
  }

  componentDidMount() {
    axios.get('https://swapi.co/api/starships/')
      .then(response => {
        this.setState({
          products: response.data.results
        });
      });
  }
  
  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ this.state.products } 
        columns={ this.state.columns } 
        filter={ filterFactory() }/>
      </div>
    );
  }
}

export default App;