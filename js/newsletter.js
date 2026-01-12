document.addEventListener('DOMContentLoaded', () => {
    // Navigation Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    const form = document.getElementById('newsletter-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Helper to show/hide complex error
            // traverses up to form-group, then down to validation-wrapper -> validation-content -> error-msg
            const toggleError = (element, show, message) => {
                const formGroup = element.closest('.form-group');
                if (!formGroup) return;

                // Complex traversal to find the error message container
                const validationWrapper = formGroup.querySelector('.validation-wrapper');
                if (validationWrapper) {
                    const errorMsg = validationWrapper.querySelector('.error-msg');
                    if (errorMsg) {
                        if (show) {
                            errorMsg.textContent = message;
                            errorMsg.style.display = 'inline';
                            errorMsg.closest('.validation-content').style.display = 'block';
                            element.style.borderColor = '#e74c3c';
                        } else {
                            errorMsg.style.display = 'none';
                            errorMsg.closest('.validation-content').style.display = 'none';
                            element.style.borderColor = '#e0e0e0';
                        }
                    }
                }
            };

            // 1. Full Name
            const fullName = document.getElementById('fullName');
            if (!fullName.value.trim()) {
                toggleError(fullName, true, 'Full Name is required');
                isValid = false;
            } else {
                toggleError(fullName, false);
            }

            // 2. Email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                toggleError(email, true, 'Email Address is required');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                toggleError(email, true, 'Please enter a valid email address');
                isValid = false;
            } else {
                toggleError(email, false);
            }

            // 3. Frequency
            const frequency = document.getElementById('frequency');
            if (frequency.value === "") {
                toggleError(frequency, true, 'Please select a frequency');
                isValid = false;
            } else {
                toggleError(frequency, false);
            }

            // 4. Interests (Checkbox Group)
            // For groups, we need to find the container to attach the error to
            const interestGroup = document.querySelector('.checkbox-group');
            const interestsChecked = document.querySelectorAll('input[name="interests"]:checked').length > 0;
            
            // We'll treat the first checkbox or the group container as the anchor for the error function
            // In our HTML structure, the error is inside the form-group, which wraps the checkbox-group
            if (!interestsChecked) {
                 // Custom logic for group since 'element' in toggleError expects to be inside form-group
                 // We can pass the group container
                 toggleError(interestGroup, true, 'Please select at least one interest');
                 isValid = false;
            } else {
                 toggleError(interestGroup, false);
            }

            // 5. Terms
            const terms = document.getElementById('terms');
            if (!terms.checked) {
                toggleError(terms, true, 'You must agree to the terms');
                isValid = false;
            } else {
                toggleError(terms, false);
            }

            if (isValid) {
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.backgroundColor = '#2ecc71';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    form.reset();
                    // Clear any lingering success styles if we added them (border colors reset in toggleError)
                }, 3000);
            }
        });
    }
});

