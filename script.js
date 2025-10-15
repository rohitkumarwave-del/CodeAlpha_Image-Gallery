document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let currentIndex = 0;
    let currentImages = Array.from(galleryItems);

    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            showLightbox(currentImages[currentIndex].querySelector('img').src);
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Navigate previous
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        showLightbox(currentImages[currentIndex].querySelector('img').src);
    });

    // Navigate next
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentImages.length;
        showLightbox(currentImages[currentIndex].querySelector('img').src);
    });

    // Filter images
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentImages = category === 'all' 
                ? Array.from(galleryItems)
                : Array.from(galleryItems).filter(item => item.classList.contains(category));

            galleryItems.forEach(item => {
                item.style.display = category === 'all' || item.classList.contains(category)
                    ? 'block'
                    : 'none';
            });
        });
    });

    function showLightbox(src) {
        lightboxImg.src = src;
        lightbox.style.display = 'flex';
    }
});