import * as _ from "lodash";
import { interfaces } from "inversify";
import { appSymbols, reduxSymbols } from "protoculture";
import { ReactAppConfiguration } from "../../index";
import { Store } from "redux";
import { ProtocultureReactApp } from "./ProtocultureReactApp";
import { ServiceProvider } from "protoculture/lib/ServiceProvider";


declare module "protoculture/lib/ServiceProvider" {

    export interface ServiceProvider {

        configureReactApp(reactAppConfiguration: ReactAppConfiguration<any>): void;
        configureReactApps(reactAppConfigurations: ReactAppConfiguration<any>[]): void;
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

            return new ProtocultureReactApp(store, reactAppConfiguration);
        });
};
