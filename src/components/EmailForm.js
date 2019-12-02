import React, { useState } from 'react'
import PropTypes from 'prop-types'

const EmailForm = ({ onSubmit, onCancel, onEmailChange,  email, id}) => {
    return (
        <>
            <td><input value={email} onChange={e => onEmailChange(e.target.value)} /></td>
            <td></td>
            <td><button onClick={()=>onSubmit()}>Submit</button></td>
            <td><button onClick={()=>onCancel()}>Cancel</button></td>
        </>
    )
}

EmailForm.propTypes = {
   email: PropTypes.string,
   onSubmit: PropTypes.func,
   onCancel: PropTypes.func,
   onEmailChange: PropTypes.func
}

export default EmailForm
