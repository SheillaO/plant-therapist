document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');
    const existingErrorMessageElement =
      document.getElementById('error-message');
    const submitButton = document.getElementById('submit-button');

    submitButton.disabled = true;

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        let errorMessage = 'Something went wrong. Please try again.';

        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch {
          // Use the fallback message if the response is not valid JSON.
        }

        throw new Error(errorMessage);
      }

      if (existingErrorMessageElement) {
        existingErrorMessageElement.remove();
      }

      const successMessage = document.createElement('p');
      successMessage.textContent = `You're subscribed. We'll let you know when we launch.`;
      successMessage.className = 'note success-message';

      form.replaceWith(successMessage);
    } catch (error) {
      const errorMessage = error.message;

      if (existingErrorMessageElement) {
        existingErrorMessageElement.textContent = errorMessage;
      } else {
        const errorMessageElement = document.createElement('p');
        errorMessageElement.id = 'error-message';
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.className = 'note error-message';

        form.insertAdjacentElement('afterend', errorMessageElement);
      }

      submitButton.disabled = false;
    }
  });
});
