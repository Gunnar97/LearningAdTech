// export function create(el, attrs, content) {
//     const node = document.createElement(el);
//
//     Object.entries(attrs || {}).forEach(([name, value]) => {
//         node.setAttribute(name, value);
//     });
//
//     if (typeof content === 'string') {
//         content = document.createTextNode(content);
//     }
//
//     if (content instanceof Node) {
//         node.appendChild(content);
//     }
//
//     return node;
// }




export default function createElement(tag, attributes, ...children) {
    const element = document.createElement(tag);

    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        } else if (Array.isArray(child)) {
            child.forEach(subChild => {
                element.appendChild(subChild);
            });
        }
    });

    return element;
}
