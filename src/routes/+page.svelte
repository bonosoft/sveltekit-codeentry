<script lang="ts">
    import Codeentry from '$lib';

    
    let result = '';
    function handleClicked({ detail }: CustomEvent<string>) {
        console.log(detail);
        result = detail;
    }
    let passwordResult = '';

</script>
  
<svelte:head>
    <title>Test CodeEntry component</title>
</svelte:head>

<h1>Code entry for digits (PIN codes, TOTP codes) with event</h1>
<div class="lightmode">
    <Codeentry on:code={handleClicked} />
    <p>
        Received code by event: "{result}"
    </p>

    <Codeentry idPrefix="ce2" textColor="#060" bgColor="#9F9" borderColor="#696" borderSelectColor="#0F0"/>
</div>

<h1>Darkmode color samples</h1>
<div class="darkmode">

    <Codeentry idPrefix="ce3" textColor="#F92" bgColor="#333" borderColor="#666"/>

</div>


<h1>Digits count, Size, border width and radius settings</h1>
<div class="lightmode">

    <Codeentry idPrefix="ce4" count="2" fontSize="9.5" borderWidth=10 borderRadius=40 />


    <Codeentry idPrefix="ce5" count="10" fontSize="2" borderRadius="8"/>

</div>

<h1>As Password</h1>
<div class="lightmode">
    <Codeentry idPrefix="ce6" type="password"  on:code={({ detail }) => passwordResult=detail} />
    <p>Received code by event: "{passwordResult}"</p>
</div>



<style>
    .lightmode {
        padding: 20px;
        background-color: #fff;
     }

     .darkmode {
        padding: 20px;
        background-color: #111;
     }
</style>