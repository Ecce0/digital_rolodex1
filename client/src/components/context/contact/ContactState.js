import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactContext from './ContactContext'
import contactReducer from './ContactReducer'
import axios from 'axios'
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER,
	CONTACT_ERROR
} from '../types'

const ContactState = ({ children }) => {
	const intitialState = {
	 contacts: [],
     current: null,
     filtered: null,
	 error: null
	}

	const [state, dispatch] = useReducer(contactReducer, intitialState)

	//Add Contact
	const addContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/contacts', contact, config)
			dispatch({ 
				type: ADD_CONTACT, 
				payload: res.data 
			})
		} catch (error) {
			dispatch({ 
				type: CONTACT_ERROR,
				payload: error.response.msg
			})
		}
		
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

	const { contacts, current, filtered, error } = state

	return (
		<ContactContext.Provider
			value={{
				contacts,
        current,
        filtered,
		error,
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
