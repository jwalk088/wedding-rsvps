function rsvpReducer(state, action) {
  const initialState = action.initialState;
  const guestId = action.guestId;
  const value = action.value;
  const field = action.field;

  const rsvp = state[guestId] || { guestId };

  if (initialState) {
    return action.initialState;
  }

  return {
    ...state,
    [guestId]: { ...rsvp, [field]: value },
  };
}

export default rsvpReducer;
