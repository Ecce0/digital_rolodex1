import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './ContactContext'
import contactReducer from './ContactReducer'
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER,
} from '../types'

const ContactState = ({ children }) => {
	const intitialState = {
		contacts: [
			{
				id: 1,
				name: 'Sarah Watson',
				email: 'sara@gmail.com',
				phone: '222-222-2222',
				type: 'personal',
			},
			{
				id: 2,
				name: 'Jimmy Davis',
				email: 'jimmy@gmail.com',
				phone: '222-333-3333',
				type: 'professional',
			},
			{
				id: 3,
				name: 'Jane Doe',
				email: 'jane@gmail.com',
				phone: '444-444-4444',
				type: 'personal',
			},
			{
				id: 4,
				name: 'Jone Doe',
				email: 'johnnie@gmail.com',
				phone: '555-555-5555',
				type: 'professional',
			},
		],
    current: null,
    filtered: null
	}

	const [state, dispatch] = useReducer(contactReducer, intitialState)

	//Add Contact
	const addContact = (contact) => {
		contact.id = uuidv4()
		dispatch({ type: ADD_CONTACT, payload: contact })
	}

	//Delete Contact
  const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id })
	}

	//Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

	//Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

	//Update Contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }

	//Filter Contacts
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text })
  }

	//Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

	const { contacts, current, filtered } = state

	return (
		<ContactContext.Provider
			value={{
				contacts,
        current,
        filtered,
				addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        clearFilter,
        filterContact
			}}
		>
			{children}
		</ContactContext.Provider>
	)
}

export default ContactState
