const SkillRowComponent = (idx, data) => `
<tr>
    <td><input id="name" placeholder="-" value="${data.name}"></input></td>
    <td><input id="stat-${idx}" type="number" value="${data.stat}"/></td>
    <td>
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Edit / Add_Plus">
                <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
        </svg>
    </td>
    <td><input id="comp-${idx}" type="number" value="${data.comp}"/></td>
    <td style="width: 1%;">
        <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.75 7a1.25 1.25 0 1 1 0 2.5H3.25a1.25 1.25 0 0 1 0-2.5h17.5zM20.75 15.5a1.25 1.25 0 1 1 0 2.5H3.25a1.25 1.25 0 1 1 0-2.5h17.5z" fill="#fff"/></svg>
    </td>
    <td id="total-${idx}">${data.stat + data.comp}</td>
</tr>`
/*
    Skill categories:
    - mental
    - physic
    - social
    - general
    */

function initSkillsTables() {
    const skills = Object.entries(client.skills);
    skills.forEach(([key, categoriesData ]) => {
        const $container = document.getElementById(`${key}-skills`);
        // Need to fix this
        const classSelector = key === 'general' ? `table.${key}` : `.${key}`;
        const $table = document.querySelector(classSelector);
        $table.querySelector("#add-btn")
            .addEventListener('click', (e) => {
                const data = {name: '', stat: 0, comp: 0}
                client.skills[key].push(data);
                const idx = client.skills.length;

                const $skillComponent = addSkill($container, SkillRowComponent(idx, data));
                bindCalculation(idx, $skillComponent, data);
            });

        $table.querySelector("#remove-btn")
            .addEventListener('click', () => {
                if (client.skills[key].length === 0) return;
                client.skills[key].pop();
                removeSkill($container)
            });

        categoriesData.forEach((data, idx) => {
            const $skillComponent = addSkill($container, SkillRowComponent(idx, data));
            bindCalculation(idx, $skillComponent, data);
        })
    })
}

function addSkill(el, component) {
    return addElement(el, component);
}

function removeSkill(component) {
    removeElement(component)
}

function bindCalculation(idx, component, data) {
    const $total = component.querySelector(`#total-${idx}`);

    component.querySelector(`#comp-${idx}`).addEventListener("change", (e) => {
        data.comp = e.target.value;
        $total.innerText = parseInt(data.comp) + parseInt(data.stat);
    });

    component.querySelector(`#stat-${idx}`).addEventListener("change", (e) => {
        data.stat = e.target.value;
        $total.innerText = parseInt(data.stat) + parseInt(data.comp);
    })
}