import App from './app';

const createServer = App.listen(process.env.APP_PORT || 3001, () => {
  console.log(`Server online at host:3000.`);
});
export default createServer;
