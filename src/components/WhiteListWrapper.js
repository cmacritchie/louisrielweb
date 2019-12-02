import React, { useContext, useState} from 'react'
import PropTypes from 'prop-types'
import EmailForm from './EmailForm'
import { Context as WhiteListContext } from '../contexts/WhiteListContext'

const WhiteListWrapper = ({ edit, id, onCancel, initialEmail }) => {
    
    const { submitWhiteList, patchWhiteList } = useContext(WhiteListContext)

    const [email, changeEmail] = useState(initialEmail)

    const submitForm =()=> {

        if(edit){
            patchWhiteList(id, email)
            onCancel()
        } else {
            submitWhiteList(email)
            changeEmail('')
        }
    }

    const cancel = () => {
        if(edit){
            onCancel()
        } else {
            changeEmail('')
        }
    }
    

    return (
        <EmailForm onSubmit={() => submitForm()} 
                       onCancel={() => cancel()}
                       onEmailChange={(val)=>changeEmail(val)}
                       email={email} />
    )
}

WhiteListWrapper.propTypes = {
    edit: PropTypes.bool.isRequired,
 }

WhiteListWrapper.defaultProps = {
    initialEmail:'',
}

export default WhiteListWrapper
