import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Header from './Componets/Shares/Header';
import Campanias from './Componets/Campanias/Campanias';
import NuevaCampania from './Componets/Campanias/NuevaCampania';
import EditarCampania from './Componets/Campanias/EditarCampania';
import DetalleCampania from './Componets/Campanias/DetalleCampania';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) =>{
    console.log('GrsphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

function App() {
  return (
    <ApolloProvider client={ client }>
      <Router>
        <Fragment>
          <Header/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={ Campanias } />
              <Route exact path="/campania/nueva" component={ NuevaCampania } />
              <Route exact path="/campania/editar/:id" component={ EditarCampania } />
              <Route excat path="/campania/detalle/:id" component={ DetalleCampania } />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
