import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './share.css';

const Header = () => {
	return(
		<Fragment>

			<nav id="cabecera" className="navbar navbar-expand-lg navbar-dark justify-content-between d-flex mb-4">
				<div className="container">
					<Link to="/" className="navbar-brand text-light font-weight-bold">
						<img src="https://www.banamex.com/sitios/campanas/tc/logociti.png" alt="Citibanamex"/>
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navegacion">
						<ul className="navbar-nav ml-auto text-right">
							<li className="nav-item active">
								<Link to="/campania/nueva" className="btn btn-light">
									Nueva Campaña
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</Fragment>
	)
}

export default Header;