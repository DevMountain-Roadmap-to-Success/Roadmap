import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import { 
Scheduler, 
WeekView, 
Appointments, 
AppointmentTooltip, 
AppointmentForm 
} from '@devexpress/dx-react-scheduler-material-ui';
import Wizard from './functional/Wizard';


class Calendar extends Component {
    constructor() {
        super();
        this.state = {
            blockOne: false,
            blockTwo: false,
            blockThree: false,
        }
    };

    handleBlockPicker = (event) => {
        this.setState(prevState => { return { [event.target.value]: !prevState.event.target.value } })
    };

    handleAddAppt = (event) => {
        this.setState(prevState => { return { blockOne: !prevState.blockOne } })
    };

    displayBlockOne = () => {
        if (this.state.blockOne) {
            return (<Wizard
                // onClick={this.handleBlockPicker()} 
                />)
        }
    }

    displayBlockTwo = () => { };

    displayBlockThree = () => { };


    render() {
        return (
            <div>
                <Scheduler
                    data={[
                        { startDate: '2018-12-20 10:00', endDate: '2018-12-20 11:00', title: 'Meeting' },
                        { startDate: '2018-12-21 18:00', endDate: '2018-12-21 19:30', title: 'Go to a gym' }
                    ]}
                    >
                    <WeekView 
                    startDayHour={4}
                    />
                    <Appointments
                    onDoubleClick={() => this.handleAddAppt}
                    />
                    {/* <AppointmentForm /> */}
                    {/* <Wizard 
                    blockOne={this.state.blockOne}
                    /> */}

                {this.displayBlockOne()}
                </Scheduler>
            </div>
        )
    };
};


const mapDispatchToProps = {}

const mapStatetoProps = (state) => {
    return {

    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Calendar);
