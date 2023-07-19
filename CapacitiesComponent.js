document.querySelector("#add-capacity").addEventListener("click", () => {
    const $el = document.querySelector(".capacities .capacity-container");
    addElement($el, CapacityComponent);
});

document.querySelector("#remove-capacity").addEventListener("click", () => {
    const $el = document.querySelector(".capacity-container");
    removeElement($el);
});

/* Dynamicly Generated html */

const CapacityComponent = `
<div class="content-row capacity-row">
    <div class="capacity">
        <div class="capacity-head">
            <div class="name" >
                <label>Nom</label>
                <input type="text" placeholder="-" ></input>
            </div>
            <div class="name" >
                <label>Val. Stat</label>
                <input type="number" value="0" min="0"></input>
            </div>
        </div>
        <div class="capacity-description">
            <p><label>Description: </label></p>
            <textarea></textarea>
        </div>
    </div>
</div>
`