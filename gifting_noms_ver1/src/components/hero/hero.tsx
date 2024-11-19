import styles from './Hero.module.scss';
import '@/app/styles/globals.scss';

import React from 'react';

export default function hero() {
    return (
        <section className={styles.hero}>
            <div className="div-container">
                <h1>Find your perfect Kota and Cake :{'>'}</h1>
            </div>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search for NFTs, categories..."
                />
                <button>Search</button>
            </div>
        </section>
    );
}
