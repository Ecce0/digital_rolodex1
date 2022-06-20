import React, { useEffect } from 'react'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'
import { getContacts, useContacts } from '../context/contact/ContactState'

const Contacts = () => {
	const [ contactState, contactDispatch ] = useContacts()
	const { contacts, filtered, loading } = contactState
	
	
	useEffect(() => {
		getContacts(contactDispatch)
		
	}, [contactDispatch])

	if (contacts === 0 && !loading) {
		return <h4>Please add a contact</h4>
	}

	return (
		<div>
		{ contacts !== null && !loading ? 
		   filtered.length !== 0 ? 
			 filtered.map((contact) => (
						<ContactItem key={contact._id} contact={contact} />
				  ))
				: contacts.map((contact) => (
						<ContactItem key={contact._id} contact={contact} />
						
				  )) 
			:
		  <Spinner />
		}		
		</div>
	)
}

export default Contacts
