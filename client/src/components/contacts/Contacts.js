import React, { useEffect } from 'react'
import ContactItem from './ContactItem'
import Spinner from '../layout/Spinner'
import { getContacts, useContacts } from '../context/contact/ContactState'

const Contacts = () => {
	const [ contactState ] = useContacts()
	const { contacts, filtered, loading } = contactState
		
	useEffect(() => {
		getContacts()
		//eslint-disable-next-line
	}, [])

	if (contacts === 0 && !loading) {
		return <h4>Please add a contact</h4>
	}

	return (
		<>
		{ contacts !== null && !loading ? 
		   filtered !== null
				? filtered.map((contact) => (
						<ContactItem key={contact._id} contact={contact} />
				  ))
				: contacts.map((contact) => (
						<ContactItem key={contact._id} contact={contact} />
				  )) 
			:
		  <Spinner />
		}
		
		</>
	)
}

export default Contacts
