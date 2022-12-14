<script lang="ts">
	import { signOut, getUser } from '@lucia-auth/sveltekit/client';
	import { invalidateAll } from '$app/navigation';
	const user = getUser();
</script>

{#if $user}
	<p>You are {$user.username}</p>
{:else}
	<p>You are guest</p>
{/if}
