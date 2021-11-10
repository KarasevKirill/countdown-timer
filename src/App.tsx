import React from 'react';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';

function App() {

    const eventDate = new Date();
    eventDate.setFullYear(2021);
    eventDate.setMonth(10);
    eventDate.setDate(10);
    eventDate.setHours(19);
    eventDate.setMinutes(35);
    eventDate.setSeconds(0);

    return (
        <div className="App">
            <CountdownTimer eventDate={eventDate} />
        </div>
    );
}

export default App;
