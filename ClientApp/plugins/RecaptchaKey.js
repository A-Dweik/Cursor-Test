(function registerRecaptchaKey() {
  if (typeof window === 'undefined') {
    return;
  }

  const existing = window.grecaptchaSiteKey;
  if (existing) {
    return;
  }

  const configuration = window.config || {};
  window.grecaptchaSiteKey = configuration.RecaptchaSiteKey || '';
})();
