import React from 'react';

const Feedback = () => {
    return (
        <div className="page">
            <h1>Feedback</h1>
            <p>Här kommer användarnas feedback att visas.</p>

            <div className="feedback-list">
                <div className="feedback-card">
                    <h4>”Fantastisk tjänst!”</h4>
                    <p>– Anna från Stockholm</p>
                </div>
                <div className="feedback-card">
                    <h4>”Enkel att använda och snygg design.”</h4>
                    <p>– Omar från Göteborg</p>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
