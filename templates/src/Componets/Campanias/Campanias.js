import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { CAMPANIAS_QUERY } from '../../queries';
import { ELIMINAR_CAMPANIA } from '../../mutations';

import Exito from '../Alertas/Exito';
import Paginador from '../Paginador';

class Campanias extends Component{

	limite = 10;

	state ={
		paginador: {
			offset: 0,
			actual: 1
		},
		alerta:{
			mostrar: false,
			mensaje: ''
		}
	}

	paginaAnterior= () => {
		//console.log('anterior');
		this.setState({
			paginador:{
				offset: this.state.paginador.offset - this.limite,
				actual: this.state.paginador.actual - 1
			}
		})
	}

	paginaSiguiente= () => {
		//console.log("siguiente");
		this.setState({
			paginador:{
				offset: this.state.paginador.offset + this.limite,
				actual: this.state.paginador.actual + 1
			}
		})
	}

	render(){
		const { alerta: {mostrar, mensaje} } = this.state;
		const alerta = (mostrar) ? <Exito mensaje={mensaje}/> : '';
		return(
			<Query query={ CAMPANIAS_QUERY } pollInterval={1000} variables={{limite: this.limite, offset: this.state.paginador.offset }}>
				{({ loading, error, data, startPolling, stopPolling }) => {
					if( loading ) return "Cargando...";
					if( error ) return `Error: ${error.message}`;
					//console.log(data.getCampanias);
					//console.log(data);
					return(
						<Fragment>
							<h2 className="text-center">Campañas</h2>
							{ alerta }
							<ul className="list-group">
								{ data.getCampanias.map( item => {
									const {id} = item;

									return(
										<li key={ item.id } className="list-group-item">
										<div className="row justify-content-between align-items-center">
											<div className="col-md-6 d-flex justify-content-between align-items-center">
												{ item.nombre } - { item.idSub }
											</div>
											<div className="col-md-6 f-flex justify-content-end">
												<Link to={`/campania/detalle/${item.id}`} className="btn btn-dark d-block d-md-inline-block mr-2">
													Ver campaña
												</Link>
												<Link to={`/campania/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block mr-2">
													Editar Campaña
												</Link> 

												<Mutation
													mutation={ ELIMINAR_CAMPANIA }
													onCompleted={(data) => {
													//console.log(data);
														this.setState({
															alerta:{
																mostrar: true,
																mensaje: data.eliminarCampania
															}
														}, () => {
														setTimeout(() => {
															this.setState({
																alerta: {
																	mostrar: false,
																	mensaje: ''
																}
															})
															}, 3000)
														})
														}}
														>
														{eliminarCampania => (
															<button className="btn btn-danger d-block d-md-inline-block mr-2"
																onClick={() => {
																	//console.log(id);
																	if(window.confirm('¿Estás seguro que deseas eliminar la campaña?')) {
																		eliminarCampania({
																			variables: { id }
																		})
																	}
																}}
															>
																&times; Eliminar
															</button>
														)}
												</Mutation>

											</div>
										</div>
									</li>
									)
								})}
							</ul>
							<Paginador
								actual={ this.state.paginador.actual }
								totalCampanias={ data.totalCampanias }
								limite={ this.limite }
								paginaAnterior={ this.paginaAnterior }
								paginaSiguiente={ this.paginaSiguiente }
							/>
						</Fragment>
					)
				}}
			</Query>
		)
	}
}

export default Campanias;

