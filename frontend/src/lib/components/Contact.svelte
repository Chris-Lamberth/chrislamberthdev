<script>
	let name = '';
	let email = '';
	let message = '';
	let alertMessage = '';
	let alertMessageType = '';

	const submitForm = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);

		try {
			const response = await fetch('https://formspree.io/f/myyqeova', {
				method: 'POST',
				body: formData,
				headers: {
					Accept: 'application/json'
				}
			});

			if (response.ok) {
				alertMessage = 'Message Sent!';
				alertMessageType = 'success';
				name = '';
				email = '';
				message = '';
			} else {
				const data = await response.json();
				alertMessage = data.error;
				alertMessageType = 'error';
			}
		} catch (error) {
			alertMessage = 'There was an error submitting the form.';
			alertMessageType = 'error';
		}
	};
</script>

<div class="card">
	<h2 class="section-headline">reach out</h2>
	<p>Got a rad project or just want to say hello? Shoot me a message and let's chat.</p>

	<form on:submit={submitForm}>
		<div class="field">
			<input type="text" bind:value={name} id="name" name="name" placeholder="name" />
		</div>
		<div class="field">
			<input type="email" bind:value={email} id="email" placeholder="email" name="email" />
		</div>
		<div class="field">
			<textarea
				bind:value={message}
				name="message"
				id="message"
				placeholder="message"
				cols="30"
				rows="5"
			/>
		</div>
		<div class="bottom">
			<p class="msg {alertMessageType}">{alertMessage}</p>
			<button type="submit">send</button>
		</div>
	</form>
</div>

<style>
	.card {
		border-radius: var(--radius);
		padding: 3rem;
	}
	.card h2 {
		margin: 0 0 calc(var(--headline-pad) / 2) 0;
	}
	.card p {
		margin: 0 0 var(--headline-pad) 0;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	input,
	textarea {
		width: 100%;
		padding: 0.7rem;
		border-radius: 0.5em;
		color: #fff;
		box-shadow: 0 0 0 0px #000, 0 0 0 0px #00ffcc;
		transition: box-shadow 0.1s ease-in-out;
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
	}
	.msg {
		margin: 0;
		font-size: 0.9rem;
	}
	.card p.error {
		color: rgb(255, 98, 0);
	}
	.card p.success {
		color: #00ffcc;
	}

	input:focus,
	textarea:focus {
		outline: none;
		box-shadow: 0 0 0 2px #000, 0 0 0 4px #00ffcc;
	}

	input::-webkit-input-placeholder,
	form button::webkit-input-placeholder {
		border: none;
	}
	textarea::-webkit-input-placeholder,
	form button::webkit-input-placeholder {
		border: none;
	}
	form button {
		font-family: var(--serif);
		letter-spacing: 0.03em;
		font-size: 1rem;
		padding: 1em;
		border-radius: 0.6em;
		min-width: 120px;
		box-shadow: 0 0 0 0px #000, 0 0 0 0px #00ffcc;
		transition: scale 0.15s ease-in-out, box-shadow 0.1s ease-in-out, background 0.1s linear,
			color 0.1s linear;
	}
	form button:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px #000, 0 0 0 4px #00ffcc;
	}

	/* light theme */
	:global([data-theme='light']) .card {
		background: linear-gradient(100deg, #02242a 0%, #000 50%, #00221d 90%);
	}
	:global([data-theme='light']) h2,
	:global([data-theme='light']) p {
		color: #fff;
	}
	:global([data-theme='light']) form button {
		background: linear-gradient(90deg, #00deff 0%, #00ffcc 100%);
	}
	:global([data-theme='light']) input,
	:global([data-theme='light']) textarea {
		background: linear-gradient(90deg, #003037 0%, #003f33 100%);
		border: none;
	}
	:global([data-theme='light']) input::placeholder,
	:global([data-theme='light']) textarea::placeholder {
		color: #8bb1ae;
	}

	/* dark theme */
	:global([data-theme='dark']) .card {
		background: linear-gradient(130deg, #1f1f1f 0%, #000 100%);
		border: 0.5px solid #313131;
	}
	:global([data-theme='dark']) h2,
	:global([data-theme='dark']) p {
		color: var(--txt-color);
	}
	:global([data-theme='dark']) form button {
		background: linear-gradient(10deg, #000 0%, #252525 100%);
		border: 1px solid #313131;
		color: #fff;
	}
	:global([data-theme='dark']) form button:hover,
	:global([data-theme='dark']) form button:focus-visible {
		background: var(--color-accent);
		color: #000;
		box-shadow: none;
	}
	:global([data-theme='dark']) input,
	:global([data-theme='dark']) textarea {
		background: linear-gradient(10deg, #000 0%, #0b0b0b 100%);
		border: 0.5px solid #313131;
	}

	@media (width <= 600px) {
		.card {
			padding: 2rem;
		}
		input,
		textarea {
			padding: 1rem;
			font-size: 1rem;
		}
		.bottom {
			flex-direction: column-reverse;
		}
		.bottom p {
			margin: 0;
		}
		form button {
			width: 100%;
			padding: 1.4rem;
		}
	}
</style>
