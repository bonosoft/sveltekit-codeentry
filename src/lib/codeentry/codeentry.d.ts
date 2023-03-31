import { SvelteComponent } from 'svelte'

declare class CodeEntry extends SvelteComponent {
    constructor(options: any)

    $$prop_def: {

        idPrefix?: string
        count?: number | string
    
        textColor?: string
        borderColor?: string
        borderSelectColor?: string
        borderRadius?: number | string
        borderWidth?: number | string
        bgColor?: string
    
        fontSize?: number | string
    
        digitLabel?: string
    }
}

export default Progress