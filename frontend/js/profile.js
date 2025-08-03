// Global variables to store ENUM values and lists
let styleTypes = [];
let fitValues = [];
let patterns = [];
let colors = [];
let skinTones = [];
let undertones = [];
let insecuritiesList = [];
let assetsList = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initTabs();
    fetchDatabaseData();
});

// Initialize tabs
function initTabs() {
    document.querySelectorAll('[data-tab]').forEach(button => {
        button.addEventListener('click', function() {
            const tabGroup = this.closest('.flex.border-b');
            const tabContainer = tabGroup.nextElementSibling;
            
            // Deactivate all buttons in this group
            tabGroup.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Deactivate all content in this container
            tabContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Activate clicked tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Fetch all required data from server
function fetchDatabaseData() {
    Promise.all([
        fetch('/api/client/enums').then(res => res.json()),
        fetch('/api/client/insecurities-list').then(res => res.json()),
        fetch('/api/client/assets-list').then(res => res.json())
    ])
    .then(([enums, insecurities, assets]) => {
        // Store data from server
        styleTypes = enums.styleTypes || [];
        fitValues = enums.fitValues || [];
        patterns = enums.patterns || [];
        colors = enums.colors || [];
        skinTones = enums.skinTones || [];
        undertones = enums.undertones || [];
        insecuritiesList = insecurities || [];
        assetsList = assets || [];
        
        initializeForm();
        loadProfile();
    })
    .catch(error => {
        console.error('Error fetching database data:', error);
        setDefaultData();
        initializeForm();
        loadProfile();
    });
}

// Set default data if API fails
function setDefaultData() {
    styleTypes = ['bohemian', 'minimalist', 'old_money', 'gothic', 'streetwear', 'preppy', 'casual', 'avant_garde'];
    fitValues = ['loose', 'fitted', 'baggy'];
    patterns = ['plaid', 'lines', 'dots', 'floral', 'tribal', 'geometric'];
    colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'pink', 'orange', 'grey', 'brown'];
    skinTones = ['fair', 'light', 'medium', 'olive', 'brown', 'dark'];
    undertones = ['cool', 'warm', 'neutral'];
    insecuritiesList = ['flabby_arms', 'broad_shoulders', 'sagging_bust', 'belly_pooch', 'wide_hips'];
    assetsList = ['long_neck', 'defined_collarbone', 'toned_arms', 'defined_waist', 'long_legs'];
}

// Initialize form with all data
function initializeForm() {
    initStyleTypes();
    initFitPreferences();
    initPatternPreferences();
    initColorPreferences();
    initSkinTone();
    initInsecurities();
    initAssets();
    initProfilePicture();
}

// Helper function to format ENUM values for display
function formatEnumForDisplay(enumValue) {
    return enumValue
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Initialize style types selection
function initStyleTypes() {
    const container = document.getElementById('styleTypeContainer');
    if (!container) return;
    
    container.innerHTML = '';
    styleTypes.forEach(style => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'px-3 py-1 rounded-full border border-gray-300 hover:border-indigo-500 hover:text-indigo-600';
        button.textContent = formatEnumForDisplay(style);
        button.dataset.enumValue = style;
        button.addEventListener('click', function() {
            this.classList.toggle('bg-indigo-100');
            this.classList.toggle('border-indigo-500');
            this.classList.toggle('text-indigo-600');
        });
        container.appendChild(button);
    });
}

// Initialize fit preferences
function initFitPreferences() {
    const container = document.getElementById('fitPreferenceContainer');
    if (!container) return;
    
    container.innerHTML = '';
    fitValues.forEach(fit => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'px-3 py-1 rounded-full border border-gray-300 hover:border-indigo-500 hover:text-indigo-600';
        button.textContent = formatEnumForDisplay(fit);
        button.dataset.enumValue = fit;
        button.addEventListener('click', function() {
            this.classList.toggle('bg-indigo-100');
            this.classList.toggle('border-indigo-500');
            this.classList.toggle('text-indigo-600');
        });
        container.appendChild(button);
    });
}

// Initialize pattern preferences
function initPatternPreferences() {
    const container = document.getElementById('patternPreferenceContainer');
    if (!container) return;
    
    container.innerHTML = '';
    patterns.forEach(pattern => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'px-3 py-1 rounded-full border border-gray-300 hover:border-indigo-500 hover:text-indigo-600';
        button.textContent = formatEnumForDisplay(pattern);
        button.dataset.enumValue = pattern;
        button.addEventListener('click', function() {
            this.classList.toggle('bg-indigo-100');
            this.classList.toggle('border-indigo-500');
            this.classList.toggle('text-indigo-600');
        });
        container.appendChild(button);
    });
}

// Color hex mapping
const colorHexMap = {
    red: '#FF0000',
    blue: '#0000FF',
    green: '#008000',
    yellow: '#FFFF00',
    purple: '#800080',
    black: '#000000',
    white: '#FFFFFF',
    pink: '#FFC0CB',
    orange: '#FFA500',
    grey: '#808080',
    brown: '#A52A2A'
};

// Initialize color preferences
function initColorPreferences() {
    const container = document.getElementById('colorPreferenceContainer');
    if (!container) return;
    
    container.innerHTML = '';
    colors.forEach(color => {
        const colorGroup = document.createElement('div');
        colorGroup.className = 'color-group flex items-center';
        
        const swatch = document.createElement('span');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = colorHexMap[color] || '#CCCCCC';
        
        const label = document.createElement('span');
        label.className = 'ml-2';
        label.textContent = formatEnumForDisplay(color);
        
        colorGroup.appendChild(swatch);
        colorGroup.appendChild(label);
        container.appendChild(colorGroup);
    });
}

// Initialize skin tone selection
function initSkinTone() {
    const skinToneSelect = document.getElementById('skinTone');
    const undertoneSelect = document.getElementById('undertone');
    
    if (skinToneSelect) {
        skinToneSelect.innerHTML = '<option value="">Select skin tone</option>';
        skinTones.forEach(tone => {
            const option = document.createElement('option');
            option.value = tone;
            option.textContent = formatEnumForDisplay(tone);
            skinToneSelect.appendChild(option);
        });
    }
    
    if (undertoneSelect) {
        undertoneSelect.innerHTML = '<option value="">Select undertone</option>';
        undertones.forEach(tone => {
            const option = document.createElement('option');
            option.value = tone;
            option.textContent = formatEnumForDisplay(tone);
            undertoneSelect.appendChild(option);
        });
    }
}

// Initialize insecurities selection
function initInsecurities() {
    const container = document.getElementById('insecuritiesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    insecuritiesList.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'px-3 py-1 rounded-full border border-gray-300 hover:border-indigo-500 hover:text-indigo-600';
        button.textContent = formatEnumForDisplay(item);
        button.dataset.enumValue = item;
        button.addEventListener('click', function() {
            this.classList.toggle('bg-indigo-100');
            this.classList.toggle('border-indigo-500');
            this.classList.toggle('text-indigo-600');
        });
        container.appendChild(button);
    });
}

// Initialize assets selection
function initAssets() {
    const container = document.getElementById('assetsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    assetsList.forEach(item => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'px-3 py-1 rounded-full border border-gray-300 hover:border-indigo-500 hover:text-indigo-600';
        button.textContent = formatEnumForDisplay(item);
        button.dataset.enumValue = item;
        button.addEventListener('click', function() {
            this.classList.toggle('bg-indigo-100');
            this.classList.toggle('border-indigo-500');
            this.classList.toggle('text-indigo-600');
        });
        container.appendChild(button);
    });
}

