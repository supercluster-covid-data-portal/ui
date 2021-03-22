const sleep = (time: number = 2000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });

export default sleep;
