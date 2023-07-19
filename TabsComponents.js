let $prevBtn;
let $tab;
let $nextBtn;

function initTabs() {
    $prevBtn = document.querySelector("#prev");
    $nextBtn = document.querySelector("#next");
    $tab = document.querySelector("#tab-title");
    $general = document.querySelector("#general-tab");
    $skills = document.querySelector("#skills-tab");
    $inventory = document.querySelector("#inventory-tab");

    let tabIdx = 0;
    const tabs = [
        { title: "Generale", $el: $general },
        { title: "Competences et capacites", $el: $skills },
        { title: "Inventaire", $el: $inventory }
    ]
    console.log(tabIdx, $nextBtn.classList);

    $nextBtn.addEventListener("click", () => {
        if ($nextBtn.classList.contains("hide")) return;
        if (tabIdx + 1 === tabs.length - 1) $nextBtn.classList.add("hide");

        $prevBtn.classList.remove("hide");

        const tab = tabs[tabIdx];
        const toDisplayTab = tabs[tabIdx + 1];

        $tab.textContent = toDisplayTab.title;

        tab.$el.classList.add("hidden");
        toDisplayTab.$el.classList.remove("hidden");

        ++tabIdx;
    })

    $prevBtn.addEventListener("click", () => {

        if ($prevBtn.classList.contains("hide")) return;
        if (tabIdx - 1 <= 0) $prevBtn.classList.add("hide");
        $nextBtn.classList.remove("hide");

        const currentTab = tabs[tabIdx];
        const toDisplayTab = tabs[tabIdx - 1];

        $tab.textContent = toDisplayTab.title;

        currentTab.$el.classList.add("hidden");
        toDisplayTab.$el.classList.remove("hidden");

        --tabIdx;
    })

}