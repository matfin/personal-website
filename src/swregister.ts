if ('serviceWorker' in navigator) {
  window.addEventListener('load', (): void => {
    navigator.serviceWorker
      .register('/worker.js')
      .then(
        (registration) => {
          console.info('Worker registration succeeded', registration.scope);
        },
        (error) => {
          throw new Error(error);
        },
      )
      .catch((error) => {
        console.error('Worker registration failed', error);
      });
  });
}