// Initialize profile picture
function initProfilePicture() {
    const uploadInput = document.getElementById('avatarUpload');
    if (!uploadInput) return;
    
    uploadInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('avatarPreview').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Load profile data from server
function loadProfile() {
    fetch('/api/client/profile')
        .then(res => res.json())
        .then(profile => {
            // Basic Info
            document.getElementById('firstName').value = profile.client_name || '';
            document.getElementById('lastName').value = profile.client_surname || '';
            document.getElementById('email').value = profile.client_email || '';
            document.getElementById('phone').value = profile.client_phone || '';
            document.getElementById('city').value = profile.client_city || '';
            document.getElementById('country').value = profile.client_country || '';
            
            // Measurements
            document.getElementById('height').value = profile.client_height || '';
            document.getElementById('bust').value = profile.client_bust || '';
            document.getElementById('waist').value = profile.client_waist || '';
            document.getElementById('hips').value = profile.client_hips || '';
            
            // Skin Tone
            if (profile.skin_tone) {
                document.getElementById('skinTone').value = profile.skin_tone;
            }
            if (profile.skin_undertones) {
                document.getElementById('undertone').value = profile.skin_undertones;
            }
            
            // Profile Picture
            if (profile.profile_picture) {
                document.getElementById('avatarPreview').src = profile.profile_picture;
            }
        })
        .catch(error => {
            console.error('Error loading profile:', error);
        });
}

// Save functions
function saveBasicInfo() {
    const data = {
        client_name: document.getElementById('firstName').value,
        client_surname: document.getElementById('lastName').value,
        client_email: document.getElementById('email').value,
        client_phone: document.getElementById('phone').value,
        client_city: document.getElementById('city').value,
        client_country: document.getElementById('country').value
    };
    
    saveData('/api/client/basic-info', data, 'Basic info saved successfully');
}

function saveStylePreferences() {
    const selectedStyles = Array.from(
        document.querySelectorAll('#styleTypeContainer button.bg-indigo-100')
    ).map(btn => btn.dataset.enumValue);
    
    const selectedFits = Array.from(
        document.querySelectorAll('#fitPreferenceContainer button.bg-indigo-100')
    ).map(btn => btn.dataset.enumValue);
    
    const data = {
        styles: selectedStyles,
        fits: selectedFits
    };
    
    saveData('/api/client/style-preferences', data, 'Style preferences saved successfully');
}

function saveColorPreferences() {
    const selectedPatterns = Array.from(
        document.querySelectorAll('#patternPreferenceContainer button.bg-indigo-100')
    ).map(btn => btn.dataset.enumValue);
    
    // For colors, you might want to implement a different selection logic
    const data = {
        patterns: selectedPatterns,
        colors: [] // Implement color selection as needed
    };
    
    saveData('/api/client/color-preferences', data, 'Color preferences saved successfully');
}

function saveMeasurements() {
    const data = {
        height: document.getElementById('height').value,
        bust: document.getElementById('bust').value,
        waist: document.getElementById('waist').value,
        hips: document.getElementById('hips').value
    };
    
    saveData('/api/client/measurements', data, 'Measurements saved successfully');
}

function saveSkinTone() {
    const data = {
        skin_tone: document.getElementById('skinTone').value,
        skin_undertones: document.getElementById('undertone').value
    };
    
    saveData('/api/client/skin-tone', data, 'Skin tone preferences saved successfully');
}

function saveSelfPerception() {
    const selectedInsecurities = Array.from(
        document.querySelectorAll('#insecuritiesContainer button.bg-indigo-100')
    ).map(btn => btn.dataset.enumValue);
    
    const selectedAssets = Array.from(
        document.querySelectorAll('#assetsContainer button.bg-indigo-100')
    ).map(btn => btn.dataset.enumValue);
    
    const data = {
        insecurities: selectedInsecurities,
        assets: selectedAssets
    };
    
    saveData('/api/client/self-perception', data, 'Self perception preferences saved successfully');
}

function saveProfilePicture() {
    const fileInput = document.getElementById('avatarUpload');
    if (!fileInput.files.length) return;
    
    const formData = new FormData();
    formData.append('avatar', fileInput.files[0]);
    
    fetch('/api/client/profile-picture', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        showAlert('success', 'Profile picture updated successfully');
        document.getElementById('avatarPreview').src = data.newUrl;
    })
    .catch(error => {
        showAlert('error', 'Error updating profile picture');
        console.error('Error:', error);
    });
}

// Generic save function
function saveData(url, data, successMessage) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        showAlert('success', successMessage);
    })
    .catch(error => {
        showAlert('error', 'Error saving data');
        console.error('Error:', error);
    });
}

// Show alert message
function showAlert(type, message) {
    const alert = document.getElementById(`${type}Alert`);
    if (!alert) return;
    
    alert.textContent = message;
    alert.classList.remove('hidden');
    
    setTimeout(() => {
        alert.classList.add('hidden');
    }, 5000);
}

// Add color field (for color preferences)
function addColorField() {
    const container = document.getElementById('colorPreferenceContainer');
    if (!container) return;
    
    const colorGroup = document.createElement('div');
    colorGroup.className = 'color-group flex items-center mb-2';
    
    const swatch = document.createElement('span');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = '#CCCCCC';
    
    const input = document.createElement('input');
    input.type = 'color';
    input.className = 'ml-2';
    input.value = '#CCCCCC';
    input.addEventListener('change', function() {
        swatch.style.backgroundColor = this.value;
    });
    
    colorGroup.appendChild(swatch);
    colorGroup.appendChild(input);
    container.appendChild(colorGroup);
}