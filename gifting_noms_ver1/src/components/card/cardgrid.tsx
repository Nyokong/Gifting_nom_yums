export default function card() {
    const colors = ['#ff9999', '#99ccff', '#ffe066', '#b3e6b3']; // Placeholder colors

    return (
        <div>
            <h2>New</h2>
            <div>
                {colors.map((color, index) => (
                    <div key={index} style={{ backgroundColor: color }}>
                        <h3>Card Name {index + 1}</h3>
                        <button>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
