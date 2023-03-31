# Code Entry for SvelteKit
With this module, you are able to add Code entry form element to you Sveltekit site. 

## Install
Use your package manager to install the module:
```shell
npm install @bonosoft/sveltekit-codeentry
```

## Adding Code entry to a svelte file in SvelteKit
Now you can start adding code entry components to your pages.
```ts
<script lang="ts">
	import CodeEntry from "@bonosoft/sveltekit-codeentry"
</script>

<Codeentry />
```
The Code Entry can be modefied by adding different parameters.

## Use without a Html Form
The codeentry is a list of numeric form input elements. By using the on:code event triggered by the entry of the last digit, you dont have to include it in a form.
```ts
<script lang="ts">
    let result = '';
    function handleClicked({ detail }: CustomEvent<string>) {
        result = detail;
    }
</script>

<Codeentry on:code={handleClicked} />
<p>Received code by event: "{result}"</p>
```
![Code Entry](https://github.com/bonosoft/sveltekit-codeentry/blob/3abaecfc3c288c761021e4923987a8574ba1f608/readme/codeentry1.png?raw=true)


## Use with a Html Form
If you want to add the code entry with other elements in a form, simply do not handle the on:code event. 
```ts
<Codeentry idPrefix="ce1" />
```
The input digit elements will have name attributes like "ce1-0 ... ce1-6". If you have more code entry instances, you can use tge idPrefix to set the prefix for both ID and Name attibutes.

## Front, back, select and border colors, for use in dark mode
You can override style with CSS, or use the attributes for chaning the colors used to draw the code entry digits.

```ts
<Codeentry idPrefix="ce2" textColor="#060" bgColor="#9F9" borderColor="#696" borderSelectColor="#0F0"/>


<Codeentry idPrefix="ce3" textColor="#F92" bgColor="#333" borderColor="#666"/>
```
![Code Entry](https://github.com/bonosoft/sveltekit-codeentry/blob/3abaecfc3c288c761021e4923987a8574ba1f608/readme/codeentry2.png?raw=true)

## Digits count, Size, border width and radius settings
You can set the number of digits to show. For a low number you might want to increase the size (default font size is 4.5) and to make room for a large number of digits, you might want a small size.

You can also change then border width and border coner radius for the digits.

```ts
    <Codeentry idPrefix="ce4" count="2" fontSize="9.5" borderWidth=10 borderRadius=40 />

    <Codeentry idPrefix="ce5" count="10" fontSize="2" borderRadius="8"/>
```

![Code Entry](https://github.com/bonosoft/sveltekit-codeentry/blob/3abaecfc3c288c761021e4923987a8574ba1f608/readme/codeentry3.png?raw=true)

