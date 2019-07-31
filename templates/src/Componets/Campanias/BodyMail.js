import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';

const BodyMail= props => {
	return(
		<Fragment>
			{ ReactHtmlParser( props.htmlMail ) }
		</Fragment>
	)
}

export default BodyMail;
