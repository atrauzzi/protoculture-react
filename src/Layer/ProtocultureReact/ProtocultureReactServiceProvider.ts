import "./ServiceProvider";
import { compose } from "redux";
import { reduxSymbols, ServiceProvider } from "protoculture";


export class ReactServiceProvider extends ServiceProvider {

    public async boot() {

        this.bundle.container.rebind(reduxSymbols.Compose)
            .toConstantValue((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
    }
}
