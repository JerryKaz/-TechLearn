// script.js - BITM203 Course Project

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('BITM203 Course Project loaded successfully');
    
    // Initialize all functionality
    initMenuToggle();
    initFormValidation();
    initDynamicContent();
    initButtons();
    
    // Check if we're on the contact page for additional functionality
    if (document.getElementById('contactForm')) {
        initContactPage();
    }
});

// Mobile Menu Toggle
function initMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && navList.classList.contains('active')) {
                navList.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Form Validation Functionality
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset previous error states
            clearErrors();
            
            // Validate form fields
            const isValid = validateForm();
            
            if (isValid) {
                // Simulate form submission
                simulateFormSubmission();
            }
        });
        
        // Real-time validation for name field
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.addEventListener('blur', function() {
                validateField('name', 'Name is required', this.value.trim() !== '');
            });
        }
        
        // Real-time validation for email field
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                const isValid = email !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                validateField('email', 'Please enter a valid email address', isValid);
            });
        }
        
        // Real-time validation for message field
        const messageInput = document.getElementById('message');
        if (messageInput) {
            messageInput.addEventListener('blur', function() {
                validateField('message', 'Message is required', this.value.trim() !== '');
            });
        }
    }
}

// Validate individual form field
function validateField(fieldId, errorMessage, isValid) {
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorElement) {
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            document.getElementById(fieldId).classList.add('error');
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
            document.getElementById(fieldId).classList.remove('error');
        }
    }
}

// Validate entire form
function validateForm() {
    let isValid = true;
    
    // Validate name
    const nameValue = document.getElementById('name').value.trim();
    if (nameValue === '') {
        validateField('name', 'Name is required', false);
        isValid = false;
    } else {
        validateField('name', '', true);
    }
    
    // Validate email
    const emailValue = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '' || !emailRegex.test(emailValue)) {
        validateField('email', 'Please enter a valid email address', false);
        isValid = false;
    } else {
        validateField('email', '', true);
    }
    
    // Validate message
    const messageValue = document.getElementById('message').value.trim();
    if (messageValue === '') {
        validateField('message', 'Message is required', false);
        isValid = false;
    } else {
        validateField('message', '', true);
    }
    
    return isValid;
}

// Clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(function(input) {
        input.classList.remove('error');
    });
}

// Simulate form submission
function simulateFormSubmission() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(function() {
        // Show success message
        const successMessage = document.getElementById('formSuccess');
        successMessage.textContent = 'Thank you! Your message has been sent successfully.';
        successMessage.style.display = 'block';
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        document.getElementById('contactForm').reset();
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
        
        // Add new testimonial to the page dynamically
        addTestimonial(nameValue, messageValue);
    }, 1500);
}

// Initialize dynamic content functionality
function initDynamicContent() {
    // Subscribe button functionality
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function() {
            this.textContent = 'Subscribed!';
            this.disabled = true;
            this.classList.add('btn-outline');
            
            // Create a confirmation message
            const confirmation = document.createElement('p');
            confirmation.textContent = 'Thank you for subscribing to our newsletter!';
            confirmation.style.color = 'var(--success-color)';
            confirmation.style.marginTop = '10px';
            
            this.parentNode.appendChild(confirmation);
        });
    }
    
    // Course enrollment buttons
    const courseBtns = document.querySelectorAll('.course-btn');
    courseBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const courseTitle = this.parentNode.querySelector('h3').textContent;
            alert(`Thank you for your interest in "${courseTitle}"! You will be redirected to the enrollment page.`);
            
            // Change button text temporarily
            const originalText = this.textContent;
            this.textContent = 'Redirecting...';
            this.disabled = true;
            
            // Simulate redirect
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

