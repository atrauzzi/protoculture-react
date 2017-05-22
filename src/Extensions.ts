import * as _ from "lodash";
import { interfaces } from "inversify";
import { ReactAppConfiguration } from "./index";
import { appSymbols, reduxSymbols } from "protoculture";
import { Store } from "redux";
import { ReactApp } from "./ReactApp";
import { ServiceProvider } from "protoculture/lib/ServiceProvider";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        bindReactApps(reactAppConfigurations: ReactAppConfiguration<any>[]): void;

        bindReactApp(reactAppConfiguration: ReactAppConfiguration<any>): void;
    }
}

ServiceProvider.prototype.bindReactApps = function (reactAppConfigurations: ReactAppConfiguration<any>[]) {

    _.each(reactAppConfigurations, (reactAppConfiguration) =>
        this.bindReactApp(reactAppConfiguration));
};

ServiceProvider.prototype.bindReactApp = function (reactAppConfiguration: ReactAppConfiguration<any>) {

    this.suite.container
        .bind(appSymbols.App)
        .toDynamicValue((context: interfaces.Context) => {

            const store = context.container.get<Store<any>>(reduxSymbols.Store);

            return new ReactApp(store, reactAppConfiguration);
        });
};
