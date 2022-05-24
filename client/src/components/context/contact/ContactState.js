import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import ContactContext from './ContactContext'
import ContactReducer from './ContactReducer'
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types'


export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext)
  return [state, dispatch]
}


// Get Contacts
export const getContacts = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts')

    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response
    })
  }
}

// Add Contact
export const addContact = async (dispatch, contact) => {
  try {
    const res = await axios.post('/api/contacts', contact)

    dispatch({
      type: ADD_CONTACT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response
    })
  }
}

// Delete Contact
export const deleteContact = async (dispatch, id) => {
  try {
    await axios.delete(`/api/contacts/${id}`)

    dispatch({
      type: DELETE_CONTACT,
      payload: id
    })
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response
    })
  }
}

// Update Contact
export const updateContact = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact)

    dispatch({
      type: UPDATE_CONTACT,
      payload: res.data
    })
  } catch (err) {
    console.log(err.response)
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response
    })
  }
}

// Clear Contacts
export const clearContacts = (dispatch) => {
  dispatch({ 
	  type: CLEAR_CONTACTS 
    })
}

// Set Current Contact
export const setCurrent = (dispatch, contact) => {
  dispatch({ 
	  type: SET_CURRENT, 
	  payload: contact 
	})
}

// Clear Current Contact
export const clearCurrent = (dispatch) => {
  dispatch({ 
	  type: CLEAR_CURRENT 
	})
}

// Filter Contacts
export const filterContacts = (dispatch, text) => {
  dispatch({ 
	  type: FILTER_CONTACTS, 
	  payload: text 
	})
}

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ 
	  type: CLEAR_FILTER 
	})
}

const ContactState = ({children}) => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: [],
    error: null
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState)

  return (
    <ContactContext.Provider value={{ state: state, dispatch }}>
      {children}
    </ContactContext.Provider>
  )
}

export default ContactState