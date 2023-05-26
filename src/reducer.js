import {
	SET_LOADING,
	SET_STORIES,
	REMOVE_STORY,
	HANDLE_PAGE,
	HANDLE_SEARCH
} from './actions'

const reducer = (state, { type, payload }) => {
	switch (type) {
		case SET_LOADING:
			return { ...state, isLoading: true }
		case SET_STORIES:
			return {
				...state,
				isLoading: false,
				hits: payload.hits,
				nbPages: payload.nbPages
			}
		case REMOVE_STORY:
			return {
				...state,
				hits: state.hits.filter(story => payload !== story.objectID)
			}
		case HANDLE_SEARCH:
			return {
				...state,
				query: payload,
				page: 0
			}
		case HANDLE_PAGE:
			let nextPage
			if (payload === 'inc') {
				nextPage = state.page + 1
				if (nextPage === state.nbPages) nextPage = 0
			} else {
				nextPage = state.page - 1
				if (nextPage === -1) nextPage = state.nbPages - 1
			}
			return {
				...state,
				page: nextPage
			}
		default:
			throw new Error(`There is no such action type! ${type}`)
	}
}
export default reducer
