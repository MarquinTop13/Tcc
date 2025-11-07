import ArchiverController from './controller/ArchiverController.js';
import cadastroController from './controller/cadastroController.js';
import supportController from './controller/supportController.js';
import UpdateController from './controller/UpdatesController.js';
import AdemirController from "./controller/AdemirController.js";
import loginController from './controller/LoginController.js';
import SenhaController from './controller/senhaController.js';
import LinkRotas from './controller/LinkController.js';

export function AddRotas(api) {
  api.use(ArchiverController);
  api.use(cadastroController);
  api.use('/api', LinkRotas);
  api.use(supportController);
  api.use(UpdateController);
  api.use(AdemirController);
  api.use(loginController);
  api.use(SenhaController);
}