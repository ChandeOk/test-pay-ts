type Data = {
  name: string;
  background: string;
};
type Req = {
  method: string;
  body: {
    amount: number;
    phone: string;
  };
};
