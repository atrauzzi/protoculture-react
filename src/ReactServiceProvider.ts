import { reduxSymbols, ServiceProvider } from "protoculture";
import { compose } from "redux";


declare const window: any;

export class ReactServiceProvider extends ServiceProvider {

    public async boot() {

        this.bundle.container.bind(reduxSymbols.InitialState)
            .to(this.findInitialState())
            .inSingletonScope();

        this.bundle.container.rebind(reduxSymbols.Compose)
            .toConstantValue(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
    }

    protected findInitialState() {

        const element = document.getElementsByName("state")[0];

        try {

            return JSON.parse(element.nodeValue);
        }
        catch (error) {

            return null;
        }
    }
}
