import React from 'react';

export default function hero() {
    return (
        <section>
            <div className="div-container">
                <h1>Find your perfect Kota and Cake :{'>'}</h1>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Search for NFTs, categories..."
                />
                <button>Search</button>
            </div>
        </section>
    );
}
