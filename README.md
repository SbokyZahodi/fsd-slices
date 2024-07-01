# FSD-Slices: The Slice Generator

### Easily generate FSD slices for your project with just a few clicks.

![Preview](https://raw.githubusercontent.com/SbokyZahodi/fsd-slices/main/res/preview.gif)

## Features
### 🍰 **Create Slices** (custom or preset)
### 🎨 **Create Segments**

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

### Configuration

- #### `fsd-slices.template`
  - **Type**: `string`
  - **Default**: `react`
  - **Description**: Template that used to generate slice

- #### `fsd-slices.typescript`
  - **Type**: `boolean`
  - **Default**: `true`
  - **Description**: Generate typescript files instead of javascript


- #### `fsd-slices.configurable`
  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Ask me what to include in the slice (api, config, model, ui)


- #### `fsd-slices.exclude`
  - **Type**: `string`
  - **Default**: `''`
  - **Example**: `'config, model'`
  - **Description**: Folders that excluded from the slice by default.


## Custom Template

To create your own custom template, follow these steps:

1. **Create a New Folder**:
   Start by creating a new folder at the root directory of your project. Name this directory `_slice` to indicate it's the starting point for your custom slice template.

2. **Populate the Template Folder**:
   Add all the custom files that you want to be part of your template into the `_slice` folder. These can include configuration files, component files, style sheets, or any other resources integral to your custom template.

3. **Dynamic Naming**:
  You can access to slice name with `slice` and `[name]` (for filename)

### Custom template example

files inside `_slice`

```plaintext
api/
    index.ts
model/
    index.ts
ui/
    [name].vue
    index.ts
index.ts
```


[name].vue
```
<template>
    <div>
        slice
    </div>
</template>
```