// Initialize contact page specific functionality
function initContactPage() {
    // Show hours button
    const showHoursBtn = document.getElementById('showHours');
    const hoursInfo = document.getElementById('hoursInfo');
    
    if (showHoursBtn && hoursInfo) {
        showHoursBtn.addEventListener('click', function() {
            if (hoursInfo.style.display === 'block') {
                hoursInfo.style.display = 'none';
                this.textContent = 'Show Detailed Hours';
            } else {
                hoursInfo.innerHTML = `
                    <h5>Detailed Office Hours</h5>
                    <ul>
                        <li><strong>Monday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Tuesday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Wednesday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Thursday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Friday:</strong> 9:00 AM - 6:00 PM</li>
                        <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                        <li><strong>Sunday:</strong> Closed</li>
                    </ul>
                    <p><em>Note: We are closed on public holidays.</em></p>
                `;
                hoursInfo.style.display = 'block';
                this.textContent = 'Hide Detailed Hours';
            }
        });
    }
    
    // Add testimonial button
    const addTestimonialBtn = document.getElementById('addTestimonial');
    const testimonialSection = document.getElementById('testimonialSection');
    
    if (addTestimonialBtn && testimonialSection) {
        addTestimonialBtn.addEventListener('click', function() {
            // Create testimonial form
            const testimonialForm = document.createElement('div');
            testimonialForm.className = 'testimonial-form';
            testimonialForm.innerHTML = `
                <h5>Add Your Testimonial</h5>
                <div class="form-group">
                    <label for="testimonialName">Your Name</label>
                    <input type="text" id="testimonialName" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label for="testimonialText">Your Testimonial</label>
                    <textarea id="testimonialText" rows="3" placeholder="Share your experience..."></textarea>
                </div>
                <button id="submitTestimonial" class="btn">Submit Testimonial</button>
                <button id="cancelTestimonial" class="btn-outline">Cancel</button>
            `;
            
            testimonialSection.appendChild(testimonialForm);
            
            // Handle testimonial submission
            document.getElementById('submitTestimonial').addEventListener('click', function() {
                const name = document.getElementById('testimonialName').value.trim();
                const text = document.getElementById('testimonialText').value.trim();
                
                if (name && text) {
                    addTestimonial(name, text);
                    testimonialSection.innerHTML = '';
                } else {
                    alert('Please fill in both fields.');
                }
            });
            
            // Handle cancel button
            document.getElementById('cancelTestimonial').addEventListener('click', function() {
                testimonialSection.innerHTML = '';
            });
        });
    }
}

// Add testimonial to the page
function addTestimonial(name, text) {
    const testimonialSection = document.getElementById('testimonialSection') || document.querySelector('.dynamic-content');
    
    if (testimonialSection) {
        const testimonial = document.createElement('div');
        testimonial.className = 'testimonial';
        testimonial.innerHTML = `
            <h5>New Testimonial</h5>
            <blockquote>
                <p>"${text}"</p>
                <footer>- ${name}</footer>
            </blockquote>
        `;
        
        testimonial.style.backgroundColor = '#f8fafc';
        testimonial.style.padding = 'var(--spacing-md)';
        testimonial.style.borderRadius = 'var(--border-radius)';
        testimonial.style.marginTop = 'var(--spacing-md)';
        
        // Check if we're adding to testimonialSection or creating a new one
        if (testimonialSection.id === 'testimonialSection') {
            testimonialSection.innerHTML = '';
            testimonialSection.appendChild(testimonial);
        } else {
            // Add to dynamic content area
            testimonialSection.appendChild(testimonial);
        }
        
        // Show confirmation
        alert('Thank you for your testimonial!');
    }
}

