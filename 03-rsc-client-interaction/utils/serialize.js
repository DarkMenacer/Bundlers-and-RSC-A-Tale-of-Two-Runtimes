// Naive serializer: finds Capitalized tags and extracts them as "client components".
export function serialize(html) {
    const components = [];
    let idx = 0;

    // Attrs like key="value" (strings only, for simplicity)
    const parseProps = (attrStr) => {
        const props = {};
        if (!attrStr) return props;
        const regex = /(\w+)="([^"]*)"/g;
        let m;
        while ((m = regex.exec(attrStr))) props[m[1]] = m[2];
        return props;
    };

    // Replace <Comp .../> or <Comp ...></Comp> with <slot data-comp="i"></slot>
    const replaced = html.replace(
        /<([A-Z][A-Za-z0-9]*)\s*([^>]*)\/>|<([A-Z][A-Za-z0-9]*)\s*([^>]*)>(.*?)<\/\3>/gs,
        (_, n1, a1, n2, a2) => {
            const name = n1 || n2;
            const attrs = a1 || a2;
            const props = parseProps(attrs);
            const slot = `<slot data-comp="${idx}"></slot>`;
            components.push({ name, props });
            idx++;
            return slot;
        }
    );

    return { html: replaced, components };
}

export function deserialize(payload, root, REGISTRY) {
    const { entry, i } = payload;
    const slot = root.querySelector(`slot[data-comp="${i}"]`);
    const mount = REGISTRY[entry.name];
    if (!slot || !mount) return;
    const node = mount(entry.props || {});
    slot.replaceWith(node);
}

//Why use link and not script?
//Using <link rel="modulepreload"> allows the browser to fetch and cache the module
export function injectPreloads(urls = []) {
    urls.forEach((u) => {
        const link = document.createElement("link");
        link.rel = "modulepreload";
        link.href = `/src/${u}`;
        document.head.appendChild(link);
    });
}
