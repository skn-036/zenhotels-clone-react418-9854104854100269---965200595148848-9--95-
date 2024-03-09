export const openNewWindow = (url, width, height, onClose = null) => {
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const screenHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  let left = 0;
  let top = 0;

  if (screenWidth >= 768) {
    left = screenWidth / 2 - width / 2;
    top = screenHeight / 2 - height / 2;
  } else {
    width = screenWidth;
    height = screenHeight;
  }
  const openedWindow = window.open(
    url,
    '_blank',
    `menubar=yes,scroolbars=yes,width=${width},height=${height},left=${left},top=${top}`
  );

  if (typeof onClose === 'function') {
    const interval = setInterval(() => {
      if (openedWindow?.closed) {
        clearInterval(interval);
        onClose(true);
      }
    }, 1000);
  }
};
