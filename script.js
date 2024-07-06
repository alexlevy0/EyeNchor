const processWord = (word) => {
        const boldLength = word.length <= 3 ? 1 : word.length <= 6 ? 2 : 3;
        return `<span><strong>${word.slice(0, boldLength)}</strong>${word.slice(
                boldLength
        )}</span>`;
};

const processText = (text) => text.split(/\s+/).map(processWord).join(" ");

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) =>
                !["SCRIPT", "STYLE"].includes(node.parentNode.nodeName) &&
                node.textContent.trim()
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT,
});

const nodesToReplace = [];
while (walker.nextNode()) {
        nodesToReplace.push(walker.currentNode);
}

nodesToReplace.forEach((node) => {
        const span = document.createElement("span");
        span.innerHTML = processText(node.textContent);
        node.parentNode.replaceChild(span, node);
});
