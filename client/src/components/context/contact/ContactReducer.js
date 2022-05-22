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

export default (state, action) => {
	const { contacts } = state
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...contacts],
			}
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: contacts.map((contact) =>
					contact.id === action.payload.id ? action.payload : contact
				),
			}

		case DELETE_CONTACT:
			return {
				...state,
				contacts: contacts.filter((contact) => contact.id !== action.payload),
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			}
		case FILTER_CONTACT:
			return {
				...state,
				filtered: contacts.filter((contact) => {
					return(
                        contact.name.toLowerCase().includes(action.payload) ||
						contact.email.toLowerCase().includes(action.payload)
                    )
				}),
			}
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			}
		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload
			}

		default:
			return state
	}
}
