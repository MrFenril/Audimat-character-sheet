
const ItemRow = `
<tr>
    <td ><input type="text" placeholder="-"/></td>
    <td width="10%"><input type="number" value="0" /></td>
    <td width="30%"><input type="text" placeholder="-" /></td>
    <td width="10%"><input type="number" value="0" /></td>
    <td width="15%"><input type="text" placeholder="-"/></td>
</tr>
`;

console.log(document.getElementById("add-item"));

document.getElementById("add-item").addEventListener('click', () => {
    const $el = document.querySelector(".inventory-wrapper table tbody")
    console.log("here");
    addElement($el, ItemRow);
});

document.getElementById("remove-item").addEventListener('click', () =>  {
    const $el = document.querySelector(".inventory-wrapper table tbody")
    removeElement($el);
})

