if ('serviceWorker' in navigator) {
  window.addEventListener('load', (): void => {
    navigator.serviceWorker
      .register('/worker.js')
      .then(
        (registration) => {
          console.log('Worker registration succeeded', registration.scope);
        },
        (error) => {
          throw new Error(error);
        },
      )
      .catch((error) => {
        console.log('Worker registration failed', error);
      });
  });
}
