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

## Example

```svelte
<div class="actions">
    <button if={user.hasAccess('add-item')}>
        Add
    </button>
    <button if={user.hasAccess('edit-item')}>
        Edit
    </button>
    <button if={user.isAdmin()}>
        Remove
    </button>
</div>
```

after if processor:
```svelte
<div class="actions">
    {#if user.hasAccess('add-item')}
    <button>
        Add
    </button>
    {/if}
    {#if user.hasAccess('edit-item')}
    <button>
        Edit
    </button>
    {/if}
    {#if user.isAdmin()}
    <button>
        Remove
    </button>
    {/if}
</div>
```

### typescript support:
you can add if as an attribute for all HTML Elements by adding below code in `*.d.ts` file in your project.

```ts
declare	namespace svelte.JSX {
    interface HTMLAttributes<T> {
        if?: boolean
    }
}
```

### limitations:
one problem is that you cannot use ifProcessor with `slot` prop in same element:

```svelte
<Card>
    <div if={hasHeader} slot="header">
        Header
    </div>
    Body
</Card>
```

```svelte
<Card>
    {#if hasHeader}
        <div slot="header"> <!-- cannot have slot="**" inside if conditions -->
            Header
        </div>
    {/if}
    Body
</Card>
```

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

