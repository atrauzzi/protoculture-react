import { reduxSymbols, ServiceProvider } from "protoculture";
import { compose } from "redux";


declare const window: any;

export class ReactServiceProvider extends ServiceProvider {

    public async boot() {

        this.suite.container.rebind(reduxSymbols.Compose)
            .toConstantValue(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
    }
}
