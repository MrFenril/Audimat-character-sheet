
const ItemRow = (idx, data) => `
<tr>
    <td ><input id="name-${idx}" type="text" placeholder="-" value="${data.name}"/></td>
    <td width="10%"><input id="quantity-${idx}" type="number" value="${data.quantity}" /></td>
    <td width="30%"><input id="modifier-${idx}" type="text" placeholder="-" value="${data.modifier}" /></td>
    <td width="10%"><input id="damage-${idx}" type="number" value="${data.damage}"/></td>
    <td width="15%"><input id="type-${idx}" type="text" placeholder="-" value="${data.type}"/></td>
</tr>
`;

function initInventory() {
    document.getElementById("add-item").addEventListener('click', () => {
        const $el = document.querySelector(".inventory-wrapper table tbody")
        const data = { name: '', quantity: 0, modifier: '', damage: 0, type: ''};
        client.inventory.push(data);
        const idx = client.inventory.length - 1;
        $itemComponent = addElement($el, ItemRow(idx, data));
        bindChangeEvent(idx, $itemComponent);
    });

    document.getElementById("remove-item").addEventListener('click', () =>  {
        const $el = document.querySelector(".inventory-wrapper table tbody")
        removeElement($el);
    })

    for (let idx = 0; idx < client.inventory.length; ++idx) {
        const $el = document.querySelector(".inventory-wrapper table tbody")
        const item = client.inventory[idx];
        $itemComponent = addElement($el, ItemRow(idx, item));
        bindChangeEvent(idx, $itemComponent);
    }
}

function bindChangeEvent(idx, component) {
    component.querySelector(`#name-${idx}`).addEventListener('change', (e) => client.inventory[idx].name = e.target.value);
    component.querySelector(`#quantity-${idx}`).addEventListener('change', (e) => client.inventory[idx].quantity = parseInt(e.target.value));
    component.querySelector(`#modifier-${idx}`).addEventListener('change', (e) => client.inventory[idx].modifier = e.target.value);
    component.querySelector(`#damage-${idx}`).addEventListener('change', (e) => client.inventory[idx].damage = parseInt(e.target.value));
    component.querySelector(`#type-${idx}`).addEventListener('change', (e) => client.inventory[idx].type = e.target.value);
}

function clearInventory() {
    client.inventory = [];
    document.querySelector(".inventory-wrapper table tbody").innerHTML = '';
}