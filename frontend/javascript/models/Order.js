class Order {
    constructor(phone, amount1, amount2, amount3, orderDay, orderMonth, orderYear, orderPrice) {
        this.phone = phone;
        this.amount1 = amount1;
        this.amount2 = amount2;
        this.amount3 = amount3;
        this.orderDay = orderDay;
        this.orderMonth = orderMonth;
        this.orderYear = orderYear;
        this.orderPrice = orderPrice;
    }

    // metode til at påføre data i json-format til vores frontend, se profile.js, populateOrders()
    applyData(json) {
        Object.assign(this, json);
    }
}
