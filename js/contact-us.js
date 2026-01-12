document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Highlighting (Keep consistency with main.js)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // 2. Form Validation Logic
    const form = document.getElementById('contact-form');
    const errorSummary = document.getElementById('error-summary');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Reset errors
            errorSummary.innerHTML = '';
            errorSummary.style.display = 'none';
            const errors = [];

            // Get field values
            const firstName = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const department = document.getElementById('department').value;
            const subject = document.getElementById('subject').value.trim();
            
            // Validation Rules
            // 1. First Name (Required)
            if (!firstName) {
                errors.push('First Name is required.');
            }

            // 2. Email (Required)
            if (!email) {
                errors.push('Email Address is required.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                // Basic format check
                errors.push('Please enter a valid Email Address.');
            }

            // 3. Phone (Required)
            if (!phone) {
                errors.push('Phone Number is required.');
            }

            // 4. Department (Required)
            if (!department) {
                errors.push('Please select a Department.');
            }

            // 5. Subject (Required)
            if (!subject) {
                errors.push('Subject is required.');
            }

            // Display Errors or Submit
            if (errors.length > 0) {
                // Show errors
                errorSummary.style.display = 'block';
                const heading = document.createElement('h3');
                heading.textContent = 'Please fix the following errors:';
                heading.style.color = '#721c24';
                heading.style.fontSize = '1.1rem';
                heading.style.marginBottom = '0.5rem';
                errorSummary.appendChild(heading);

                const ul = document.createElement('ul');
                errors.forEach(err => {
                    const li = document.createElement('li');
                    li.textContent = err;
                    ul.appendChild(li);
                });
                errorSummary.appendChild(ul);
                
                // Scroll to top of form
                errorSummary.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Success Simulation
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#2ecc71';
                
                console.log('Form Validated & Submitted:', {
                    firstName,
                    lastName: document.getElementById('lastName').value.trim(),
                    email,
                    phone,
                    department,
                    subject,
                    message: document.getElementById('message').value.trim()
                });

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    form.reset();
                }, 3000);
            }
        });
    }
});

