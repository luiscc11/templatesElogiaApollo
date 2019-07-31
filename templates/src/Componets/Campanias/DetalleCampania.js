import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { CAMPANIA_QUERY } from '../../queries';

import DetalleVariable from './DetalleVariable';
import BodyMail from './BodyMail';
import MandarMail from './MandarMail';

class DetalleCampania extends Component{
	state={
		variable:{
			nom: '',
			valor: ''
		},
		posicion: 0
	}

	cambioValorVariablePos= (name, value, pos) => {
		//console.log(name);
		//console.log(value);
		//console.log(pos);
		this.setState({
			variable:{
				nom: name,
				valor: value
			},
			posicion: pos
		})
	}

	render(){
		const {id} = this.props.match.params;
		//console.log( id );

		return(
			<Query query={ CAMPANIA_QUERY } variables={{id}}>
				{({loading, error, data}) => {
					if(loading) return 'Cargando...'
					if(error) return `Error: ${error.message}`;
					//console.log(data);
					
					const { nombre, idSub, activa, html, variables } = data.getCampania;
					//console.log(variables);
					return(
						<Fragment>
							<Link to={'/'} className="btn btn-warning">Atrás</Link>
							<h3>Campaña <small>{ nombre }</small></h3>
							<div className="card mb-4">
								<div className="card-body">
									<p>ID Campaña: <strong>{ idSub }</strong></p>
									<p>{ activa }</p>
									<p>
										Variables: <a className="btn btn-outline-info" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
											Ver
										</a>
									</p>
									<div className="collapse" id="collapseExample">
										<table className="table table-bordered">
											<tr>
												<td>Nombre</td>
												<td>Valor</td>
												<td>Editar</td>
											</tr>
											{Object.keys( variables ).map( key => (
												<DetalleVariable
													key={ key }
													index={ key }
													variable={ variables[key] }
													cambioValorVariablePos={ this.cambioValorVariablePos }
												/>
											))}
										</table>

										<MandarMail
											variables={ variables }
											variable={ this.state.variable }
											posicion={ this.state.posicion }
											idCampania={ idSub }
										/>
									</div>

									<div className="card">
									<div className="card-body">
										<BodyMail
											htmlMail={ html }
										/>
									</div>
								</div>	

								</div>
							</div>
						</Fragment>
						
					)
				}}
			</Query>
		)
	}
}

export default DetalleCampania;
