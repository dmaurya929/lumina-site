document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            let isValid = true;
            
            // Clear all previous errors
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
            document.getElementById('payment-error').style.display = 'none';

            // 1. First 2 fields: Name & Email - Generic Error Message "Please fill the field"
            const name = document.getElementById('fullName');
            if (!name.value.trim()) {
                isValid = false;
                const errorId = name.getAttribute('aria-describedby');
                const errorEl = document.getElementById(errorId);
                if (errorEl) {
                    errorEl.textContent = "Please fill the field";
                    errorEl.style.display = 'block';
                }
                name.classList.add('input-error');
            }

            const email = document.getElementById('email');
            if (!email.value.trim()) {
                isValid = false;
                const errorId = email.getAttribute('aria-describedby');
                const errorEl = document.getElementById(errorId);
                if (errorEl) {
                    errorEl.textContent = "Please fill the field";
                    errorEl.style.display = 'block';
                }
                email.classList.add('input-error');
            }

            // 2. Next 3 fields: Address, City, Zip - Generic Message BUT Programmatically Associated (label + error)
            // Strategy: These will have specific aria-describedby pointing to error containers
            // The request says "display generic message but also do programmatic association". 
            // 3.3.1 Error Identification requires the error to be identified. 
            // Programmatic association (aria-describedby) makes the error accessible.
            
            const address = document.getElementById('address');
            if (!address.value.trim()) {
                isValid = false;
                const errorEl = document.getElementById('address-error');
                if (errorEl) {
                    errorEl.textContent = "Field is required"; // Generic message
                    errorEl.style.display = 'block';
                }
                address.classList.add('input-error');
            }

            const city = document.getElementById('city');
            if (!city.value.trim()) {
                isValid = false;
                const errorEl = document.getElementById('city-error');
                if (errorEl) {
                    errorEl.textContent = "Field is required"; // Generic message
                    errorEl.style.display = 'block';
                }
                city.classList.add('input-error');
            }

            const zip = document.getElementById('zip');
            if (!zip.value.trim()) {
                isValid = false;
                const errorEl = document.getElementById('zip-error');
                if (errorEl) {
                    errorEl.textContent = "Field is required"; // Generic message
                    errorEl.style.display = 'block';
                }
                zip.classList.add('input-error');
            }

            // 3. Payment Fields (CC, Expiry, CVV) - Message below container
            const cardNum = document.getElementById('cardNum');
            const expiry = document.getElementById('expiry');
            const cvv = document.getElementById('cvv');
            let paymentValid = true;

            if (!cardNum.value.trim()) { paymentValid = false; cardNum.classList.add('input-error'); }
            if (!expiry.value.trim()) { paymentValid = false; expiry.classList.add('input-error'); }
            if (!cvv.value.trim()) { paymentValid = false; cvv.classList.add('input-error'); }

            if (!paymentValid) {
                isValid = false;
                const paymentError = document.getElementById('payment-error');
                paymentError.textContent = "Fill the mandatory paymentfields";
                paymentError.style.display = 'block';
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            if (isValid) {
                submitBtn.textContent = 'Order Placed!';
                submitBtn.style.backgroundColor = '#2ecc71';
                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = 'Place Order';
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
});

