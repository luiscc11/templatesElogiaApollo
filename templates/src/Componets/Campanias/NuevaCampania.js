import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { NUEVA_CAMPANIA } from '../../mutations';

import Variable from './Variable';

import { quitarEspacio } from '../../helpers';

class NuevaCampania extends Component{
	state= {
		campania:{
			nombre: '',
			idSub: '',
			html: '',
			activa: "ACTIVADA"
		},
		error: false,
		edoBoton: true,
		variables: []
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
		return(
			<Fragment>
				<h2 className="text-center">Nueva campaña</h2>
				<div className="row justify-content-center">
					<div className="col-md-8 m-3">

						<div className="form-row">
							<div className="form-group col-md-6">
								<label>Nombre campaña</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									onChange={e => {
										this.setState({
											campania: {
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
									onChange={e => {
										this.setState({
											campania: {
												...this.state.campania,
												idSub: Number(e.target.value)
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
									onChange={e => {
										this.setState({
											campania: {
												...this.state.campania,
												html: e.target.value
											}
										})
									}}
								>
								</textarea>
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

						<Mutation
							mutation={ NUEVA_CAMPANIA }
							onCompleted={ () => this.props.history.push('/') }
						>
								{nuevaCampania => (
									<button
										className="btn btn-success float-right"
										onClick={e => {
											const input = this.state.campania;
											//console.log(input);
											nuevaCampania({
												variables: { input }
											})
										}}
									>
											Guardar campaña
									</button>
								)}
						</Mutation>

					</div>
				</div>
			</Fragment>
		)
	}
}

export default withRouter(NuevaCampania);