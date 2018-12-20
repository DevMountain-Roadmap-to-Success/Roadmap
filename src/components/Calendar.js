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


class Calendar extends Component {
    constructor() {
        super();
        this.state = { }
    };

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
                    />
                    <AppointmentForm />
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
