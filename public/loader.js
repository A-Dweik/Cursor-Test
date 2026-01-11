// Global loader functions for the application
window.ShowLoader = function() {
  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.style.display = 'flex';
  }
};

window.HideLoader = function() {
  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.style.display = 'none';
  }
};

// Create loader element on page load
document.addEventListener('DOMContentLoaded', function() {
  if (!document.getElementById('global-loader')) {
    const loaderDiv = document.createElement('div');
    loaderDiv.id = 'global-loader';
    loaderDiv.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:9999;align-items:center;justify-content:center;';
    loaderDiv.innerHTML = '<div style="text-align:center;"><div style="border:8px solid #f3f3f3;border-top:8px solid #1976D2;border-radius:50%;width:60px;height:60px;animation:spin 1s linear infinite;"></div></div><style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>';
    document.body.appendChild(loaderDiv);
  }
});
