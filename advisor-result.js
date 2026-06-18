window.onload = function () {

let product  = localStorage.getItem("p_product");
let rawPrice = localStorage.getItem("p_price");
console.log("Stored price:", rawPrice);

let price = parseFloat(rawPrice);
console.log("Parsed price:", price);
let platform = localStorage.getItem("p_platform");

if (!product || !price) {
    product = "Sample Product";
    price = 50000;
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let amazon   = price;
let flipkart = price - random(200, 1500);
let reliance = price - random(300, 1200);
let local    = price - random(500, 1800);


amazon = Math.max(amazon, 100);
flipkart = Math.max(flipkart, 100);
reliance = Math.max(reliance, 100);
local = Math.max(local, 100);


let bestPrice = Math.min(amazon, flipkart, reliance, local);
let bestStore =
    bestPrice === amazon ? "Amazon" :
    bestPrice === flipkart ? "Flipkart" :
    bestPrice === reliance ? "Reliance Digital" :
    "Local Store";

let saved = Math.round(price - bestPrice);
let emi = Math.round(bestPrice / 12);

function fmt(n) {
    return "₹" + n.toLocaleString("en-IN");
}


let output = `<div class="main-card">`;

output += `
<div class="header">
    <h2>${product}</h2>
    <p>Platform: ${platform}</p>
</div>
`;

output += `<div class="price-box">`;

[
    { name: "Amazon", price: amazon },
    { name: "Flipkart", price: flipkart },
    { name: "Reliance Digital", price: reliance },
    { name: "Local Store", price: local }
].forEach((s, i) => {

    let isBest = s.price === bestPrice;

    output += `
    <div class="row ${isBest ? "best-row" : ""}">
        <div>
            <div class="store">${s.name}</div>
            ${isBest ? `<div class="badge">Best Deal</div>` : ""}
        </div>

        <div class="row-right">${fmt(s.price)}</div>
    </div>

    ${i !== 3 ? `<div class="divider"></div>` : ""}
    `;
});

output += `</div>`;

output += `
<div class="highlight">
    <div>${bestStore}</div>
    <div>${fmt(bestPrice)}</div>
    <div>Save ${fmt(saved)}</div>
</div>
`;

output += `
<div class="info-box">
    EMI: ${fmt(emi)} / month
</div>
`;

output += `<div class="note">💡 Smart recommendation based on market variation</div>`;
output += `</div>`;

document.getElementById("result").innerHTML = output;
};