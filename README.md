# FSD-Slices: A Versatile Slice Generator

Easily generate FSD slices for your project with just a few clicks. Select from pre-defined templates or create your own custom setup.

![Preview](https://raw.githubusercontent.com/SbokyZahodi/fsd-slices/main/res/preview.gif)




## Getting Started

### Choose a Template

Upon installation, select your desired framework template from the extension settings. Currently supported templates include:

- **React**
- **Vue**
- **Svelte**
- **minimal** (only module index and folders)

Each template provides the following file structure:

```plaintext
api/
    index.ts
model/
    index.ts
ui/
    [name].vue (.tsx / .svelte - available depending on the chosen template)
    index.ts
index.ts
```

### Configuration Options `ctrl+, => fsd`


- #### `fsd-slices.template`
  - **Type**: `string`
  - **Default**: `react`
  - **Description**: Template that used to generate slice

- #### `fsd-slices.typescript`
  - **Type**: `boolean`
  - **Default**: `true`
  - **Description**: Generate typescript files instead of javascript?


- #### `fsd-slices.configurable`
  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Ask me what to include in the slice (api, config, model, ui)


- #### `fsd-slices.include`
  - **Type**: `string`
  - **Default**: `api, model, ui, config`
  - **Description**: Folders that included to the slice by default (if configurable / custom is true then this option will be ignored)
