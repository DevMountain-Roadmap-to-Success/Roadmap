const {weekday} = require('../src/components/calendar/DayView')
const {est, render, click, expect} = require('jest')
const SideBar = require('../components/functional/SideBar')
const React = require('react')
const {MemoryRouter} = require('react-router-dom')

const reducers = require('../ducks/reducers');

test('reducers', () => {
  let state;
  state = reducers(undefined, {});
  expect(state).toEqual({user:{},allTasks:[],todo:{},open:false,position:[],alert:false});
});

describe('#weekday', function() {
    it('Make sure that the return is right for a few dates.', function() {
     
    });
})

est("it expands when the button is clicked", () => {
    render(<SideBar />);
    click();
    expect();
  });
  
  // fixed!
  test("it expands when the button is clicked", () => {
    render(
      <MemoryRouter>
        <SideBar />
      </MemoryRouter>
    );
    click();
    expect();
  });