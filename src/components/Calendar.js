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
