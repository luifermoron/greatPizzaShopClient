import { createOrder, simulateOrderProcess } from "../api/api";

const isDelivered = (stateOrders) => {
    return !stateOrders.some(stateOrder => stateOrder.state !== 'delivered')
}

const groupByState = (initialArray) => initialArray.reduce(
    (entryMap, e) => entryMap.set(e.state, [...entryMap.get(e.state) || [], e]),
    new Map()
);

const updateConsole = (stateOrders, setPrint) => {
    let console = "STATE OF ORDER:<br/>";
    stateOrders.forEach((value, key, map) => {
        console += `STATE: [${key}] = ${value.length} group of products <br/>`;
    });
    setPrint(console);
}

export const orderProcess = async (orders, reInitOrder, setPrint) => {
    const result = await createOrder(orders);
    if (result && result.data) {
        const TIME = 1000;
        const order = result.data;
        let updatedOrder;
        do {
            const simulateResult = await simulateOrderProcess(order.id);
            updatedOrder = simulateResult.data;
            updateConsole(groupByState(updatedOrder.state_orders), setPrint);

            await new Promise(resolve => setTimeout(resolve, TIME));
        } while (!isDelivered(updatedOrder.state_orders));
    }
    reInitOrder();
}