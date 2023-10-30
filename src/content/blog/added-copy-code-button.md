---
pubDatetime: 2023-09-23T15:22:00Z
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

After figuring out how to styled the fetched posts published on my Hashnode blog, I wanted to add the "copy code" button.

During my search on how to styled fetch markdown, I found, ["Adding a Copy Code Button in Astro Markdown Code Blocks"](https://timneubauer.dev/blog/copy-code-button-in-astro/), a post by Tim Neubauer.

Very quick, I was able to add the button and get it to work. There is nothing to import or install for this simple button. Tim starts by creating a layout for posts. I already have a layout component so, I just added the script and the styles to the `base.css` file.

Here is how and where I added the script to the Layout.

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

I added Astro's Template Directive `is:inline`, which according to Astro's doc is important because it, "will be rendered in the final output HTML exactly where is it authored".

The last thing, was to add the CSS styles to the `base.css`.

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

The only difference with my code from Tim's is that I added color for the button's font to match my theme colors. And that's it.
