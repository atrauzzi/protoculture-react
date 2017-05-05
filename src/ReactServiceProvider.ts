import * as _ from "lodash";
import { reactSymbols } from "./index";
import { interfaces } from "inversify";
import { appSymbols, reduxSymbols, ServiceProvider, StaticApp } from "protoculture";
import { ReactAppConfiguration } from "./ReactAppConfiguration";
import { ReactApp } from "./ReactApp";
import { Store } from "redux";


export class ReactServiceProvider extends ServiceProvider {

    public async boot() {

        // this.makeInjectable(ReactApp);
        // this.bindConstructorParameter(reduxSymbols.Store, ReactApp, 0);
        // this.bindConstructorParameter(reactSymbols.ReactAppConfiguration, ReactApp, 1);
    }

    protected bindReactApps(reactAppConfigurations: ReactAppConfiguration<any>[]) {

        _.each(reactAppConfigurations, (reactAppConfiguration) => this.bindReactApp(reactAppConfiguration));
    }

    protected bindReactApp(reactAppConfiguration: ReactAppConfiguration<any>) {
 
         this.suite.container
            .bind(appSymbols.App)
            .toDynamicValue((context) => {

                const store = context.container.get<Store<any>>(reduxSymbols.Store);

                return new ReactApp(store, reactAppConfiguration);
            });
    }
}