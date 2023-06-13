const testApiCall = (req: Req): Promise<{ ok: boolean; amount: number; phone: string }> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const randomAnswer = Math.round(Math.random());
      if (randomAnswer) {
        res({ ...req.body, ok: true });
      } else {
        res({ ...req.body, ok: false });
      }
    }, 500);
  });
};

export default testApiCall;
