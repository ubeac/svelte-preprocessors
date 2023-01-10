# Svelte Preprocessors 
List of some useful preprocessors for svelte

## Usage
you can install this package as devDependency of your svelte based project.

```bash
npm install -D @ubeac/svelte-preprocessors
```

then edit your svelte.config.js file:
```js
import {ifProcessor, previewProcessor} from '@ubeac/svelte-preprocessors'

export default {
    preprocessors: [
        ifProcessor(), // to enable if preprocessor
        previewProcessor() // to enable Preview preprocessor
    ],
    ...other configs
    kit: {
        ...sveltekit configs
    }
}
```


## if Processor
after installation and enabling if Processor you should be able to use if prop for all Components and elements in *.sevlte files

```svelte
<Button if={2 + 2 === 4}>
    My Button
</Button>

<p if={!!user}>
    name: {user.name}
    email: {user.email}
</p>
```

after build process above code will be changed to 
```svelte
{#if 2 + 2 === 4}
<Button>
    My Button
</Button>
{/if}

{#if !!user}
<p>
    name: {user.name}
    email: {user.email}
</p>
{/if}
```

### limitations:
one problem of using if processor is typescript hints, which there are ways to support if prop for components and DOM elements.

// TODO


## Preview Processor
using this processor you can extract source code of svelte components as string.

to get started you should have a Preview component which have some props: 

Preview.svelte
```svelte
<script lang="ts">
    export let markup: string | undefined = undefined;
    export let script: string | undefined = undefined;
    export let style: string | undefined = undefined;
    export let isTypescript: boolean | undefined = undefined;

    $: finalScript = isTypescript ? script.replace('<script>', '<script lang="ts">')
</script>

{finalScript}
<br/>
{markup}
<br />
{style}
```
[here](https://github.com/ubeac/svelte/blob/3c8fbe0196815b78ca5bce98494cfc5a58ea5de7/src/docs-components/Preview/Preview.svelte) is an example of Preview.svelte component which uses this preprocessor.   

