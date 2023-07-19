const CapacityComponent = (idx, data) => `
<div class="content-row capacity-row">
    <div class="capacity">
        <div class="capacity-head">
            <div class="name">
                <label>Nom</label>
                <input id="capacity-${idx}-name" type="text" placeholder="-" value=${data.name}></input>
            </div>
            <div class="name" >
                <label>Val. Stat</label>
                <input id="capacity-${idx}-stat" type="number" value=${data.stat} min="0"></input>
            </div>
        </div>
        <div class="capacity-description">
            <p><label>Description: </label></p>
            <textarea spellchecl=false id="capacity-${idx}-desc" value=${data.desc}></textarea>
        </div>
    </div>
</div>
`

function InitCapacities() {
    const capacities = client.capacities;

    const $el = document.querySelector(".capacities .capacity-container");

    document.querySelector("#add-capacity").addEventListener("click", () => {
        const data = { name: '', stat: 0, desc: ''};
        client.capacities.push(data)
        const idx = client.capacities.length - 1
        $capacityComponent = addElement($el, CapacityComponent(idx, data));

        bindChangeEvent(idx, $capacityComponent);
    });

    document.querySelector("#remove-capacity").addEventListener("click", () => {
        removeElement($el);
    });

    for (let idx = 0; idx < capacities.length; ++idx) {
        const capacity = capacities[idx];
        const $capacityComponent = addElement($el, CapacityComponent(idx, capacity));
        bindChangeEvent(idx, $capacityComponent);
    }
}

function bindChangeEvent(idx, component) {
    component.querySelector(`#capacity-${idx}-name`).addEventListener('change', e => { client.capacities[idx].name = e.target.value; console.log(e.target.value, client.capacities, idx) });
    component.querySelector(`#capacity-${idx}-stat`).addEventListener('change', e => client.capacities[idx].stat = parseInt(e.target.value));
    component.querySelector(`#capacity-${idx}-desc`).addEventListener('change', e => client.capacities[idx].desc = e.target.value);
}

function clearCapacities() {
    client.capacities = [];
    const $el = document.querySelector(".capacities .capacity-container");
    $el.innerHTML = '';
}