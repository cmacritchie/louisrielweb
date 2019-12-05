import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import EmailForm from './EmailForm'
import { Context as AdminContext } from '../contexts/AdminListContext'

const AdminListWrapper = ({ edit, id, onCancel, initialEmail }) => {

    const { submitAdmin, patchAdmin} = useContext(AdminContext)

    const [email, changeEmail] = useState(initialEmail)

    const submitForm = () => {
        if(edit) {
            patchAdmin(id, email)
            onCancel()
        } else {
            submitAdmin(email)
            changeEmail('')
        }
    }

    const cancel = () => {
        if(edit) {
            onCancel()
        } else {
            changeEmail('')
        }
    }

    return(
        <EmailForm onSubmit={() => submitForm()} 
                        onCancel={() => cancel()}
                        onEmailChange={(val) => changeEmail(val)}
                        email={email} />
    )
}

AdminListWrapper.propTypes = {
    edit: PropTypes.bool.isRequired,
}

AdminListWrapper.defaultProps = {
    initialEmail:'',
}

export default AdminListWrapper
