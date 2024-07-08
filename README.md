# EyeNchor

EyeNchor is a JavaScript utility that enhances text content on web pages by applying custom formatting to words based on their length.

## Usage

You can use EyeNchor directly in your browser's developer console. Simply copy and paste the following code snippet:

```javascript
const processWord = (word) => {
    const boldLength = word.length <= 3 ? 1 : word.length <= 6 ? 2 : 3;
    return `<span><strong>${word.slice(0, boldLength)}</strong>${word.slice(boldLength)}</span>`;
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
```

### How It Works

EyeNchor processes text nodes within the `<body>` of your HTML document, excluding `<script>` and `<style>` tags. It identifies words based on whitespace boundaries, applies custom formatting to each word according to its length, and replaces the original text nodes with formatted `<span>` elements.

### Customization

You can customize EyeNchor's behavior by modifying the `processWord` function to adjust how words are formatted based on their length.

```javascript
// Example of customizing the bold length thresholds
const processWord = (word) => {
    const boldLength = word.length <= 4 ? 1 : word.length <= 7 ? 2 : 3; // Adjust thresholds as needed
    return `<span><strong>${word.slice(0, boldLength)}</strong>${word.slice(boldLength)}</span>`;
};
```

## Contributing

Contributions to EyeNchor are welcome! Please fork the repository and submit pull requests with your enhancements.

## License

EyeNchor is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Authors

- [Alex Levy](https://github.com/alexlevy0)

---

This README provides a straightforward way for users to understand how to use and customize EyeNchor directly within their browser's developer console. Adjustments can be made as necessary to better fit your specific project and requirements.
