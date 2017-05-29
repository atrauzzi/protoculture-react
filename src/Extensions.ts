import * as _ from "lodash";
import { interfaces } from "inversify";
import { ReactAppConfiguration } from "./index";
import { appSymbols, reduxSymbols } from "protoculture";
import { Store } from "redux";
import { ReactApp } from "./ReactApp";
import { ServiceProvider } from "protoculture/lib/ServiceProvider";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        configureReactApps(reactAppConfigurations: ReactAppConfiguration<any>[]): void;

        configureReactApp(reactAppConfiguration: ReactAppConfiguration<any>): void;
    }
}

ServiceProvider.prototype.configureReactApps = function (reactAppConfigurations: ReactAppConfiguration<any>[]) {

    _.each(reactAppConfigurations, (reactAppConfiguration) =>
        this.configureReactApp(reactAppConfiguration));
};

ServiceProvider.prototype.configureReactApp = function (reactAppConfiguration: ReactAppConfiguration<any>) {

    this.bundle.container
        .bind(appSymbols.App)
        .toDynamicValue((context: interfaces.Context) => {

            const store = context.container.get<Store<any>>(reduxSymbols.Store);

            return new ReactApp(store, reactAppConfiguration);
        });
};