// Initialize button functionality
function initButtons() {
    // Add click effect to all buttons
    const buttons = document.querySelectorAll('button, .btn, .btn-outline');
    
    buttons.forEach(button => {
        // Remove any existing listeners to avoid duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add CSS for ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Show current year in footer (optional)
function showCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    if (yearElements.length > 0) {
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
}

// Call additional initialization functions
showCurrentYear();
// Additional JavaScript for Courses Page
function initCoursesPage() {
    // Course filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide course cards based on filter
                courseCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-level') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Enrollment modal functionality
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    const modal = document.getElementById('enrollmentModal');
    const closeModal = document.querySelector('.close-modal');
    const selectedCourseSpan = document.getElementById('selectedCourse');
    
    if (enrollBtns.length > 0 && modal) {
        enrollBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const courseName = this.getAttribute('data-course');
                selectedCourseSpan.textContent = courseName;
                
                // Update modal title
                document.getElementById('modalCourseTitle').textContent = `Enroll in ${courseName}`;
                
                // Show modal
                modal.style.display = 'flex';
            });
        });
        
        // Close modal when clicking X
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Enrollment form submission
        const enrollmentForm = document.getElementById('enrollmentForm');
        if (enrollmentForm) {
            enrollmentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Get form values
                const name = document.getElementById('enrollName').value;
                const email = document.getElementById('enrollEmail').value;
                const course = selectedCourseSpan.textContent;
                
                // Simulate enrollment
                alert(`Thank you, ${name}! You have successfully enrolled in "${course}". A confirmation email has been sent to ${email}.`);
                
                // Close modal
                modal.style.display = 'none';
                
                // Reset form
                enrollmentForm.reset();
            });
        }
    }
    
    // Course catalog download
    const catalogBtn = document.getElementById('courseCatalogBtn');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.disabled = true;
            
            // Simulate download
            setTimeout(() => {
                alert('Course catalog download started!');
                this.innerHTML = '<i class="fas fa-download"></i> Download Course Catalog';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Add to the main initialization function
function init() {
    console.log('BITM203 Course Project loaded successfully');
    
    // Initialize all functionality
    initMenuToggle();
    initFormValidation();
    initDynamicContent();
    initButtons();
    initCoursesPage(); // Add this line
    
    // Check if we're on the contact page for additional functionality
    if (document.getElementById('contactForm')) {
        initContactPage();
    }
}

// Replace the existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', init);

// Courses Page JavaScript

function initCoursesPage() {
    console.log('Courses page initialized');
    
    // Level filter functionality
    const levelBtns = document.querySelectorAll('.level-btn');
    const courseCards = document.querySelectorAll('.course-card');
    
    if (levelBtns.length > 0) {
        levelBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                levelBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterLevel = this.getAttribute('data-level');
                
                // Show/hide course cards based on filter
                courseCards.forEach(card => {
                    const cardLevel = card.getAttribute('data-level');
                    
                    if (filterLevel === 'all' || cardLevel === filterLevel) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Enrollment modal functionality
    const enrollBtns = document.querySelectorAll('.enroll-btn');
    const modal = document.getElementById('enrollmentModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (enrollBtns.length > 0 && modal) {
        enrollBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const courseName = this.getAttribute('data-course');
                const courseCard = this.closest('.course-card');
                
                // Update modal content based on course
                updateModalContent(courseName, courseCard);
                
                // Show modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal when clicking X
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Enrollment form submission
        const enrollmentForm = document.getElementById('enrollmentForm');
        if (enrollmentForm) {
            enrollmentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Get form values
                const name = document.getElementById('enrollName').value;
                const email = document.getElementById('enrollEmail').value;
                const course = document.getElementById('modalCourseName').textContent;
                
                // Simulate enrollment process
                simulateEnrollment(name, email, course);
                
                // Close modal
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset form
                enrollmentForm.reset();
            });
        }
    }
    
    // Bundle button functionality
    const bundleBtn = document.querySelector('.bundle-btn');
    if (bundleBtn) {
        bundleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update modal for bundle
            document.getElementById('modalCourseTitle').textContent = 'Enroll in Full Stack Bundle';
            document.getElementById('modalCourseName').textContent = 'Full Stack Developer Bundle';
            document.getElementById('modalCourseImage').src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
            document.querySelector('.modal-current-price').textContent = '$447';
            document.querySelector('.modal-original-price').textContent = '$597';
            
            // Show modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Resource download buttons
    const resourceBtns = document.querySelectorAll('.resource-btn');
    resourceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const resourceName = this.parentElement.querySelector('h4').textContent;
            const originalText = this.innerHTML;
            
            // Simulate download
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                alert(`${resourceName} download started! The file will open in a new tab.`);
                
                // Restore button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Open the resource link in new tab
                window.open(this.href, '_blank');
            }, 1500);
        });
    });
    
    // Play button functionality for course videos
    const playBtns = document.querySelectorAll('.play-btn');
    playBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Course preview video would play here. In a real implementation, this would trigger a video modal or lightbox.');
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            
            if (emailInput.value) {
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    alert('Thank you for subscribing to our newsletter!');
                    emailInput.value = '';
                    button.innerHTML = originalText;
                    button.style.background = '';
                }, 1000);
            }
        });
    }
}

// Update modal content based on selected course
function updateModalContent(courseName, courseCard) {
    const modalTitle = document.getElementById('modalCourseTitle');
    const modalCourseName = document.getElementById('modalCourseName');
    const modalImage = document.getElementById('modalCourseImage');
    const currentPrice = document.querySelector('.modal-current-price');
    const originalPrice = document.querySelector('.modal-original-price');
    
    // Get course details from the card
    const courseTitle = courseCard.querySelector('h3').textContent;
    const courseImage = courseCard.querySelector('.course-image').src;
    const priceElement = courseCard.querySelector('.current-price');
    const originalPriceElement = courseCard.querySelector('.original-price');
    
    // Update modal
    modalTitle.textContent = `Enroll in ${courseTitle}`;
    modalCourseName.textContent = courseTitle;
    modalImage.src = courseImage;
    
    if (priceElement) {
        currentPrice.textContent = priceElement.textContent;
    }
    
    if (originalPriceElement) {
        originalPrice.textContent = originalPriceElement.textContent;
    }
}

// Simulate enrollment process
function simulateEnrollment(name, email, course) {
    // Show loading state
    const submitBtn = document.querySelector('.btn-modal');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        alert(`🎉 Congratulations, ${name}!\n\nYou have successfully enrolled in "${course}".\n\nA confirmation email has been sent to ${email} with your course access details.\n\nWelcome to TechLearn!`);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Add courses page initialization to main init function
function init() {
    console.log('BITM203 Course Project loaded successfully');
    
    // Initialize all functionality
    initMenuToggle();
    initFormValidation();
    initDynamicContent();
    initButtons();
    
    // Check which page we're on
    if (document.getElementById('contactForm')) {
        initContactPage();
    }
    
    if (document.querySelector('.courses-section')) {
        initCoursesPage();
    }
}

// Update the existing DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', init);