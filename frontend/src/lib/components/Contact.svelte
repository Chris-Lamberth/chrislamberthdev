<script>
	let name = '';
	let email = '';
	let message = '';

	const submitForm = async (event) => {
		 event.preventDefault();
		 const formData = { name, email, message };
		 console.log(formData);

		 // Here you can handle your form data. 
		 // For example, make a POST request to your server or use fetch to send this data to some API
	};
</script>
<h2>name:</h2><p>{name}</p>
<h2>email:</h2><p>{email}</p>
<h2>message:</h2><p>{message}</p>
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
		  <textarea bind:value={message} name="message" id="message" placeholder="message" cols="30" rows="5"></textarea>
	  </div>
	  <button type="submit">send</button>
  </form>
</div>


<style>
	.card {
		background: linear-gradient(100deg, #02242a 0%, #000 50%, #00221d 90%);
		border-radius: var(--radius);
		padding: 3rem;
	}
	.card h2 {
		color: #fff;
		margin: 0 0 calc(var(--headline-pad) / 2) 0;
	}
	.card p {
		color: #fff;
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
		border: none;
		padding: 0.7rem;
		border-radius: 0.5em;
		color: #fff;
		background: linear-gradient(90deg, #003037 0%, #003f33 100%);
		box-shadow: 0 0 0 0px #000, 0 0 0 0px #00ffcc;
		transition: box-shadow 0.1s ease-in-out;
	}
	input::placeholder,
	textarea::placeholder {
		color: #8bb1ae;
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
		background: linear-gradient(90deg, #00deff 0%, #00ffcc 100%);
		padding: 1em;
		border-radius: 1000px;
		min-width: 120px;
		align-self: flex-end;
		box-shadow: 0 0 0 0px #000, 0 0 0 0px #00ffcc;
		transition: scale 0.15s ease-in-out, box-shadow 0.1s ease-in-out;
	}
	form button:focus-visible {
		box-shadow: 0 0 0 2px #000, 0 0 0 4px #00ffcc;
	}
	form button:focus {
		outline: none;
	}
	form button:hover {
		scale: 1.07;
	}
	form button:active {
		scale: 0.95;
	}
</style>
