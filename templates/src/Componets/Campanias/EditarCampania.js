import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { CAMPANIA_QUERY } from '../../queries';

import FormularioEditar from './FormularioEditar';

class EditarCampania extends Component{
	render(){
		const {id} = this.props.match.params;
		return(
			<Fragment>			
				<h2 className="text-center">Editar campaña</h2>
				<Query query={ CAMPANIA_QUERY } variables={{id}}>
					{({loading, error, data, refetch}) => {
						if( loading ) return 'Cargando...';
						if( error ) return `Error: ${error.message}`;
						//console.log(data);
						const dataCampania= data.getCampania;
						return(
							<FormularioEditar
								campania={ dataCampania }
								id={ id }
								refetch={ refetch }
							/>
						)
					}}
				</Query>
			</Fragment>
		)
	}
}

export default EditarCampania;