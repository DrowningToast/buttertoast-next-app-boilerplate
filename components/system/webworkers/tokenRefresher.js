const tokenRefresher = () => {
  const refresh = () => {
    setTimeout(() => {
      postMessage("Refresh ID Token");
      refresh();
      // Every 10 mins
    }, 600000);
  };

  self.onmessage = (e) => {
    refresh();
  };
};

export default tokenRefresher;
