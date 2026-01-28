// Modal Elements
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const printBtn = document.getElementById('printBtn');

// Card click handlers
const cards = document.querySelectorAll('.card[data-modal]');

// Modal content mapping
const modalTitles = {
    'practice-implications': 'Practice Implications',
    'literature-review': 'Literature Review Updates',
    'references': 'Additional References',
    'edit-notes': 'Edit Notes',
    'overview': 'Project Overview',
    'critical-considerations': 'Critical Considerations: AI Equity'
};

// Open modal
function openModal(modalId) {
    const template = document.getElementById(`${modalId}-content`);
    if (!template) return;

    modalTitle.textContent = modalTitles[modalId] || 'Content';
    modalContent.innerHTML = '';
    modalContent.appendChild(template.content.cloneNode(true));

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus trap
    modal.focus();
}

// Close modal
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Print current section
function printSection() {
    window.print();
}

// Event Listeners
cards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        openModal(modalId);
    });

    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const modalId = card.getAttribute('data-modal');
            openModal(modalId);
        }
    });
});

// Close button
modalClose.addEventListener('click', closeModal);

// Click outside to close
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Print button
printBtn.addEventListener('click', printSection);

// Prevent modal close when clicking inside modal
modal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add stagger animation to cards on load
document.addEventListener('DOMContentLoaded', () => {
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 80));
    });
});
