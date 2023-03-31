<script context="module" lang="ts">
    export interface Payload {  enteredCode: string }
</script>

<script lang="ts">
	import { BROWSER } from 'esm-env'
	import { createEventDispatcher } from 'svelte'
	
	export let idPrefix = "ce1";
	export let count = "6";

	export let textColor = "#000";
	export let borderColor = "#EEE";
	export let borderSelectColor = "#F92";
	export let borderRadius = "16";
	export let borderWidth = "2";
	export let bgColor = "#FFF";

	export let fontSize = "4.5";

	export let type = 'number';
	export let digitLabel = 'Digit';


	const dispatch = createEventDispatcher<{code: string}>()

	if (BROWSER) {

		function splitNumber(e: Event) {
			let data = (e as InputEvent).data;
			if (!data) {
				if (e.target) {
					data = (e.target as HTMLInputElement).value;
				}
			} 
			if ( ! data ) return;
			
			data = data.replace(/[^0-9]/g, '');
			if ( ! data ) {
				(e.target as HTMLInputElement).value = '';
				return;
			}

			if ( data.length === 1 ) return; // success, we have one character in the digit
		
			moveNumber(e.target as HTMLInputElement, data);
		}

        function moveNumber(digit: HTMLInputElement, data: string) {
			digit.value = data[0]; // Apply first item to first input
			data = data.substring(1); // remove the first char.
			if ( data.length ) {
				if ( digit.nextElementSibling) {
					moveNumber(digit.nextElementSibling as HTMLInputElement, data);
				} else {
					moveNumber(digit, data);
				}
			} else {
				digit.focus();
			}
		}

		function codeEntered(prefix: string) {
			let result = '';
			for(let i=0; i<parseInt(count); i++) {
				const digit : HTMLElement | null = document.getElementById(prefix + "-" + i);
				if (digit) result += (digit as HTMLInputElement).value;
			}
			dispatch('code', result);
		}

		document.querySelectorAll('[id^="'+idPrefix+'"]').forEach(function(input) {

			input.addEventListener('keyup', function(e: Event) {
				const ev : KeyboardEvent = e as KeyboardEvent;
				const me = e.target as HTMLInputElement;
				
				if (ev.keyCode === 16 || ev.keyCode == 9 || ev.keyCode == 224 || ev.keyCode == 18 || ev.keyCode == 17) {
					 return;
				}
				
				if ( (ev.keyCode === 8 || ev.keyCode === 37) && me.previousElementSibling && me.previousElementSibling.tagName === "INPUT" ) {
					(me.previousElementSibling as HTMLInputElement).select();
				} else if (ev.keyCode !== 8 && me.nextElementSibling) {
					(me.nextElementSibling as HTMLInputElement).select();
				}

				let data = me.value;
				data = data.replace(/[^0-9]/g, '');
				if (data.length<1) {
					me.value = '';
				}

				if ( me.value.length > 1 ) {
					splitNumber(e);
				}

				const idParts = me.id.split('-');
				if (idParts.length<2) return;
				if (idParts[1]=='0') return;

				const lastDigit : HTMLElement | null = document.getElementById(idParts[0] + "-" + (parseInt(count)-1));
				if (lastDigit) {
					if ((lastDigit as HTMLInputElement).value.length == 1 ) {
						codeEntered(idParts[0]);
					}
				}
			});

			input.addEventListener('focus', function(e: Event) {
				const me = e.target as HTMLInputElement;
				const idParts = me.id.split('-');
				if (idParts.length<2) return;
				if (idParts[1]=='0') return;

				const firstDigit : HTMLElement | null = document.getElementById(idParts[0] + "-0");
				if (firstDigit) {
					if ((firstDigit as HTMLInputElement).value == '' ) {
						firstDigit.focus();
					}
				}

				if (me.previousElementSibling) {
					if ( (me.previousElementSibling as HTMLInputElement).value == '' ) {
						(me.previousElementSibling as HTMLElement).focus();
					}
				}
			});

		});

		document.getElementById(idPrefix + "-0")?.addEventListener('input', splitNumber);
	}
</script>


<div class="codeentry" >
	<fieldset>
		{#each Array(parseInt(count)) as _, index (index)}
			<label for="codeentry-{index}">{digitLabel} {index}</label>
		{/each}
		<div>
			<input class="octdigit" type="{type}" pattern="[0-9]*"  value="" autocomplete="one-time-code" id="{idPrefix}-0" name="{idPrefix}-0" style="--textcolor:{textColor};--bordercolor:{borderColor};--borderselectcolor:{borderSelectColor};--bgcolor:{bgColor};--fontsize:{fontSize+"em"};--borderradius:{borderRadius}px;--borderwidth:{borderWidth}px;" required>
			{#each Array(parseInt(count)-1) as _, index (index)}
			<input class="octdigit" type="{type}" pattern="[0-9]*" min="0" max="9" maxlength="1"  value="" id="{idPrefix}-{1+index}" name="{idPrefix}-{1+index}" style="--textcolor:{textColor};--bordercolor:{borderColor};--borderselectcolor:{borderSelectColor};--bgcolor:{bgColor};--fontsize:{fontSize+"em"};--borderradius:{borderRadius}px;--borderwidth:{borderWidth}px;" required>
			{/each}
		</div>
	</fieldset>
</div>

<style>
.codeentry fieldset {
	border: 0;
	padding: 0;
	margin: 0;
}

.codeentry fieldset div {
	display: flex;
	align-items: center;
}

input.octdigit {
	width: .82em;
	line-height: 1;
	margin: .1em;
	padding: 8px 0 4px;
	font-size: var(--fontsize);
	text-align: center;
	appearance: textfield;
	-webkit-appearance: textfield;
	border: var(--borderwidth) solid var(--bordercolor);
	color: var(--textcolor);
	border-radius: var(--borderradius);
	background-color:var(--bgcolor);
	outline: none;
}

input.octdigit:focus, input.octdigit:active {
	border: var(--borderwidth) solid var(--borderselectcolor);
}

input.octdigit::selection {
	background:var(--bgcolor);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.codeentry label {
	border: 0 !important;
	clip: rect(1px, 1px, 1px, 1px) !important;
	-webkit-clip-path: inset(50%) !important;
	clip-path: inset(50%) !important;
	height: 1px !important;
	margin: -1px !important;
	overflow: hidden !important;
	padding: 0 !important;
	position: absolute !important;
	width: 1px !important;
	white-space: nowrap !important;
}

</style>

