import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { ACTUALIZAR_CAMPANIA } from '../../mutations';

import Variable from './Variable';

import { quitarEspacio } from '../../helpers';

class FormularioEditar extends Component{
	state= {
		campania: this.props.campania,
		error: false,
		edoBoton: true,
		variables: this.props.campania.variables
	}

	nuevaVariable = () => {
		//console.log('nueva variable');
		this.setState({
			variables: this.state.variables.concat([{nom: '', valor: ''}])
		});
	}

	quitarCampo = i => () => {
		//console.log(`click en eliminar ${i}`);
		this.setState({
			variables: this.state.variables.filter((variables, index) => i !== index)
		});
		this.setState({
			campania:{
				...this.state.campania,
				variables: this.state.variables.filter((variables, index) => i !== index)
			}
			
		})
	}

	cambiarVariable = ( index, name, valor ) => {

		let variables = this.state.variables;

		variables[index][name] = quitarEspacio(valor);

		this.setState({
			variables
		});
		this.setState({
			campania:{
				...this.state.campania,
				variables: this.state.variables
			}
		})
	}

	render(){

		const { nombre, idSub, html, activa } = this.state.campania;
		//console.log(activa)

		return(
			<Fragment>
				<Mutation
					mutation={ ACTUALIZAR_CAMPANIA }
					onCompleted={ () => this.props.refetch().then(() => {
						this.props.history.push('/')
					})}
				>
					{actualizarCampania => (

						<form onSubmit={e => {
							e.preventDefault();

							const { nombre, idSub, html, activa } = this.state.campania;

							const input= {
								id: this.props.id,
								nombre,
								idSub: Number(idSub),
								html,
								activa,
								variables: this.state.variables
							}

							//console.log(input);

							actualizarCampania({
								variables: { input }
							})

						}}>
						<div className="row justify-content-center">
							<div className="col-md-8 m-3">

								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Nombre campaña</label>
										<input
											type="text"
											className="form-control"
											placeholder="Nombre"
											defaultValue={ nombre }
											onChange={e => {
												this.setState({
													campania:{
														...this.state.campania,
														nombre: e.target.value
													}
												})
											}}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>CID</label>
										<input 
											type="number"
											className="form-control"
											placeholder="CID"
											defaultValue={ idSub }
											onChange={e => {
												this.setState({
													campania:{
														...this.state.campania,
														idSub: e.target.value
													}
												})
											}}
										/>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-12">
										<label>HTML</label>
										<textarea
											type="text"
											name="html"
											cols="30"
											rows="10"
											className="form-control"
											placeholder="<html></html>"
											defaultValue={ html }
											onChange={ e => {
												this.setState({
													campania:{
														...this.state.campania,
														html: e.target.value
													}
												});
											}}
										>
										</textarea>
									</div>
								</div>

								<div className="form-row">
									<div className="form-group col-md-12">
										<label>Estatus</label>
										<select 
											className="form-control"
											value={ activa }
											onChange={e => {
												this.setState({
													campania:{
														...this.state.campania,
														activa: e.target.value
													}
												})
											}}
										>
												<option value="">Elegir...</option>
												<option value="ACTIVADA">ACTIVADA</option>
												<option value="DESACTIVADA">DESACTIVADA</option>
										</select>
									</div>
								</div>

								<div className="row">
									{this.state.variables.map( (variables, index) => (
										<Variable
											key={ index + 1 }
											item={ index }
											quitarCampo={ this.quitarCampo }
											variables={ this.state.variables[index] }
											cambiarVariable={ this.cambiarVariable }
										/>
									))}
								</div>
								
								
								<div className="p-3 d-flex justify-content-center">
									<button
										onClick={this.nuevaVariable}
										type="button"
										className="btn btn-warning">
											+ Agregar Variable
									</button>
								</div>

								<button
									className="btn btn-success float-right"
								>
										Editar campaña
								</button>

							</div>
						</div>
						</form>
					)}
				</Mutation>
			</Fragment>
		)
	}
}

export default withRouter(FormularioEditar);