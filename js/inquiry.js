document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inquiry-form');
    
    // Helper function to validate email
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Helper function to check if email is business email (not gmail)
    const isBusinessEmail = (email) => {
        return !email.toLowerCase().endsWith('@gmail.com');
    };

    // Helper to set error state
    const setError = (element) => {
        element.style.borderColor = 'red';
        element.style.outline = 'none';
        
        // Show error icon
        const wrapper = element.closest('.input-icon-wrapper');
        if (wrapper) {
            const icon = wrapper.querySelector('.error-icon');
            if (icon) {
                icon.style.display = 'block';
            }
        }
    };

    // Helper to clear error state
    const clearError = (element) => {
        element.style.borderColor = ''; // Reset to CSS default
        element.style.outline = '';
        
        // Hide error icon
        const wrapper = element.closest('.input-icon-wrapper');
        if (wrapper) {
            const icon = wrapper.querySelector('.error-icon');
            if (icon) {
                icon.style.display = 'none';
            }
        }
    };

    if (form) {
        // Clear errors on input
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                clearError(input);
            });
        });

        form.addEventListener('submit', (e) => {
            // Stop immediate propagation to prevent main.js generic handler from firing if it's attached
            e.stopImmediatePropagation();
            e.preventDefault();

            let isValid = true;
            
            // Validate Name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                isValid = false;
                setError(name);
            } else {
                clearError(name);
            }

            // Validate Email
            const email = document.getElementById('email');
            const emailValue = email.value.trim();
            if (!emailValue) {
                isValid = false;
                setError(email);
            } else if (!isValidEmail(emailValue)) {
                isValid = false;
                setError(email);
            } else if (!isBusinessEmail(emailValue)) {
                isValid = false;
                setError(email);
            } else {
                clearError(email);
            }

            // Validate Product
            const product = document.getElementById('product');
            if (!product.value) {
                isValid = false;
                setError(product);
            } else {
                clearError(product);
            }

            // Validate Date
            const date = document.getElementById('date');
            if (!date.value) {
                isValid = false;
                setError(date);
            } else {
                clearError(date);
            }

            const submitBtn = form.querySelector('button[type="submit"]');

            if (!isValid) {
                // submitBtn.textContent = 'Fix Errors';
                // submitBtn.style.backgroundColor = '#e74c3c'; // Red
            } else {
                // Success state
                submitBtn.textContent = 'Request Sent!';
                submitBtn.style.backgroundColor = '#2ecc71'; // Green
                
                console.log('Inquiry Form Submitted', {
                    name: name.value,
                    company: document.getElementById('company').value,
                    email: emailValue,
                    product: product.value,
                    quantity: document.getElementById('quantity').value,
                    date: date.value,
                    notes: document.getElementById('notes').value
                });

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    // Clear any lingering error styles
                    inputs.forEach(input => clearError(input));
                    submitBtn.textContent = 'Request Quote';
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
});
