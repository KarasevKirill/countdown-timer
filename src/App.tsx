import React from 'react';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';

function App() {

    const rnd = Math.floor(Math.random() * 10) + 1;
    const eventDate = new Date();
    const date = eventDate.getDate() + rnd;

    eventDate.setDate(date);
    eventDate.setHours(23);
    eventDate.setMinutes(15);
    eventDate.setSeconds(0);

    const eventTitle = 'До начала осталось:';

    return (
        <div 
            className="App" 
            style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh', 
                minWidth: '100wh'
            }}>
            <CountdownTimer eventDate={eventDate} eventTitle={eventTitle} />
        </div>
    );
}

export default App;
