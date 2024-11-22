import React from 'react';

export default function hero() {
    return (
        <section className="hero-component">
            <div className="div-container">
                <h1>Find your perfect Kota and Cake :{'>'}</h1>
            </div>
            <div className="div-row-container">
                <input
                    type="text"
                    placeholder="Find what you're craving..."
                    className="hov-input"
                />
                <button className="hov-button">Search</button>
            </div>
        </section>
    );
}
