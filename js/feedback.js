document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();

            let isValid = true;
            
            // Clear all previous errors
            document.querySelectorAll('.error-msg').forEach(el => {
                el.textContent = '';
                // el.style.display = 'none'; // Removed for a11y: element should remain in DOM
            });
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            document.querySelectorAll('.radio-group-error').forEach(el => el.classList.remove('radio-group-error'));

            // 1. Validate Feedback Type (Radio Group)
            const feedbackTypes = document.getElementsByName('type');
            let typeSelected = false;
            for (const radio of feedbackTypes) {
                if (radio.checked) {
                    typeSelected = true;
                    break;
                }
            }

            if (!typeSelected) {
                isValid = false;
                const errorEl = document.getElementById('type-error');
                if (errorEl) {
                    // Update text content triggers the live region announcement
                    errorEl.textContent = "Please select a feedback type.";
                    // errorEl.style.display = 'block'; // Removed for a11y
                }
                const radioGroup = document.querySelector('.radio-group');
                if (radioGroup) {
                    radioGroup.classList.add('radio-group-error');
                }
            }

            // 2. Validate Email
            const email = document.getElementById('email');
            const emailValue = email.value.trim();
            if (!emailValue) {
                isValid = false;
                const errorEl = document.getElementById('email-error');
                if (errorEl) {
                    errorEl.textContent = "Email address is required.";
                    // errorEl.style.display = 'block'; // Removed for a11y
                }
                email.classList.add('input-error');
                email.setAttribute('aria-invalid', 'true');
            } else {
                email.setAttribute('aria-invalid', 'false');
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            if (isValid) {
                submitBtn.textContent = 'Feedback Sent!';
                submitBtn.style.backgroundColor = '#2ecc71';
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = 'Submit Feedback';
                    submitBtn.style.backgroundColor = '';
                    // Reset aria-invalid
                    const emailInput = document.getElementById('email');
                    if (emailInput) {
                        emailInput.setAttribute('aria-invalid', 'false');
                    }
                    // Clear error messages text
                    document.querySelectorAll('.error-msg').forEach(el => {
                        el.textContent = '';
                    });
                }, 3000);
            }
        });
    }
});
