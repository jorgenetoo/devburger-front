import React from "react"

import PropTypes from 'prop-types'


import { ErrorMessageStyles} from './styles.js'


export function ErrorMessage({children}) {
    return  <ErrorMessageStyles> {children} </ErrorMessageStyles>
        
}

ErrorMessage.propTypes = {
    children: PropTypes.string
}