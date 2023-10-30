---
pubDatetime: 2023-10-29T15:22:00Z
title: Added Copy Code Button to Code Blocks
postSlug: added-copy-code-button
featured: false
draft: false
tags:
  - astro
  - seedling
ogImage: ""
description: After figuring out how to styled the fetched posst from Hashnode, I needed to add syntax highlighting.
---

After figuring out how to style the fetched posts on my Hashnode blog, I decided to add a “copy code” button.

While searching for how to style fetched markdown, I found a post titled, ["Adding a Copy Code Button in Astro Markdown Code Blocks"](https://timneubauer.dev/blog/copy-code-button-in-astro/), by Tim Neubauer.

It didn’t take me long to add the button and get it working. There’s nothing to import or install for this simple button. Tim starts by creating a layout for posts. Since I already had a layout component, I just added the script to the layout component and styles to the `base.css` file.

Here’s where I added the script to the Layout.

```js
...

</head>
  <body>
    <slot />
    <script is:inline>
      let copyButtonLabel = "Copy Code";
      let codeBlocks = Array.from(document.querySelectorAll("pre"));

      for (let codeBlock of codeBlocks) {
        let wrapper = document.createElement("div");
        wrapper.style.position = "relative";

        let copyButton = document.createElement("button");
        copyButton.className = "copy-code";
        copyButton.innerHTML = copyButtonLabel;

        codeBlock.setAttribute("tabindex", "0");
        codeBlock.appendChild(copyButton);
        // wrap codebock with relative parent element
        codeBlock.parentNode.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);

        copyButton.addEventListener("click", async () => {
          await copyCode(codeBlock, copyButton);
        });
      }

      async function copyCode(block, button) {
        let code = block.querySelector("code");
        let text = code.innerText;

        await navigator.clipboard.writeText(text);

        // visual feedback that task is completed
        button.innerText = "Code Copied";

        setTimeout(() => {
          button.innerText = copyButtonLabel;
        }, 700);
      }
    </script>
  </body>
</html>
```

I used Astro’s Template Directive `is:inline`, which Astro’s doc says is important because it “will be rendered in the final output HTML exactly where it is authored".

Lastly, I added the CSS styles to the `base.css`.

```css
.copy-code {
  position: absolute;
  color: #75f5d9;
  top: 0;
  right: 0;
  background-color: #3730a3;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
}

.copy-code:hover {
  background-color: #312e81;
}
```

The only difference between my code and Tim’s is that I changed the button’s font color to match my theme. And that's it.
