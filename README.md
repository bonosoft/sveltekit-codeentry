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

<CodeEntry />
```
You will now have a 6 digit Time based ontime password element.

The Code Entry can be modefied by adding different parameters.

## Use without a Html Form
The codeentry is a list of numeric form input elements. By using the on:code event, triggered by the entry of the last digit, you dont have to include it in a form.
```ts
<script lang="ts">
    let result = '';
    function handleClicked({ detail }: CustomEvent<string>) {
        result = detail;
    }
</script>

<CodeEntry on:code={handleClicked} />
<p>Received code by event: "{result}"</p>
```
![Code Entry](https://github.com/bonosoft/sveltekit-codeentry/blob/3abaecfc3c288c761021e4923987a8574ba1f608/readme/codeentry1.png?raw=true)


## Use with a Html Form
If you want to add the code entry with other elements in a form, simply do not handle the on:code event. 
```ts
<CodeEntry idPrefix="ce1" />
```
The input digit elements will have name attributes like "ce1-0, ... ce1-6". If you have more code entry instances on your page, you can use the idPrefix to set the prefix for both ID and Name attibutes on all input elements.

## Front, back, select and border colors, for use in dark mode
You can override style with CSS, or use the attributes for chaning the colors used to draw the code entry digits.

```ts
<CodeEntry idPrefix="ce2" textColor="#060" bgColor="#9F9" borderColor="#696" borderSelectColor="#0F0"/>


<CodeEntry idPrefix="ce3" textColor="#F92" bgColor="#333" borderColor="#666"/>
```
![Code Entry](https://github.com/bonosoft/sveltekit-codeentry/blob/3abaecfc3c288c761021e4923987a8574ba1f608/readme/codeentry2.png?raw=true)

## Digits count, size, border width and radius settings
You can set the number of digits to show. For a low number you might want to increase the size (default font size is 4.5) and to make room for a large number of digits, you might want a small size.

You can also change then border width and border coner radius for the digits.

```ts
    <CodeEntry idPrefix="ce4" count="2" fontSize="9.5" borderWidth=10 borderRadius=40 />

    <CodeEntry idPrefix="ce5" count="10" fontSize="2" borderRadius="8"/>
```

![Code Entry](https://github.com/bonosoft/sveltekit-codeentry/blob/3abaecfc3c288c761021e4923987a8574ba1f608/readme/codeentry3.png?raw=true)


## Use as a password by hiding entry digits 
If the code is not a onetime code, but a pin code used as password, you will want to change the input type to password so the entered digits are not shown.
```ts
<script lang="ts">
    let passwordResult = '';
</script>

<CodeEntry idPrefix="ce6" type="password"  on:code={({ detail }) => passwordResult=detail} />
<p>Received code by event: "{passwordResult}"</p>
```
![Code Entry](https://github.com/bonosoft/sveltekit-codeentry/blob/1dc48d559d2e68dcf8e9ccf648900a32ed069b03/readme/codeentry4.png?raw=true)

## Handles copy and paste and quick entering
If the user copy and pastes a code into a CodeEntry digit element, it will automatically distribute the code to following digits.

It will also distribute digits if a user types more than one number into a digit really fast.

If the code distribution fills all the digits, the code event will be send with the complete code. If the pasted code is longer than the number of digits, the last digit will be overwritten multiple times. Normally this will only trigger the event once, but some browsers might trigger the last code twice.