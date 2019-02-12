import {errorCheck, errorMessage, toggle, upper} from './Logic/logic_kim'
import * as actions from '../ducks/reducer'
import * as types from '../ducks/constants'



describe('actions', () => {
  it('should create an action to add a todo', () => {
    const payload = 'Finish tests'
    const expectedAction = {
      payload,
      type: types.ADD_TODO
      
    }
    expect(actions.addTodo(payload)).toEqual(expectedAction)
  })
})

describe('actions', () => {
  it('should return user object', () => {
    const payload = 'user'
    const user = {
      payload,
      type: types.GET_USER
    }
    expect(actions.getUser(payload)).toEqual(user)
  })
})

describe('Should return error response', () => {
  test('if given an incorrect email/password', () => {
      expect(errorCheck()).toEqual(errorMessage);
  })
});

describe('Clicking edit icon', () => {
  test('should return true', () => {
    expect(toggle()).toBe(true)
  })
})


describe('uppercase', () => {
  test('should return value in uppercase', () => {
    expect(upper('kim')).toBe('KIM')
  })
})



