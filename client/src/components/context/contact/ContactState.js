import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './ContactContext'
import contactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
} 
from '../types'

const ContactState = ({ children }) => {
    const intitialState = {
        contacts: [
            {
              id: 1,
              name: "Sarah Watson",  
              email: 'sara@gmail.com',
              phone: '222-222-2222',
              type: 'personal'
            },
            {
              id: 2,
              name: "Jimmy Davis",  
              email: 'jimmy@gmail.com',
              phone: '222-333-3333',
              type: 'professional'
            },
            {
              id: 3,
              name: "Jane Doe",  
              email: 'jane@gmail.com',
              phone: '444-444-4444',
              type: 'personal'
            },
            {
              id: 4,
              name: "Jone Doe",  
              email: 'johnnie@gmail.com',
              phone: '555-555-5555',
              type: 'professional'
            }          

        ]
    }

    const [ state, dispatch ] = useReducer(contactReducer, intitialState)

    //Add Contact

    //Delete Contact 

    //Set Current Contact 

    //Clear Current Contact

    //Update Contact

    //Filter Contacts

    //Clear Filter

    const { contacts } = state
    
    return (
        <ContactContext.Provider 
        value={{
            contacts: contacts
        }}>
            {children}
        </ContactContext.Provider>
    )
}

export default ContactState