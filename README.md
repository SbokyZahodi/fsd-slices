# FSD-Slices: A Versatile Slice Generator

Easily generate code slices for your project with just a few clicks. Select from pre-defined templates or create your own custom setup.

## Getting Started

### Choose a Template

Upon installation, select your desired framework template from the extension settings. Currently supported templates include:

- **React**
- **Vue**
- **Svelte**

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

- #### `fsd-slices.custom`
  - **Type**: `boolean`
  - **Default**: `false`
  - **Description**: Use custom template

- #### `fsd-slices.configurable`
  - **Type**: `boolean`
  - **Default**: `true`
  - **Description**: Ask me what to include in the slice (api, config, model, ui)


- #### `fsd-slices.include`
  - **Type**: `string`
  - **Default**: `api, model, ui, config`
  - **Description**: Folders that included to the slice by default (if configurable / custom is true then this option will be ignored)




## Custom Template

To create your own custom template, follow these steps:

1. **Create a New Folder**:
   Start by creating a new folder at the root directory of your project. Name this directory `_slice` to indicate it's the starting point for your custom slice template.

2. **Populate the Template Folder**:
   Add all the custom files that you want to be part of your template into the `_slice` folder. These can include configuration files, component files, style sheets, or any other resources integral to your custom template.

3. **Dynamic Naming**:
   Take advantage of dynamic naming within your files. You can access the user-inputted name by using the `recode(name)`. This will allow for automatic renaming of components or files based on user input during the slice generation process.


## Example

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
        recode(name)
    </div>
</template>

```



