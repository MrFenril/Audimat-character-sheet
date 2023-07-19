function addElement(parent, component) {
    const $template = document.createElement('template');
    $template.innerHTML = component.trim();

    parent.appendChild($template.content);
    return parent.lastChild
}

function removeElement(parent) {
    parent.lastChild.remove();
}