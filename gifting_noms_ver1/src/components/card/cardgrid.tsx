import styles from './CardGrid.module.scss';

export default function card() {
    const colors = ['#ff9999', '#99ccff', '#ffe066', '#b3e6b3']; // Placeholder colors

    return (
        <section className={styles.cardGrid}>
            <h2>New</h2>
            <div className={styles.grid}>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        style={{ backgroundColor: color }}
                    >
                        <div className={styles.image}></div>
                        <h3>Card Name {index + 1}</h3>
                        <p>Collection info</p>
                        <button className={styles.button}>Add to cart</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
