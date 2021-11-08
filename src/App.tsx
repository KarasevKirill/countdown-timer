import React from 'react';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';

function App() {

    const eventDate = new Date();
    eventDate.setFullYear(2021);
    eventDate.setMonth(10);
    eventDate.setDate(8);
    eventDate.setHours(23);
    eventDate.setMinutes(54);
    eventDate.setSeconds(0);

    return (
        <div className="App">
            <CountdownTimer eventDate={eventDate} />
        </div>
    );
}

export default App;
