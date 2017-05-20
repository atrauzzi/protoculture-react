#!/usr/bin/env ts-node
import * as Hapi from "hapi";
import { ServiceProvider, StaticServiceProvider, BaseApp, Suite, ConsoleServiceProvider } from "protoculture";
import { InertServiceProvider, HapiServiceProvider, Route, RouteType } from "protoculture-hapi";


//
// Note: If you're interested in what's going on here, I suggest checking out https://github.com/atrauzzi/protoculture-hapi
//

const reactDemoServerSymbols = {
    HelloController: Symbol("hello"),
};

export class HelloController {
    
    public async sayHello(request: Hapi.Request, reply: Hapi.Base_Reply, route: Route) {

        reply("Yes sir I like it!");
    }
}

class ReactDemoServerServiceProvider extends ServiceProvider {

    public async boot() {

        this.configureConnection(() => { 

            return {
                host: "0.0.0.0",
                port: 2112,
            };
        });

        this.makeInjectable(HelloController);
        this.bindConstructor(reactDemoServerSymbols.HelloController, HelloController);

        this.configureRoutes([
            {
                directory: "./demo/server/public",
            },
            {
                path: "/protoculture.png",
                file: "./protoculture.png",
            },
        ]);
    }
}

class HapiDemoSuite extends Suite {

    public name = "react-demo-server";

    protected get serviceProviders(): StaticServiceProvider<any>[] {

        return [
            HapiServiceProvider,
            InertServiceProvider,
            ReactDemoServerServiceProvider,
            ConsoleServiceProvider,
        ];
    }
}

const suite = new HapiDemoSuite();
suite.run().catch(console.error);
