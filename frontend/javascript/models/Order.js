// Klasse for order
class Order {
    constructor(
        orderId,
        phone,
        amount1,
        amount2,
        amount3,
        orderDay,
        orderMonth,
        orderYear,
        orderPrice
    ) {
        this.orderId = orderId;
        this.phone = phone;
        this.amount1 = amount1;
        this.amount2 = amount2;
        this.amount3 = amount3;
        this.orderDay = orderDay;
        this.orderMonth = orderMonth;
        this.orderYear = orderYear;
        this.orderPrice = orderPrice;
    }

    applyData(json) {
        Object.assign(this, json);
    }

    changeAmount1 = (amount1) => {
        this.amount1 = amount1;
    };
}
