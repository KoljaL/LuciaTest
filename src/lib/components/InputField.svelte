<script lang="ts">
	// Required props
	export let id: string;
	// Optional props
	export let type: string = 'text';
	export let label: boolean | null = false;
	export let labelText: string | null = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let value: string = '';
	const onInput = (e: any) => {
		value = e.target.value;
	};
	// function typeAction(node: any) {
	//     node.type = type
	// }
</script>

{#if label && labelText}
	<label for={id}>
		{labelText}
	</label>
{/if}

<input {type} name={id} {id} {placeholder} {required} {value} on:input={onInput} />

<style>
</style>
